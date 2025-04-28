import * as React from 'react';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';

const itemData = [
	{ img: '/img/setup/homeFurniture.jpg' },
	{ img: '/img/setup/officeFurniture.jpg' },
	{ img: '/img/setup/outdoorFurnitureee.jpg' },
	{ img: '/img/setup/pexels-darina-belonogova-7959568.jpg' },
	{ img: '/img/setup/pexels-fotoaibe-1571460.jpg' },
	{ img: '/img/setup/pexels-quang-nguyen-vinh-222549-14024763.jpg' },
];

export default function FuniroFurniture() {
	return (
		<Box sx={{ width: '100%', minHeight: 829, mt: 5 }}>
			<Box sx={{ textAlign: 'center', mb: 4 }}>
				<h3>Share your setup with</h3>
				<h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>#FuniroFurniture</h1>
			</Box>

			<Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
				{itemData.map((item, index) => (
					<div key={index}>
						<img
							src={item.img}
							alt={`furniture-${index}`}
							loading="lazy"
							style={{ borderRadius: 8, width: '100%', display: 'block' }}
						/>
					</div>
				))}
			</Masonry>
		</Box>
	);
}
