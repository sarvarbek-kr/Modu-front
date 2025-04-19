import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Furniture } from '../../types/furniture/furniture';
import { REACT_APP_API_URL, topFurnitureRank } from '../../config';
import { formatterStr } from '../../utils';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface FurnitureBigCardProps {
	furniture: Furniture;
	likeFurnitureHandler?: any;
}

const FurnitureBigCard = (props: FurnitureBigCardProps) => {
	const { furniture, likeFurnitureHandler } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const router = useRouter();

	/** HANDLERS **/
	const goFurnitureDetatilPage = (furnitureId: string) => {
		router.push(`/furniture/detail?id=${furnitureId}`);
	};

	if (device === 'mobile') {
		return <div>APARTMEND BIG CARD</div>;
	} else {
		return (
			<Stack className="furniture-big-card-box" onClick={() => goFurnitureDetatilPage(furniture?._id)}>
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${furniture?.furnitureImages?.[0]})` }}
				>
					{furniture && furniture?.furnitureRank >= topFurnitureRank && (
						<div className={'status'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<span>top</span>
						</div>
					)}

					<div className={'price'}>${formatterStr(furniture?.furniturePrice)}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}>{furniture?.furnitureTitle}</strong>
					<p className={'desc'}>{furniture?.furnitureAddress}</p>
					<div className={'options'}>
						<div>
							<img src="/img/icons/bed.svg" alt="" />
							<span>{furniture?.furnitureBeds} bed</span>
						</div>
						<div>
							<img src="/img/icons/room.svg" alt="" />
							<span>{furniture?.furnitureRooms} rooms</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<div>{furniture?.furnitureBarter ? <p>Barter</p> : <span>Barter</span>}</div>
						<div className="buttons-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{furniture?.furnitureViews}</Typography>
							<IconButton
								color={'default'}
								onClick={(e) => {
									e.stopPropagation();
									likeFurnitureHandler(user, furniture?._id);
								}}
							>
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

export default FurnitureBigCard;
