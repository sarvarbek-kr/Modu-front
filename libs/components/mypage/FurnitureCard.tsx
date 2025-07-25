import { Menu, MenuItem, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import IconButton from '@mui/material/IconButton';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import { Furniture } from '../../types/furniture/furniture';
import { formatterStr } from '../../utils';
import Moment from 'react-moment';
import { useRouter } from 'next/router';
import { FurnitureStatus } from '../../enums/furniture.enum';

interface FurnitureCardProps {
	furniture: Furniture;
	deleteFurnitureHandler?: any;
	memberPage?: boolean;
	updateFurnitureHandler?: any;
}

export const FurnitureCard = (props: FurnitureCardProps) => {
	const { furniture, deleteFurnitureHandler, memberPage, updateFurnitureHandler } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	/** HANDLERS **/
	const pushEditFurniture = async (id: string) => {
		console.log('+pushEditFurniture: ', id);
		await router.push({
			pathname: '/mypage',
			query: { category: 'addFurniture', furnitureId: id },
		});
	};

	const pushFurnitureDetail = async (id: string) => {
		if (memberPage)
			await router.push({
				pathname: '/furniture/detail',
				query: { id: id },
			});
		else return;
	};

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	if (device === 'mobile') {
		return <div>MOBILE FURNITURE CARD</div>;
	} else
		return (
			<Stack className="furniture-card-box">
				<Stack className="image-box" onClick={() => pushFurnitureDetail(furniture?._id)}>
					<img src={`${process.env.REACT_APP_API_URL}/${furniture.furnitureImages[0]}`} alt="" />
				</Stack>
				<Stack className="information-box" onClick={() => pushFurnitureDetail(furniture?._id)}>
					<Typography className="name">{furniture.furnitureTitle}</Typography>
					<Typography className="price">
						<strong>${formatterStr(furniture?.furniturePrice)}</strong>
					</Typography>
				</Stack>
				<Stack className="date-box">
					<Typography className="date">
						<Moment format="DD MMMM, YYYY">{furniture.createdAt}</Moment>
					</Typography>
				</Stack>
				<Stack className="status-box">
					<Stack className="coloured-box" sx={{ background: '#E5F0FD' }} onClick={handleClick}>
						<Typography className="status" sx={{ color: '#3554d1' }}>
							{furniture.furnitureStatus}
						</Typography>
					</Stack>
				</Stack>
				{!memberPage && furniture.furnitureStatus !== 'SOLD' && (
					<Menu
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						PaperProps={{
							elevation: 0,
							sx: {
								width: '70px',
								mt: 1,
								ml: '10px',
								overflow: 'visible',
								filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							},
							style: {
								padding: 0,
								display: 'flex',
								justifyContent: 'center',
							},
						}}
					>
						{furniture.furnitureStatus === 'ACTIVE' && (
							<>
								<MenuItem
									disableRipple
									onClick={() => {
										handleClose();
										updateFurnitureHandler(FurnitureStatus.SOLD, furniture?._id);
									}}
								>
									Sold
								</MenuItem>
							</>
						)}
					</Menu>
				)}

				<Stack className="views-box">
					<Typography className="views">{furniture.furnitureViews.toLocaleString()}</Typography>
				</Stack>
				{!memberPage && furniture.furnitureStatus === FurnitureStatus.ACTIVE && (
					<Stack className="action-box">
						<IconButton className="icon-button" onClick={() => pushEditFurniture(furniture._id)}>
							<ModeIcon className="buttons" />
						</IconButton>
						<IconButton className="icon-button" onClick={() => deleteFurnitureHandler(furniture._id)}>
							<DeleteIcon className="buttons" />
						</IconButton>
					</Stack>
				)}
			</Stack>
		);
};
