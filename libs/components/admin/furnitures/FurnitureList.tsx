import React from 'react';
import Link from 'next/link';
import {
	TableCell,
	TableHead,
	TableBody,
	TableRow,
	Table,
	TableContainer,
	Button,
	Menu,
	Fade,
	MenuItem,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Stack } from '@mui/material';
import { Furniture } from '../../../types/furniture/furniture';
import { REACT_APP_API_URL } from '../../../config';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { FurnitureStatus } from '../../../enums/furniture.enum';

interface Data {
	id: string;
	title: string;
	price: string;
	agent: string;
	location: string;
	type: string;
	status: string;
}

type Order = 'asc' | 'desc';

interface HeadCell {
	disablePadding: boolean;
	id: keyof Data;
	label: string;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{
		id: 'id',
		numeric: true,
		disablePadding: false,
		label: 'MB ID',
	},
	{
		id: 'title',
		numeric: true,
		disablePadding: false,
		label: 'TITLE',
	},
	{
		id: 'price',
		numeric: false,
		disablePadding: false,
		label: 'PRICE',
	},
	{
		id: 'agent',
		numeric: false,
		disablePadding: false,
		label: 'AGENT',
	},
	{
		id: 'location',
		numeric: false,
		disablePadding: false,
		label: 'LOCATION',
	},
	{
		id: 'type',
		numeric: false,
		disablePadding: false,
		label: 'TYPE',
	},
	{
		id: 'status',
		numeric: false,
		disablePadding: false,
		label: 'STATUS',
	},
];

interface EnhancedTableProps {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, furniture: keyof Data) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const { onSelectAllClick } = props;

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'left' : 'center'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
					>
						{headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

interface FurniturePanelListType {
	furnitures: Furniture[];
	anchorEl: any;
	menuIconClickHandler: any;
	menuIconCloseHandler: any;
	updateFurnitureHandler: any;
	removeFurnitureHandler: any;
}

export const FurniturePanelList = (props: FurniturePanelListType) => {
	const {
		furnitures,
		anchorEl,
		menuIconClickHandler,
		menuIconCloseHandler,
		updateFurnitureHandler,
		removeFurnitureHandler,
	} = props;

	return (
		<Stack>
			<TableContainer>
				<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
					{/*@ts-ignore*/}
					<EnhancedTableHead />
					<TableBody>
						{furnitures.length === 0 && (
							<TableRow>
								<TableCell align="center" colSpan={8}>
									<span className={'no-data'}>data not found!</span>
								</TableCell>
							</TableRow>
						)}

						{furnitures.length !== 0 &&
							furnitures.map((furniture: Furniture, index: number) => {
								const furnitureImage = `${REACT_APP_API_URL}/${furniture?.furnitureImages[0]}`;

								return (
									<TableRow hover key={furniture?._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell align="left">{furniture._id}</TableCell>
										<TableCell align="left" className={'name'}>
											{furniture.furnitureStatus === FurnitureStatus.ACTIVE ? (
												<Stack direction={'row'}>
													<Link href={`/furniture/detail?id=${furniture?._id}`}>
														<div>
															<Avatar alt="Remy Sharp" src={furnitureImage} sx={{ ml: '2px', mr: '10px' }} />
														</div>
													</Link>
													<Link href={`/furniture/detail?id=${furniture?._id}`}>
														<div>{furniture.furnitureTitle}</div>
													</Link>
												</Stack>
											) : (
												<Stack direction={'row'}>
													<div>
														<Avatar alt="Remy Sharp" src={furnitureImage} sx={{ ml: '2px', mr: '10px' }} />
													</div>
													<div style={{ marginTop: '10px' }}>{furniture.furnitureTitle}</div>
												</Stack>
											)}
										</TableCell>
										<TableCell align="center">{furniture.furniturePrice}</TableCell>
										<TableCell align="center">{furniture.memberData?.memberNick}</TableCell>
										<TableCell align="center">{furniture.furnitureLocation}</TableCell>
										<TableCell align="center">{furniture.furnitureType}</TableCell>
										<TableCell align="center">
											{furniture.furnitureStatus === FurnitureStatus.DELETE && (
												<Button
													variant="outlined"
													sx={{ p: '3px', border: 'none', ':hover': { border: '1px solid #000000' } }}
													onClick={() => removeFurnitureHandler(furniture._id)}
												>
													<DeleteIcon fontSize="small" />
												</Button>
											)}

											{furniture.furnitureStatus === FurnitureStatus.SOLD && (
												<Button className={'badge warning'}>{furniture.furnitureStatus}</Button>
											)}

											{furniture.furnitureStatus === FurnitureStatus.ACTIVE && (
												<>
													<Button onClick={(e: any) => menuIconClickHandler(e, index)} className={'badge success'}>
														{furniture.furnitureStatus}
													</Button>

													<Menu
														className={'menu-modal'}
														MenuListProps={{
															'aria-labelledby': 'fade-button',
														}}
														anchorEl={anchorEl[index]}
														open={Boolean(anchorEl[index])}
														onClose={menuIconCloseHandler}
														TransitionComponent={Fade}
														sx={{ p: 1 }}
													>
														{Object.values(FurnitureStatus)
															.filter((ele) => ele !== furniture.furnitureStatus)
															.map((status: string) => (
																<MenuItem
																	onClick={() =>
																		updateFurnitureHandler({ _id: furniture._id, furnitureStatus: status })
																	}
																	key={status}
																>
																	<Typography variant={'subtitle1'} component={'span'}>
																		{status}
																	</Typography>
																</MenuItem>
															))}
													</Menu>
												</>
											)}
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
};
