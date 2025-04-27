'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const furnitureCategories = [
	{
		name: 'Home',
		image: '/img/banner/homeFurniture.jpg',
		input: {
			page: 1,
			limit: 9,
			sort: 'createdAt',
			direction: 'DESC',
			search: {
				pricesRange: {
					start: 0,
					end: 2000000,
				},
				typeList: ['HOME'],
			},
		},
	},
	{
		name: 'Office',
		image: '/img/banner/officeFurniture.jpg',
		input: {
			page: 1,
			limit: 9,
			sort: 'createdAt',
			direction: 'DESC',
			search: {
				pricesRange: {
					start: 0,
					end: 2000000,
				},
				typeList: ['OFFICE'],
			},
		},
	},
	{
		name: 'Outdoor',
		image: '/img/banner/outdoorFurniture.png',
		input: {
			page: 1,
			limit: 9,
			sort: 'createdAt',
			direction: 'DESC',
			search: {
				pricesRange: {
					start: 0,
					end: 2000000,
				},
				typeList: ['OUTDOOR'],
			},
		},
	},
	{
		name: 'Commercial',
		image: '/img/banner/commercialFurniture.jpg',
		input: {
			page: 1,
			limit: 9,
			sort: 'createdAt',
			direction: 'DESC',
			search: {
				pricesRange: {
					start: 0,
					end: 2000000,
				},
				typeList: ['COMMERCIAL'],
			},
		},
	},
	{
		name: 'Accessories',
		image: '/img/banner/accessoriesFurniture.jpg',
		input: {
			page: 1,
			limit: 9,
			sort: 'createdAt',
			direction: 'DESC',
			search: {
				pricesRange: {
					start: 0,
					end: 2000000,
				},
				typeList: ['ACCESSORIES'],
			},
		},
	},
];

const FurnitureCategories = () => {
	const router = useRouter();

	const handleNavigate = useCallback(
		(input: object) => {
			const queryString = encodeURIComponent(JSON.stringify(input));
			router.push(`/furniture?input=${queryString}`);
		},
		[router],
	);

	return (
		<Box className={'container'} sx={{ width: '100%', px: 3, py: 6 }}>
			<Box sx={{ width: '100%', maxWidth: '1300px', px: 3 }}>
				{/* Header */}
				<Box sx={{ textAlign: 'center', mb: 5 }}>
					<Typography
						sx={{
							color: '#333',
							fontFamily: 'Poppins',
							fontSize: '32px',
							fontWeight: 400,
							lineHeight: '65px',
						}}
					>
						Browse The Range
					</Typography>
					<Typography
						sx={{
							color: '#666',
							textAlign: 'center',
							fontFamily: 'Poppins',
							fontSize: '16px',
							fontWeight: 400,
							mt: 3,
						}}
					>
						Searching based on preference
					</Typography>
				</Box>
				{/* Swiper Carousel */}
				<Swiper
					className="furniture-swiper"
					modules={[Autoplay, Navigation, Pagination]}
					slidesPerView={3}
					spaceBetween={15}
					centeredSlides={false}
					loop={true}
					autoplay={{ delay: 3000, disableOnInteraction: false }}
					pagination={{ clickable: true, el: null }}
					navigation={true}
				>
					{furnitureCategories.map((item) => (
						<SwiperSlide key={item.name}>
							<Box
								onClick={() => handleNavigate(item.input)}
								sx={{
									height: 500,
									width: '100%',
									borderRadius: 3,
									overflow: 'hidden',
									cursor: 'pointer',
									position: 'relative',
									background: `url(${item.image}) center/cover no-repeat`,
								}}
							>
								<Box
									sx={{
										position: 'absolute',
										inset: 0,
										bgcolor: 'rgba(0, 0, 0, 0.2)',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<Typography
										variant="subtitle2"
										fontWeight={300}
										color="white"
										sx={{
											fontSize: '2.5rem',
											textShadow: '0px 0px 9px rgba(0, 0, 0, 0.8), 0px 0px 10px rgba(0, 0, 0, 0.6)',
										}}
									>
										{item.name}
									</Typography>
								</Box>
							</Box>
						</SwiperSlide>
					))}
				</Swiper>
			</Box>
		</Box>
	);
};

export default FurnitureCategories;
