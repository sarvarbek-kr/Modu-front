import React, { useState } from 'react';
import { Stack, Box, Typography, Button, Tooltip, Snackbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { Furniture } from '../../types/furniture/furniture';
import { REACT_APP_API_URL } from '../../config';

interface TrendFurnitureCardProps {
	furniture: Furniture;
	likeFurnitureHandler: any;
}

const TrendFurnitureCard = (props: TrendFurnitureCardProps) => {
	const { furniture, likeFurnitureHandler } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const copyLinkHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation(); // boshqa eventlarni to‘xtatish
		const link = `${window.location.origin}/furniture/detail?id=${furniture._id}`;
		navigator.clipboard.writeText(link).then(() => {
			setOpenSnackbar(true);
		});
	};

	/** HANDLERS **/

	const pushDetailHandler = async (furnitureId: string) => {
		console.log('furnitureId:', furnitureId);
		await router.push({ pathname: '/furniture/detail', query: { id: furnitureId } });
	};

	if (device === 'mobile') {
		return (
			<Stack className="trend-card-box" key={furniture._id}>
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${furniture?.furnitureImages[0]})` }}
					onClick={() => pushDetailHandler(furniture._id)}
				>
					<div>${furniture.furniturePrice}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'} onClick={() => pushDetailHandler(furniture._id)}>
						{furniture.furnitureTitle}
					</strong>
					<div className={'bott'}>
						<div className="view-like-box">
							<IconButton color={'default'} onClick={() => likeFurnitureHandler(user, furniture?._id)}>
								{furniture?.meLiked && furniture?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{furniture?.furnitureLikes}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	} else {
		return (
			<Stack className="trend-card-box" key={furniture._id}>
				<Stack className="container">
					<Box
						component={'div'}
						className={'card-img'}
						style={{ backgroundImage: `url(${REACT_APP_API_URL}/${furniture?.furnitureImages[0]})` }}
					>
						{' '}
						<Button
							className={'shop-btn'}
							onClick={(e) => {
								e.stopPropagation();
								pushDetailHandler(furniture._id);
							}}
						>
							<b>View Item</b>
						</Button>
						<div className="view-like-box">
							<IconButton
								className="shareIcon"
								onClick={(e) => {
									e.stopPropagation(); // prevent click from bubbling up
									copyLinkHandler(e);
								}}
								style={{ color: 'white', marginLeft: '50px' }}
							>
								<Tooltip title="Copy Link">
									<ShareIcon />
								</Tooltip>
								<div className="share" style={{ color: 'white', fontSize: '18px', fontWeight: 600, marginLeft: '9px' }}>
									share
								</div>
							</IconButton>
							<IconButton
								className="like"
								color={'default'}
								onClick={(e) => {
									e.stopPropagation();
									likeFurnitureHandler(user, furniture?._id);
								}}
							>
								{furniture?.meLiked && furniture?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteBorderIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{furniture?.furnitureLikes} like</Typography>
						</div>
					</Box>
					<Box component={'div'} className={'info'}>
						<strong className={'title'} onClick={() => pushDetailHandler(furniture._id)}>
							{furniture.furnitureTitle}
						</strong>
						<div className={'bott'}>
							<div className="furnBrand">{furniture?.furnitureBrand}</div>
							<div className="furnPrice">${furniture.furniturePrice}</div>
						</div>
					</Box>
					<Snackbar
						open={openSnackbar}
						autoHideDuration={2000}
						onClose={() => setOpenSnackbar(false)}
						message="Link copied to clipboard!"
						anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
						className="snackbar-root"
					/>
				</Stack>
			</Stack>
		);
	}
};

export default TrendFurnitureCard;
