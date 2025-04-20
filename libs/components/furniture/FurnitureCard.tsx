import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Furniture } from '../../types/furniture/furniture';
import Link from 'next/link';
import { formatterStr } from '../../utils';
import { REACT_APP_API_URL, topFurnitureRank } from '../../config';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface FurnitureCardType {
	furniture: Furniture;
	likeFurnitureHandler?: any;
	myFavorites?: boolean;
	recentlyVisited?: boolean;
}

const FurnitureCard = (props: FurnitureCardType) => {
	const { furniture, likeFurnitureHandler, myFavorites, recentlyVisited } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const imagePath: string = furniture?.furnitureImages[0]
		? `${REACT_APP_API_URL}/${furniture?.furnitureImages[0]}`
		: '/img/banner/header1.svg';

	if (device === 'mobile') {
		return <div>FURNITURE CARD</div>;
	} else {
		return (
			<Stack className="card-config">
				<Stack className="top">
					<Link
						href={{
							pathname: '/furniture/detail',
							query: { id: furniture?._id },
						}}
					>
						<img src={imagePath} alt="" />
					</Link>
					{furniture && furniture?.furnitureRank > topFurnitureRank && (
						<Box component={'div'} className={'top-badge'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<Typography>TOP</Typography>
						</Box>
					)}
					<Box component={'div'} className={'price-box'}>
						<Typography>${formatterStr(furniture?.furniturePrice)}</Typography>
					</Box>
				</Stack>
				<Stack className="bottom">
					<Stack className="name-address">
						<Stack className="name">
							<Link
								href={{
									pathname: '/furniture/detail',
									query: { id: furniture?._id },
								}}
							>
								<Typography>{furniture.furnitureTitle}</Typography>
							</Link>
						</Stack>
						<Stack className="address">
							<Typography>
								{furniture.furnitureBrand} /{furniture.furnitureLocation}
							</Typography>
						</Stack>
					</Stack>
					<Stack className="options">
						<Stack className="option">
							<img src="/img/icons/bed.svg" alt="" /> <Typography>{furniture.furnitureColor} color</Typography>
						</Stack>
						<Stack className="option">
							<img src="/img/icons/room.svg" alt="" /> <Typography>{furniture.furnitureCondition} condition</Typography>
						</Stack>
					</Stack>
					<Stack className="divider"></Stack>
					<Stack className="type-buttons">
						<Stack className="type">
							<Typography
								sx={{ fontWeight: 500, fontSize: '13px' }}
								className={furniture.furnitureBarter ? '' : 'disabled-type'}
							>
								Barter
							</Typography>
						</Stack>
						{!recentlyVisited && (
							<Stack className="buttons">
								<IconButton color={'default'}>
									<RemoveRedEyeIcon />
								</IconButton>
								<Typography className="view-cnt">{furniture?.furnitureViews}</Typography>
								<IconButton color={'default'} onClick={() => likeFurnitureHandler(user, furniture?._id)}>
									{myFavorites ? (
										<FavoriteIcon color="primary" />
									) : furniture?.meLiked && furniture?.meLiked[0]?.myFavorite ? (
										<FavoriteIcon color="primary" />
									) : (
										<FavoriteBorderIcon />
									)}
								</IconButton>
								<Typography className="view-cnt">{furniture?.furnitureLikes}</Typography>
							</Stack>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default FurnitureCard;
