import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutFull from '../../libs/components/layout/LayoutFull';
import { NextPage } from 'next';
import Review from '../../libs/components/furniture/Review';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import FurnitureBigCard from '../../libs/components/common/FurnitureBigCard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import { Furniture } from '../../libs/types/furniture/furniture';
import moment from 'moment';
import { formatterStr } from '../../libs/utils';
import { REACT_APP_API_URL } from '../../libs/config';
import { userVar } from '../../apollo/store';
import { CommentInput, CommentsInquiry } from '../../libs/types/comment/comment.input';
import { Comment } from '../../libs/types/comment/comment';
import { CommentGroup } from '../../libs/enums/comment.enum';
import { Pagination as MuiPagination } from '@mui/material';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import 'swiper/css';
import 'swiper/css/pagination';
import { GET_COMMENTS, GET_FURNITURES, GET_FURNITURE } from '../../apollo/user/query';
import { T } from '../../libs/types/common';
import { Direction, Message } from '../../libs/enums/common.enum';
import { CREATE_COMMENT, LIKE_TARGET_FURNITURE } from '../../apollo/user/mutation';
import { sweetErrorHandling, sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';

SwiperCore.use([Autoplay, Navigation, Pagination]);

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const FurnitureDetail: NextPage = ({ initialComment, ...props }: any) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const [furnitureId, setFurnitureId] = useState<string | null>(null);
	const [furniture, setFurniture] = useState<Furniture | null>(null);
	const [slideImage, setSlideImage] = useState<string>('');
	const [destinationFurnitures, setDestinationFurnitures] = useState<Furniture[]>([]);
	const [commentInquiry, setCommentInquiry] = useState<CommentsInquiry>(initialComment);
	const [furnitureComments, setFurnitureComments] = useState<Comment[]>([]);
	const [commentTotal, setCommentTotal] = useState<number>(0);
	const [insertCommentData, setInsertCommentData] = useState<CommentInput>({
		commentGroup: CommentGroup.FURNITURE,
		commentContent: '',
		commentRefId: '',
	});

	// Added for the new design
	const [quantity, setQuantity] = useState<number>(1);
	const [selectedSize, setSelectedSize] = useState<string>('L');
	const [selectedColor, setSelectedColor] = useState<string>('blue');

	const sizeOptions = [
		{ value: 'L', label: 'L' },
		{ value: 'XL', label: 'XL' },
		{ value: 'XS', label: 'XS' },
	];

	const colorOptions = [
		{ value: 'blue', color: '#6366F1' },
		{ value: 'black', color: '#000000' },
		{ value: 'brown', color: '#b88e2f' },
	];

	/** APOLLO REQUESTS **/
	const [likeTargetFurniture] = useMutation(LIKE_TARGET_FURNITURE);
	const [createComment] = useMutation(CREATE_COMMENT);

	const {
		loading: getFurnitureLoading,
		data: getFurnitureData,
		error: getFurnitureError,
		refetch: getFurnitureRefetch,
	} = useQuery(GET_FURNITURE, {
		fetchPolicy: 'network-only',
		variables: { input: furnitureId },
		skip: !furnitureId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			if (data?.getFurniture) setFurniture(data?.getFurniture);
			if (data?.getFurniture) setSlideImage(data?.getFurniture?.furnitureImages[0]);
		},
	});

	const {
		loading: getFurnituresLoading,
		data: getFurnituresData,
		error: getFurnituresError,
		refetch: getFurnituresRefetch,
	} = useQuery(GET_FURNITURES, {
		fetchPolicy: 'cache-and-network',
		variables: {
			input: {
				page: 1,
				limit: 4,
				sort: 'createdAt',
				direction: Direction.DESC,
				search: {
					locationList: furniture?.furnitureLocation ? [furniture?.furnitureLocation] : [],
				},
			},
		},
		skip: !furnitureId && !furniture,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			if (data?.getFurnitures?.list) setDestinationFurnitures(data?.getFurnitures?.list);
		},
	});

	const {
		loading: getCommentsLoading,
		data: getCommentsData,
		error: getCommentsError,
		refetch: getCommentsRefetch,
	} = useQuery(GET_COMMENTS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: initialComment },
		skip: !commentInquiry.search.commentRefId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			if (data?.getComments?.list) setFurnitureComments(data?.getComments?.list);
			setCommentTotal(data?.getComments?.metaCounter[0]?.total ?? 0);
		},
	});

	/** LIFECYCLES **/
	useEffect(() => {
		if (router.query.id) {
			setFurnitureId(router.query.id as string);
			setCommentInquiry({
				...commentInquiry,
				search: {
					commentRefId: router.query.id as string,
				},
			});
			setInsertCommentData({
				...insertCommentData,
				commentRefId: router.query.id as string,
			});
		}
	}, [router]);

	useEffect(() => {
		if (commentInquiry.search.commentRefId) getCommentsRefetch({ input: commentInquiry });
	}, [commentInquiry]);

	useEffect(() => {}, [commentInquiry]);

	/** HANDLERS **/
	const changeImageHandler = (image: string) => {
		setSlideImage(image);
	};

	const likeFurnitureHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

			await likeTargetFurniture({ variables: { input: id } });
			await getFurnitureRefetch({ input: id });
			await getFurnituresRefetch({
				input: {
					page: 1,
					limit: 4,
					sort: 'createdAt',
					direction: Direction.DESC,
					search: {
						locationList: [furniture?.furnitureLocation],
					},
				},
			});

			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log('ERROR, likeFurnitureHandler:', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	const commentPaginationChangeHandler = async (event: ChangeEvent<unknown>, value: number) => {
		commentInquiry.page = value;
		setCommentInquiry({ ...commentInquiry });
	};

	const createCommentHandler = async () => {
		try {
			if (!user?._id) throw new Error(Message.NOT_AUTHENTICATED);

			await createComment({ variables: { input: insertCommentData } });

			setInsertCommentData({ ...insertCommentData, commentContent: '' });

			await getCommentsRefetch({ input: commentInquiry });
		} catch (err: any) {
			await sweetErrorHandling(err);
		}
	};

	// New design handlers
	const handleChangeQuantity = (type: 'increase' | 'decrease') => {
		if (type === 'increase') {
			setQuantity((prev) => prev + 1);
		} else if (type === 'decrease' && quantity > 1) {
			setQuantity((prev) => prev - 1);
		}
	};

	const handleSizeChange = (size: string) => {
		setSelectedSize(size);
	};

	const handleColorChange = (color: string) => {
		setSelectedColor(color);
	};

	const handleAddToCart = () => {
		// Implement add to cart functionality
		console.log('Added to cart:', {
			furniture,
			quantity,
			size: selectedSize,
			color: selectedColor,
		});
	};

	if (getFurnitureLoading) {
		return (
			<Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '1080px' }}>
				<CircularProgress size={'4rem'} />
			</Stack>
		);
	}

	if (device === 'mobile') {
		return <div>FURNITURE DETAIL PAGE</div>;
	} else {
		return (
			<div id={'furniture-detail-page'}>
				{/* New Design - Start */}
				<div className={'breadcrumb-container'}>
					<div className={'container'}>
						<Box className="breadcrumb" sx={{ display: 'flex', padding: '20px 0', alignItems: 'center', gap: 1 }}>
							<Link href="/">
								<Typography sx={{ color: '#6B7280', cursor: 'pointer' }}>Home</Typography>
							</Link>
							<Box component="span" sx={{ color: '#6B7280' }}>
								&gt;
							</Box>
							<Link href="/shop">
								<Typography sx={{ color: '#6B7280', cursor: 'pointer' }}>Shop</Typography>
							</Link>
							<Box component="span" sx={{ color: '#6B7280' }}>
								&gt;
							</Box>
							<Typography sx={{ color: '#111827' }}>{furniture?.furnitureTitle || 'Asgaard sofa'}</Typography>
						</Box>
					</div>
				</div>

				<div className={'new-detail-section'}>
					<div className={'container'}>
						<Stack
							className="new-furniture-detail"
							direction="row"
							spacing={3}
							sx={{ width: '100%', paddingBottom: '60px' }}
						>
							{/* Left Section - Product Images */}
							<Box sx={{ width: '60%' }} flexDirection={'row'} display={'flex'}>
								<Stack direction="column" spacing={3} sx={{ overflowX: 'auto', marginRight: '40px' }}>
									{furniture?.furnitureImages?.map((image, index) => (
										<Box
											key={index}
											onClick={() => changeImageHandler(image)}
											sx={{
												width: 80,
												height: 80,
												cursor: 'pointer',
												border: slideImage === image ? '2px solid #EB6753' : '1px solid #E5E7EB',
												borderRadius: '8px',
												overflow: 'hidden',
											}}
										>
											<img
												src={`${REACT_APP_API_URL}/${image}`}
												alt={`Thumbnail ${index}`}
												style={{ width: '100%', height: '100%', objectFit: 'cover' }}
											/>
										</Box>
									))}
								</Stack>
								<Box sx={{ width: '70%', marginBottom: 2 }}>
									<img
										src={slideImage ? `${REACT_APP_API_URL}/${slideImage}` : '/img/property/bigImage.png'}
										alt={furniture?.furnitureTitle}
										style={{
											width: '500px',
											height: '650px',
											borderRadius: '8px',
											objectFit: 'cover',
											objectPosition: 'center center',
										}}
									/>
								</Box>
							</Box>

							{/* Right Section - Product Info */}
							<Stack sx={{ width: '40%' }}>
								<Typography variant="h2" sx={{ fontSize: '36px', fontWeight: 600, marginBottom: 2 }}>
									{furniture?.furnitureTitle || 'Asgaard sofa'}
								</Typography>

								<Typography variant="h3" sx={{ fontSize: '24px', fontWeight: 600, marginBottom: 2 }}>
									$ {formatterStr(furniture?.furniturePrice || 250000)}
								</Typography>

								<Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
									<Box sx={{ display: 'flex', color: '#F59E0B' }}>
										{[1, 2, 3, 4, 5].map((star) => (
											<span key={star}>★</span>
										))}
									</Box>
									<Typography sx={{ ml: 2, color: '#6B7280' }}>5 Customer Review</Typography>
								</Box>

								<Typography sx={{ marginBottom: 3, color: '#4B5563' }}>
									{furniture?.furnitureDesc || 'No description available for this product.'}
								</Typography>

								{/* Size Selection */}
								<Box sx={{ marginBottom: 3 }}>
									<Typography sx={{ fontWeight: 600, marginBottom: 1 }}>Size</Typography>
									<Stack direction="row" spacing={1}>
										{sizeOptions.map((size) => (
											<Button
												key={size.value}
												variant={selectedSize === size.value ? 'contained' : 'outlined'}
												onClick={() => handleSizeChange(size.value)}
												sx={{
													minWidth: '40px',
													height: '40px',
													backgroundColor: selectedSize === size.value ? '#b88e2f' : 'transparent',
													color: selectedSize === size.value ? 'white' : 'black',
													border: '1px solid #D1D5DB',
													'&:hover': {
														backgroundColor: selectedSize === size.value ? '#9F7833' : 'rgba(209, 213, 219, 0.1)',
													},
												}}
											>
												{size.label}
											</Button>
										))}
									</Stack>
								</Box>

								{/* Color Selection */}
								<Box sx={{ marginBottom: 3 }}>
									<Typography sx={{ fontWeight: 600, marginBottom: 1 }}>Color</Typography>
									<Stack direction="row" spacing={1}>
										{colorOptions.map((colorOption) => (
											<Box
												key={colorOption.value}
												onClick={() => handleColorChange(colorOption.value)}
												sx={{
													width: '30px',
													height: '30px',
													borderRadius: '50%',
													backgroundColor: colorOption.color,
													cursor: 'pointer',
													border: selectedColor === colorOption.value ? '2px solid #4B5563' : 'none',
													'&:hover': {
														transform: 'scale(1.1)',
													},
												}}
											/>
										))}
									</Stack>
								</Box>

								{/* Quantity and Add to Cart */}
								<Stack direction="row" spacing={2} sx={{ marginBottom: 3 }}>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											border: '1px solid #D1D5DB',
											borderRadius: '4px',
											width: 'fit-content',
										}}
									>
										<Button
											onClick={() => handleChangeQuantity('decrease')}
											sx={{ minWidth: '40px' }}
											disabled={quantity <= 1}
										>
											<RemoveIcon />
										</Button>
										<Typography sx={{ px: 2 }}>{quantity}</Typography>
										<Button onClick={() => handleChangeQuantity('increase')} sx={{ minWidth: '40px' }}>
											<AddIcon />
										</Button>
									</Box>

									<Button
										variant="contained"
										onClick={handleAddToCart}
										sx={{
											backgroundColor: '#dfdfdf',
											border: '1px solid #D1D5DB',
											color: 'black',
											'&:hover': {
												backgroundColor: '#374151',
												color: 'white',
											},
											padding: '10px 24px',
										}}
									>
										Add To Cart
									</Button>

									<Button
										variant="outlined"
										sx={{
											borderColor: '#D1D5DB',
											color: '#111827',
											'&:hover': {
												backgroundColor: 'rgba(209, 213, 219, 0.1)',
												borderColor: '#9CA3AF',
											},
										}}
									>
										+ Compare
									</Button>
								</Stack>

								{/* Product Details */}
								<Box sx={{ marginTop: 4, borderTop: '1px solid #E5E7EB', paddingTop: 3 }}>
									<Stack spacing={2}>
										<Box sx={{ display: 'flex' }}>
											<Typography sx={{ width: 120, color: '#6B7280' }}>Category</Typography>
											<Typography className={'option-data'}>: {furniture?.furnitureType}</Typography>
										</Box>
										<Box sx={{ display: 'flex' }}>
											<Typography sx={{ width: 120, color: '#6B7280' }}>Made of</Typography>
											<Typography className={'option-data'}>: {furniture?.furnitureMaterial}</Typography>
										</Box>
										<Box sx={{ display: 'flex' }}>
											<Typography sx={{ width: 120, color: '#6B7280' }}>Tags</Typography>
											<Typography>: Sofa, Chair, Home, Shop</Typography>
										</Box>
										<Box sx={{ display: 'flex' }}>
											<Typography sx={{ width: 120, color: '#6B7280' }}>Share</Typography>
											<Stack direction="row" spacing={2}>
												<Box component="span" sx={{ cursor: 'pointer' }}>
													<svg
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="currentColor"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
													</svg>
												</Box>
												<Box component="span" sx={{ cursor: 'pointer' }}>
													<svg
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="currentColor"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM18.5 18.5V13.2C18.5 12.3354 18.1565 11.5062 17.5452 10.8948C16.9338 10.2835 16.1046 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C14.6813 12.17 15.0374 12.3175 15.2999 12.5801C15.5625 12.8426 15.71 13.1987 15.71 13.57V18.5H18.5ZM6.88 8.56C7.32556 8.56 7.75288 8.383 8.06794 8.06794C8.383 7.75288 8.56 7.32556 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C6.43178 5.19 6.00193 5.36805 5.68499 5.68499C5.36805 6.00193 5.19 6.43178 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z" />
													</svg>
												</Box>
												<Box component="span" sx={{ cursor: 'pointer' }}>
													<svg
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="currentColor"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28 9.09 5.11 7.38 3 4.79C2.63 5.42 2.42 6.16 2.42 6.94C2.42 8.43 3.17 9.75 4.33 10.5C3.62 10.5 2.96 10.3 2.38 10V10.03C2.38 12.11 3.86 13.85 5.82 14.24C5.19 14.41 4.53 14.44 3.89 14.31C4.16 15.14 4.69 15.86 5.41 16.38C6.13 16.9 6.99 17.18 7.89 17.18C6.37 18.38 4.49 19.03 2.56 19C2.22 19 1.88 18.98 1.54 18.93C3.44 20.15 5.7 20.84 8 20.84C16 20.84 20.33 14.25 20.33 8.55C20.33 8.37 20.33 8.19 20.32 8.01C21.16 7.41 21.88 6.65 22.46 5.77L22.46 6Z" />
													</svg>
												</Box>
											</Stack>
										</Box>
									</Stack>
								</Box>
							</Stack>
						</Stack>
					</div>
				</div>
				<div className={'container'}>
					<Stack className={'furniture-detail-config'}>
						<Stack className={'furniture-desc-config'}>
							<Stack className={'left-config'}>
								<Stack className={'prop-desc-config'}>
									<Stack className={'top'}>
										<Typography className={'title'}>Furniture Description</Typography>
										<Typography className={'desc'}>{furniture?.furnitureDesc ?? 'No Description!'}</Typography>
									</Stack>
								</Stack>
								{commentTotal !== 0 && (
									<Stack className={'reviews-config'}>
										<Stack className={'filter-box'}>
											<Stack className={'review-cnt'}>
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
													<g clipPath="url(#clip0_6507_7309)">
														<path
															d="M15.7183 4.60288C15.6171 4.3599 15.3413 4.18787 15.0162 4.16489L10.5822 3.8504L8.82988 0.64527C8.7005 0.409792 8.40612 0.257812 8.07846 0.257812C7.7508 0.257812 7.4563 0.409792 7.32774 0.64527L5.57541 3.8504L1.14072 4.16489C0.815641 4.18832 0.540363 4.36035 0.438643 4.60288C0.337508 4.84586 0.430908 5.11238 0.676772 5.28084L4.02851 7.57692L3.04025 10.9774C2.96794 11.2275 3.09216 11.486 3.35771 11.636C3.50045 11.717 3.66815 11.7575 3.83643 11.7575C3.98105 11.7575 4.12577 11.7274 4.25503 11.667L8.07846 9.88098L11.9012 11.667C12.1816 11.7979 12.5342 11.7859 12.7992 11.636C13.0648 11.486 13.189 11.2275 13.1167 10.9774L12.1284 7.57692L15.4801 5.28084C15.7259 5.11238 15.8194 4.84641 15.7183 4.60288Z"
															fill="#181A20"
														/>
													</g>
													<defs>
														<clipPath id="clip0_6507_7309">
															<rect width="15.36" height="12" fill="white" transform="translate(0.398438)" />
														</clipPath>
													</defs>
												</svg>
												<Typography className={'reviews'}>{commentTotal} reviews</Typography>
											</Stack>
										</Stack>
										<Stack className={'review-list'}>
											{furnitureComments?.map((comment: Comment) => {
												return <Review comment={comment} key={comment?._id} />;
											})}
											<Box component={'div'} className={'pagination-box'}>
												<MuiPagination
													page={commentInquiry.page}
													count={Math.ceil(commentTotal / commentInquiry.limit)}
													onChange={commentPaginationChangeHandler}
													shape="circular"
													color="primary"
												/>
											</Box>
										</Stack>
									</Stack>
								)}
								<Stack className={'leave-review-config'}>
									<Typography className={'main-title'}>Leave A Review</Typography>
									<Typography className={'review-title'}>Review</Typography>
									<textarea
										onChange={({ target: { value } }: any) => {
											setInsertCommentData({ ...insertCommentData, commentContent: value });
										}}
										value={insertCommentData.commentContent}
									></textarea>
									<Box className={'submit-btn'} component={'div'}>
										<Button
											className={'submit-review'}
											disabled={insertCommentData.commentContent === '' || user?._id === ''}
											onClick={createCommentHandler}
										>
											<Typography className={'title'}>Submit Review</Typography>
											<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
												<g clipPath="url(#clip0_6975_3642)">
													<path
														d="M16.1571 0.5H6.37936C6.1337 0.5 5.93491 0.698792 5.93491 0.944458C5.93491 1.19012 6.1337 1.38892 6.37936 1.38892H15.0842L0.731781 15.7413C0.558156 15.915 0.558156 16.1962 0.731781 16.3698C0.818573 16.4566 0.932323 16.5 1.04603 16.5C1.15974 16.5 1.27345 16.4566 1.36028 16.3698L15.7127 2.01737V10.7222C15.7127 10.9679 15.9115 11.1667 16.1572 11.1667C16.4028 11.1667 16.6016 10.9679 16.6016 10.7222V0.944458C16.6016 0.698792 16.4028 0.5 16.1571 0.5Z"
														fill="#181A20"
													/>
												</g>
												<defs>
													<clipPath id="clip0_6975_3642">
														<rect width="16" height="16" fill="white" transform="translate(0.601562 0.5)" />
													</clipPath>
												</defs>
											</svg>
										</Button>
									</Box>
								</Stack>
							</Stack>
							<Stack className={'right-config'}>
								<Stack className={'info-box'}>
									<Typography className={'main-title'}>Get in touch</Typography>
									<Stack className={'image-info'}>
										<img
											className={'member-image'}
											src={
												furniture?.memberData?.memberImage
													? `${REACT_APP_API_URL}/${furniture?.memberData?.memberImage}`
													: '/img/profile/defaultUser.svg'
											}
										/>
										<Stack className={'name-phone-listings'}>
											<Link href={`/member?memberId=${furniture?.memberData?._id}`}>
												<Typography className={'name'}>{furniture?.memberData?.memberNick}</Typography>
											</Link>
											<Stack className={'phone-number'}>
												<svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
													<g clipPath="url(#clip0_6507_6774)">
														<path
															d="M16.2858 10.11L14.8658 8.69C14.5607 8.39872 14.1551 8.23619 13.7333 8.23619C13.3115 8.23619 12.9059 8.39872 12.6008 8.69L12.1008 9.19C11.7616 9.528 11.3022 9.71778 10.8233 9.71778C10.3444 9.71778 9.88506 9.528 9.54582 9.19C9.16082 8.805 8.91582 8.545 8.67082 8.29C8.42582 8.035 8.17082 7.76 7.77082 7.365C7.43312 7.02661 7.24347 6.56807 7.24347 6.09C7.24347 5.61193 7.43312 5.15339 7.77082 4.815L8.27082 4.315C8.41992 4.16703 8.53822 3.99099 8.61889 3.79703C8.69956 3.60308 8.741 3.39506 8.74082 3.185C8.739 2.76115 8.57012 2.35512 8.27082 2.055L6.85082 0.625C6.44967 0.225577 5.9069 0.000919443 5.34082 0C5.06197 0.000410905 4.78595 0.0558271 4.52855 0.163075C4.27116 0.270322 4.03745 0.427294 3.84082 0.625L2.48582 1.97C1.50938 2.94779 0.960937 4.27315 0.960938 5.655C0.960937 7.03685 1.50938 8.36221 2.48582 9.34C3.26582 10.12 4.15582 11 5.04082 11.92C5.92582 12.84 6.79582 13.7 7.57082 14.5C8.5484 15.4749 9.87269 16.0224 11.2533 16.0224C12.6339 16.0224 13.9582 15.4749 14.9358 14.5L16.2858 13.15C16.6828 12.7513 16.9073 12.2126 16.9108 11.65C16.9157 11.3644 16.8629 11.0808 16.7555 10.8162C16.6481 10.5516 16.4884 10.3114 16.2858 10.11ZM15.5308 12.375L15.3858 12.5L13.9358 11.045C13.8875 10.99 13.8285 10.9455 13.7623 10.9142C13.6961 10.8829 13.6243 10.8655 13.5511 10.8632C13.478 10.8608 13.4051 10.8734 13.337 10.9003C13.269 10.9272 13.2071 10.9678 13.1554 11.0196C13.1036 11.0713 13.0631 11.1332 13.0361 11.2012C13.0092 11.2693 12.9966 11.3421 12.999 11.4153C13.0014 11.4884 13.0187 11.5603 13.05 11.6265C13.0813 11.6927 13.1258 11.7517 13.1808 11.8L14.6558 13.275L14.2058 13.725C13.4279 14.5005 12.3743 14.936 11.2758 14.936C10.1774 14.936 9.12372 14.5005 8.34582 13.725C7.57582 12.955 6.70082 12.065 5.84582 11.175C4.99082 10.285 4.06582 9.37 3.28582 8.59C2.51028 7.81209 2.0748 6.75845 2.0748 5.66C2.0748 4.56155 2.51028 3.50791 3.28582 2.73L3.73582 2.28L5.16082 3.75C5.26027 3.85277 5.39648 3.91182 5.53948 3.91417C5.68247 3.91651 5.82054 3.86196 5.92332 3.7625C6.02609 3.66304 6.08514 3.52684 6.08748 3.38384C6.08983 3.24084 6.03527 3.10277 5.93582 3L4.43582 1.5L4.58082 1.355C4.67935 1.25487 4.79689 1.17543 4.92654 1.12134C5.05619 1.06725 5.19534 1.03959 5.33582 1.04C5.61927 1.04085 5.89081 1.15414 6.09082 1.355L7.51582 2.8C7.61472 2.8998 7.6704 3.0345 7.67082 3.175C7.67088 3.24462 7.65722 3.31358 7.63062 3.37792C7.60403 3.44226 7.56502 3.50074 7.51582 3.55L7.01582 4.05C6.47844 4.58893 6.17668 5.31894 6.17668 6.08C6.17668 6.84106 6.47844 7.57107 7.01582 8.11C7.43582 8.5 7.66582 8.745 7.93582 9C8.20582 9.255 8.43582 9.53 8.83082 9.92C9.36974 10.4574 10.0998 10.7591 10.8608 10.7591C11.6219 10.7591 12.3519 10.4574 12.8908 9.92L13.3908 9.42C13.4929 9.32366 13.628 9.26999 13.7683 9.26999C13.9087 9.26999 14.0437 9.32366 14.1458 9.42L15.5658 10.84C15.6657 10.9387 15.745 11.0563 15.7991 11.1859C15.8532 11.3155 15.8809 11.4546 15.8808 11.595C15.8782 11.7412 15.8459 11.8853 15.7857 12.0186C15.7255 12.1518 15.6388 12.2714 15.5308 12.37V12.375Z"
															fill="#181A20"
														/>
													</g>
													<defs>
														<clipPath id="clip0_6507_6774">
															<rect width="16" height="16" fill="white" transform="translate(0.9375)" />
														</clipPath>
													</defs>
												</svg>
												<Typography className={'number'}>{furniture?.memberData?.memberPhone}</Typography>
											</Stack>
											<Typography className={'listings'}>More informations</Typography>
										</Stack>
									</Stack>
								</Stack>
								<Stack className={'info-box'}>
									<Typography className={'sub-title'}>Name</Typography>
									<input type={'text'} placeholder={'Enter your name'} />
								</Stack>
								<Stack className={'info-box'}>
									<Typography className={'sub-title'}>Phone</Typography>
									<input type={'text'} placeholder={'Enter your phone'} />
								</Stack>
								<Stack className={'info-box'}>
									<Typography className={'sub-title'}>Email</Typography>
									<input type={'text'} placeholder={'moduAgent777@gmail.com'} />
								</Stack>
								<Stack className={'info-box'}>
									<Typography className={'sub-title'}>Message</Typography>
									<textarea placeholder={'Hello, I am interested in \n' + '[Renovated furniture at  floor]'}></textarea>
								</Stack>
								<Stack className={'info-box'}>
									<Button className={'send-message'}>
										<Typography className={'title'}>Send Message</Typography>
										<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
											<g clipPath="url(#clip0_6975_593)">
												<path
													d="M16.0556 0.5H6.2778C6.03214 0.5 5.83334 0.698792 5.83334 0.944458C5.83334 1.19012 6.03214 1.38892 6.2778 1.38892H14.9827L0.630219 15.7413C0.456594 15.915 0.456594 16.1962 0.630219 16.3698C0.71701 16.4566 0.83076 16.5 0.944469 16.5C1.05818 16.5 1.17189 16.4566 1.25872 16.3698L15.6111 2.01737V10.7222C15.6111 10.9679 15.8099 11.1667 16.0556 11.1667C16.3013 11.1667 16.5001 10.9679 16.5001 10.7222V0.944458C16.5 0.698792 16.3012 0.5 16.0556 0.5Z"
													fill="white"
												/>
											</g>
											<defs>
												<clipPath id="clip0_6975_593">
													<rect width="16" height="16" fill="white" transform="translate(0.5 0.5)" />
												</clipPath>
											</defs>
										</svg>
									</Button>
								</Stack>
							</Stack>
						</Stack>
						{destinationFurnitures.length !== 0 && (
							<Stack className={'similar-furnitures-config'}>
								<Stack className={'title-pagination-box'}>
									<Stack className={'title-box'}>
										<Typography className={'main-title'}>Destination Furniture</Typography>
										<Typography className={'sub-title'}>Aliquam lacinia diam quis lacus euismod</Typography>
									</Stack>
									<Stack className={'pagination-box'}>
										<WestIcon className={'swiper-similar-prev'} />
										<div className={'swiper-similar-pagination'}></div>
										<EastIcon className={'swiper-similar-next'} />
									</Stack>
								</Stack>
								<Stack className={'cards-box'}>
									<Swiper
										className={'similar-homes-swiper'}
										slidesPerView={'auto'}
										spaceBetween={35}
										modules={[Autoplay, Navigation, Pagination]}
										navigation={{
											nextEl: '.swiper-similar-next',
											prevEl: '.swiper-similar-prev',
										}}
										pagination={{
											el: '.swiper-similar-pagination',
										}}
									>
										{destinationFurnitures.map((furniture: Furniture) => {
											return (
												<SwiperSlide className={'similar-homes-slide'} key={furniture.furnitureTitle}>
													<FurnitureBigCard
														furniture={furniture}
														likeFurnitureHandler={likeFurnitureHandler}
														key={furniture?._id}
													/>
												</SwiperSlide>
											);
										})}
									</Swiper>
								</Stack>
							</Stack>
						)}
					</Stack>
				</div>
			</div>
		);
	}
};

FurnitureDetail.defaultProps = {
	initialComment: {
		page: 1,
		limit: 5,
		sort: 'createdAt',
		direction: 'DESC',
		search: {
			commentRefId: '',
		},
	},
};

export default withLayoutFull(FurnitureDetail);
