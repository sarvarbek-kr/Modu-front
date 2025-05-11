import React, { useCallback, useEffect, useState } from 'react';
import {
	Stack,
	Typography,
	Checkbox,
	Button,
	OutlinedInput,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Tooltip,
	IconButton,
	Radio,
	Chip,
	Box,
	Collapse,
	Paper,
	Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { FurnitureBrand, FurnitureColor, FurnitureLocation, FurnitureType } from '../../enums/furniture.enum';
import { FurnituresInquiry } from '../../types/furniture/furniture.input';
import { useRouter } from 'next/router';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import RefreshIcon from '@mui/icons-material/Refresh';

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: '200px',
		},
	},
};

interface FilterType {
	searchFilter: FurnituresInquiry;
	setSearchFilter: any;
	initialInput: FurnituresInquiry;
}

const Filter = (props: FilterType) => {
	const { searchFilter, setSearchFilter, initialInput } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const [furnitureLocation, setFurnitureLocation] = useState<FurnitureLocation[]>(Object.values(FurnitureLocation));
	const [furnitureType, setFurnitureType] = useState<FurnitureType[]>(Object.values(FurnitureType));
	const [furnitureColor, setFurnitureColor] = useState<FurnitureColor[]>(Object.values(FurnitureColor));
	const [furnitureBrand, setFurnitureBrand] = useState<FurnitureBrand[]>(Object.values(FurnitureBrand));
	const [searchText, setSearchText] = useState<string>('');
	const [showMore, setShowMore] = useState<boolean>(false);
	const [brandExpanded, setBrandExpanded] = useState<boolean>(true);

	/** LIFECYCLES **/
	useEffect(() => {
		if (searchFilter?.search?.locationList?.length == 0) {
			delete searchFilter.search.locationList;
			setShowMore(false);
			router
				.push(
					`/furniture?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/furniture?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.typeList?.length == 0) {
			delete searchFilter.search.typeList;
			router
				.push(
					`/furniture?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/furniture?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.brandList?.length == 0) {
			delete searchFilter.search.brandList;
			router
				.push(
					`/furniture?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/furniture?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.locationList) setShowMore(true);
		if (searchFilter?.search?.brandList) setBrandExpanded(true);
	}, [searchFilter]);

	/** HANDLERS **/
	const furnitureLocationSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/furniture?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, locationList: [...(searchFilter?.search?.locationList || []), value] },
						})}`,
						`/furniture?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, locationList: [...(searchFilter?.search?.locationList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.locationList?.includes(value)) {
					await router.push(
						`/furniture?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								locationList: searchFilter?.search?.locationList?.filter((item: string) => item !== value),
							},
						})}`,
						`/furniture?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								locationList: searchFilter?.search?.locationList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.typeList?.length == 0) {
					alert('error');
				}

				console.log('furnitureLocationSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, furnitureLocationSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const furnitureTypeSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/furniture?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						`/furniture?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.typeList?.includes(value)) {
					await router.push(
						`/furniture?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						`/furniture?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.typeList?.length == 0) {
					alert('error');
				}

				console.log('furnitureTypeSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, furnitureTypeSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const furnitureBrandSelectHandler = useCallback(
		async (brand: any, isSelected: boolean) => {
			try {
				if (isSelected) {
					await router.push(
						`/furniture?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, brandList: [...(searchFilter?.search?.brandList || []), brand] },
						})}`,
						`/furniture?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, brandList: [...(searchFilter?.search?.brandList || []), brand] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.brandList?.includes(brand)) {
					await router.push(
						`/furniture?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								brandList: searchFilter?.search?.brandList?.filter((item: string) => item !== brand),
							},
						})}`,
						`/furniture?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								brandList: searchFilter?.search?.brandList?.filter((item: string) => item !== brand),
							},
						})}`,
						{ scroll: false },
					);
				}

				console.log('furnitureBrandSelectHandler:', brand, isSelected);
			} catch (err: any) {
				console.log('ERROR, furnitureBrandSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const furniturePriceHandler = useCallback(
		async (value: number, type: string) => {
			if (type == 'start') {
				await router.push(
					`/furniture?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, start: value * 1 },
						},
					})}`,
					`/furniture?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, start: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			} else {
				await router.push(
					`/furniture?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, end: value * 1 },
						},
					})}`,
					`/furniture?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, end: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			}
		},
		[searchFilter],
	);

	const refreshHandler = async () => {
		try {
			setSearchText('');
			await router.push(
				`/furniture?input=${JSON.stringify(initialInput)}`,
				`/furniture?input=${JSON.stringify(initialInput)}`,
				{ scroll: false },
			);
		} catch (err: any) {
			console.log('ERROR, refreshHandler:', err);
		}
	};

	if (device === 'mobile') {
		return <div>FURNITURES FILTER</div>;
	} else {
		return (
			<Stack className={'filter-main'}>
				<Stack className={'find-your-furniture'} mb={'40px'}>
					<Typography className={'title-main'}>Find Your Furniture</Typography>
					<Stack className={'input-box'}>
						<OutlinedInput
							value={searchText}
							type={'text'}
							className={'search-input'}
							placeholder={'What are you looking for?'}
							onChange={(e: any) => setSearchText(e.target.value)}
							onKeyDown={(event: any) => {
								if (event.key == 'Enter') {
									setSearchFilter({
										...searchFilter,
										search: { ...searchFilter.search, text: searchText },
									});
								}
							}}
							endAdornment={
								<>
									<CancelRoundedIcon
										onClick={() => {
											setSearchText('');
											setSearchFilter({
												...searchFilter,
												search: { ...searchFilter.search, text: '' },
											});
										}}
									/>
								</>
							}
						/>
						<img src={'/img/icons/search_icon.png'} alt={''} />
						<Tooltip title="Reset">
							<IconButton onClick={refreshHandler}>
								<RefreshIcon />
							</IconButton>
						</Tooltip>
					</Stack>
				</Stack>
				<Stack className={'find-your-category'} mb={'30px'}>
					<Typography className={'title'}>Categories</Typography>
					{furnitureType.map((type: string) => (
						<Stack className={'input-box'} key={type}>
							<Checkbox
								id={type}
								className="furniture-checkbox"
								style={{ color: 'default' }}
								size="small"
								value={type}
								onChange={furnitureTypeSelectHandler}
								checked={(searchFilter?.search?.typeList || []).includes(type as FurnitureType)}
							/>
							<label style={{ cursor: 'pointer' }}>
								<Typography className="furniture-type">{type}</Typography>
							</label>
						</Stack>
					))}
				</Stack>
				<Stack className={'find-your-location'} mb={'30px'}>
					<p className={'title'}>Location</p>
					<Stack
						className={`furniture-location`}
						style={{ height: showMore ? '253px' : '115px' }}
						onMouseEnter={() => setShowMore(true)}
						onMouseLeave={() => {
							if (!searchFilter?.search?.locationList) {
								setShowMore(false);
							}
						}}
					>
						{furnitureLocation.map((location: string) => {
							return (
								<Stack className={'input-box'} key={location}>
									<Checkbox
										id={location}
										className="furniture-checkbox"
										color="default"
										size="small"
										value={location}
										checked={(searchFilter?.search?.locationList || []).includes(location as FurnitureLocation)}
										onChange={furnitureLocationSelectHandler}
									/>
									<label htmlFor={location} style={{ cursor: 'pointer' }}>
										<Typography className="furniture-loca">{location}</Typography>
									</label>
								</Stack>
							);
						})}
					</Stack>
				</Stack>

				{/* New Brand Filter Section */}
				<Stack className="find-your-brand">
					<Typography className={'title'}>Brand</Typography>
					<Grid container spacing={1}>
						{furnitureBrand.map((brand: string) => (
							<Grid item xs={4} key={brand} className="brand-vip">
								<Chip
									label={brand}
									className="brand-chip"
									color={
										(searchFilter?.search?.brandList || []).includes(brand as FurnitureBrand) ? 'primary' : 'default'
									}
									variant={
										(searchFilter?.search?.brandList || []).includes(brand as FurnitureBrand) ? 'filled' : 'outlined'
									}
									onClick={() =>
										furnitureBrandSelectHandler(
											brand,
											!(searchFilter?.search?.brandList || []).includes(brand as FurnitureBrand),
										)
									}
									clickable
									sx={{
										width: '100%',
										'& .MuiChip-label': {
											color: (searchFilter?.search?.brandList || []).includes(brand as FurnitureBrand)
												? 'white'
												: 'inherit',
										},
									}}
								/>
							</Grid>
						))}
					</Grid>
				</Stack>

				<Stack className={'find-your-range'}>
					<Typography className={'title'}>Price Range</Typography>
					<Stack className="square-year-input">
						<input
							type="number"
							placeholder="$ min"
							min={0}
							value={searchFilter?.search?.pricesRange?.start ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									furniturePriceHandler(e.target.value, 'start');
								}
							}}
						/>
						<div className="central-divider"></div>
						<input
							type="number"
							placeholder="$ max"
							value={searchFilter?.search?.pricesRange?.end ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									furniturePriceHandler(e.target.value, 'end');
								}
							}}
						/>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Filter;
