import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Furniture } from '../../types/furniture/furniture';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';

interface TopFurnitureCardProps {
	furniture: Furniture;
	likeFurnitureHandler: any;
}

const TopFurnitureCard = (props: TopFurnitureCardProps) => {
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
			<Stack className="top-card-box">
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${furniture?.furnitureImages[0]})` }}
					onClick={() => pushDetailHandler(furniture._id)}
				>
					<div>${furniture?.furniturePrice}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'} onClick={() => pushDetailHandler(furniture._id)}>
						{furniture?.furnitureTitle}
					</strong>
					<p className={'desc'}>{furniture?.furnitureBrand}</p>
					<div className={'options'}>
						<div>
							<img src="/img/icons/bed.svg" alt="" />
							<span>{furniture?.furnitureColor} color</span>
						</div>
						<div>
							<img src="/img/icons/room.svg" alt="" />
							<span>{furniture?.furnitureCondition} condition</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<p> {furniture.furnitureBarter ? 'Barter' : ''}</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{furniture?.furnitureViews}</Typography>
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
			<Stack className="top-card-box">
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${furniture?.furnitureImages[0]})` }}
					onClick={() => pushDetailHandler(furniture._id)}
				>
					<div>${furniture?.furniturePrice}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'} onClick={() => pushDetailHandler(furniture._id)}>
						{furniture?.furnitureTitle}
					</strong>
					<p className={'desc'}>{furniture?.furnitureBrand}</p>
					<div className={'options'}>
						<div>
							<img src="/img/icons/bed.svg" alt="" />
							<span>{furniture?.furnitureColor} color</span>
						</div>
						<div>
							<img src="/img/icons/room.svg" alt="" />
							<span>{furniture?.furnitureCondition} Condition</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<p> {furniture.furnitureBarter ? 'Barter' : ''}</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{furniture?.furnitureViews}</Typography>
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

export default TopFurnitureCard;
