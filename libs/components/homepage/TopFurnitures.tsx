import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import TopFurnitureCard from './TopFurnitureCard';
import { FurnituresInquiry } from '../../types/furniture/furniture.input';
import { Furniture } from '../../types/furniture/furniture';
import { useMutation, useQuery } from '@apollo/client';
import { GET_FURNITURES } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { LIKE_TARGET_FURNITURE } from '../../../apollo/user/mutation';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { Message } from '../../enums/common.enum';

interface TopFurnituresProps {
	initialInput: FurnituresInquiry;
}

const TopFurnitures = (props: TopFurnituresProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [topFurnitures, setTopFurnitures] = useState<Furniture[]>([]);

	/** APOLLO REQUESTS **/

	const [likeTargetFurniture] = useMutation(LIKE_TARGET_FURNITURE);

	const {
		loading: getFurnituresLoading,
		data: getFurnituresData,
		error: getFurnituresError,
		refetch: getFurnituresRefetch,
	} = useQuery(GET_FURNITURES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setTopFurnitures(data?.getFurnitures?.list);
		},
	});
	/** HANDLERS **/

	const likeFurnitureHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

			// execute likeTargetFurniture Mutation
			await likeTargetFurniture({ variables: { input: id } });

			// exucute getFurnituresRefetch
			await getFurnituresRefetch({ input: initialInput });

			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log('ERROR, likeFurnitureHandler:', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	if (device === 'mobile') {
		return (
			<Stack className={'top-furnitures'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>Top furnitures</span>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'top-furniture-swiper'}
							slidesPerView={'auto'}
							centeredSlides={true}
							spaceBetween={15}
							modules={[Autoplay]}
						>
							{topFurnitures.map((furniture: Furniture) => {
								return (
									<SwiperSlide className={'top-furniture-slide'} key={furniture?._id}>
										<TopFurnitureCard furniture={furniture} likeFurnitureHandler={likeFurnitureHandler} />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'top-furnitures'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span>Top furnitures</span>
							<p>Check out our Top Furnitures</p>
						</Box>
						<Box component={'div'} className={'right'}>
							<div className={'pagination-box'}>
								<WestIcon className={'swiper-top-prev'} />
								<div className={'swiper-top-pagination'}></div>
								<EastIcon className={'swiper-top-next'} />
							</div>
						</Box>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'top-furniture-swiper'}
							slidesPerView={'auto'}
							spaceBetween={15}
							modules={[Autoplay, Navigation, Pagination]}
							navigation={{
								nextEl: '.swiper-top-next',
								prevEl: '.swiper-top-prev',
							}}
							pagination={{
								el: '.swiper-top-pagination',
							}}
						>
							{topFurnitures.map((furniture: Furniture) => {
								return (
									<SwiperSlide className={'top-furniture-slide'} key={furniture?._id}>
										<TopFurnitureCard furniture={furniture} likeFurnitureHandler={likeFurnitureHandler} />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

TopFurnitures.defaultProps = {
	initialInput: {
		page: 1,
		limit: 8,
		sort: 'furnitureRank',
		direction: 'DESC',
		search: {},
	},
};

export default TopFurnitures;
