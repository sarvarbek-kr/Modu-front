'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Stack } from 'phosphor-react';

const furnitureCategories = [
	{
		name: 'Home',
		image: '/img/banner/homeFurniture.jpg',
		// link: '/furniture?input={"search":{"typeList":["HOME"]}}',
		link: '/furniture?input={%22page%22:1,%22limit%22:9,%22sort%22:%22createdAt%22,%22direction%22:%22DESC%22,%22search%22:{%22pricesRange%22:{%22start%22:0,%22end%22:2000000},%22typeList%22:[%22HOME%22]}}',
	},
	{
		name: 'Office',
		image: '/img/banner/officeFurniture.jpg',
		link: '/furniture?input={"search":{"typeList":["OFFICE"]}}',
	},
	{
		name: 'Outdoor',
		image: '/img/banner/outdoorFurniture.png',
		link: '/furniture?input={"search":{"typeList":["OUTDOOR"]}}',
	},
	{
		name: 'Commercial',
		image: '/img/banner/commercialFurniture.jpg',
		link: '/furniture?input={"search":{"typeList":["COMMERCIAL"]}}',
	},
	{
		name: 'Accessories',
		image: '/img/banner/accessoriesFurniture.jpg',
		link: '/furniture?input={"search":{"typeList":["ACCESSORIES"]}}',
	},
];

const FurnitureCategories = () => {
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
					spaceBetween={5}
					centeredSlides={false}
					loop={true}
					autoplay={{ delay: 3000, disableOnInteraction: false }}
					pagination={{ clickable: true, el: null }}
					navigation={true}
				>
					{furnitureCategories.map((item) => (
						<SwiperSlide key={item.name}>
							<Link href={item.link} passHref>
								<Box
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
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			</Box>
		</Box>
	);
};

export default FurnitureCategories;
