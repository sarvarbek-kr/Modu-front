'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const furnitureCategories = [
	{
		name: 'Home',
		image: '/img/banner/homeFurniture.jpg',
		link: '/furniture?input={"search":{"typeList":["HOME"]}}',
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
		<Box sx={{ width: '100%', px: 3, py: 6 }}>
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
				modules={[Autoplay, Navigation, Pagination]}
				slidesPerView={4}
				spaceBetween={30}
				centeredSlides={false}
				loop={true}
				autoplay={{ delay: 3000, disableOnInteraction: false }}
				pagination={{ clickable: true }}
				navigation={true}
				style={{
					maxWidth: '1300px',
					margin: '0 auto',
					padding: '0 15px', // Optional: Padding to avoid edges
				}}
			>
				{furnitureCategories.map((item) => (
					<SwiperSlide key={item.name}>
						<Link href={item.link} passHref>
							<Box
								sx={{
									height: 500,
									width: 300,
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
										variant="subtitle1"
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
	);
};

export default FurnitureCategories;
