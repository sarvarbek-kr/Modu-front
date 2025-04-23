import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

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
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % furnitureCategories.length);
		}, 8000);
		return () => clearInterval(interval);
	}, []);

	const getVisibleItems = () => {
		const items = [];
		for (let i = 0; i < 4; i++) {
			items.push(furnitureCategories[(currentIndex + i) % furnitureCategories.length]);
		}
		return items;
	};

	return (
		<Box sx={{ width: '100%', px: 3, py: 6, overflow: 'hidden' }}>
			{/* 🔹 Browse the Range Header */}
			<Box sx={{ textAlign: 'center', mb: 5 }}>
				<Typography
					sx={{
						color: 'var(--Font-Color, #333)',
						fontFamily: 'Poppins',
						fontSize: '32px', // 32px -> 20% kichik
						fontStyle: 'normal',
						fontWeight: 400,
						lineHeight: '65px',
						width: '559px',
						height: '28.711px',
						margin: '0 auto',
					}}
				>
					Browse The Range
				</Typography>
				<Typography
					sx={{
						color: 'var(--Font-Color1, #666)',
						textAlign: 'center',
						fontFamily: 'Poppins',
						fontSize: '16px', // 20px -> 20% kichik
						fontStyle: 'normal',
						fontWeight: 400,
						lineHeight: 'normal',
						mt: 3, // mt: 1 dan 3 ga oshirildi
					}}
				>
					Searching based on preference
				</Typography>
			</Box>

			{/* 🔹 Carousel */}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					gap: 3,
					flexWrap: 'wrap',
				}}
			>
				{getVisibleItems().map((item, index) => (
					<Link href={item.link} key={item.name} passHref>
						<Box
							sx={{
								flex: '1 1 22%',
								minWidth: '250px',
								maxWidth: '300px',
								transform: index === 1 || index === 2 ? 'scale(1.05)' : 'scale(0.95)',
								transition: 'transform 0.7s ease',
								borderRadius: 3,
								overflow: 'hidden',
								backgroundColor: '#fff',
								cursor: 'pointer',
								'&:hover': {
									transform: index === 1 || index === 2 ? 'scale(1.1)' : 'scale(1)',
								},
								position: 'relative',
								height: '460px',
							}}
						>
							<Box
								sx={{
									position: 'absolute',
									top: 0,
									left: 0,
									width: '100%',
									height: '100%',
									background: `url(${item.image}) lightgray 50% / cover no-repeat`,
									zIndex: 0,
								}}
							/>
							<Box
								sx={{
									position: 'relative',
									zIndex: 1,
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
									height: '100%',
									textAlign: 'center',
									p: 1,
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
				))}
			</Box>
		</Box>
	);
};

export default FurnitureCategories;
