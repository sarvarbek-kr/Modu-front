import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { Furniture } from '../../types/furniture/furniture';

interface TrendFurnitureCardProps {
	furniture: Furniture;
	likeFurnitureHandler: any;
}

const TrendFurnitureCard = (props: TrendFurnitureCardProps) => {
	const { furniture, likeFurnitureHandler } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

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
	}
};

export default TrendFurnitureCard;
