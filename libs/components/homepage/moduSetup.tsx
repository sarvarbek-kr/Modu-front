import React from 'react';
import { Box, Grid } from '@mui/material';

const eventImages = [
	'/img/setup/homeFurniture.jpg',
	'/img/setup/officeFurniture.jpg',
	'/img/setup/outdoorFurnitureee.jpg',
	'/img/setup/pexels-darina-belonogova-7959568.jpg',
	'/img/setup/pexels-fotoaibe-1571460.jpg',
	'/img/setup/pexels-quang-nguyen-vinh-222549-14024763.jpg',
];

const ModuSetup = () => {
	return (
		<Box sx={{ width: '100%', padding: '80px 0' }}>
			<Box textAlign="center" mb={4}>
				<h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Events</h2>
				<p style={{ fontSize: '18px', color: '#666' }}>Events waiting your attention!</p>
			</Box>
			<Grid container spacing={2}>
				{eventImages.map((src, index) => (
					<Grid item xs={12} sm={6} md={4} key={index}>
						<Box
							component="img"
							src={src}
							alt={`Event ${index + 1}`}
							sx={{
								width: '100%',
								borderRadius: 2,
								objectFit: 'cover',
								height: index % 5 === 0 ? 250 : index % 2 === 0 ? 300 : 350, // Varying heights
								// Adding margins for more space if desired
								marginBottom: '20px',
								marginTop: '20px',
							}}
						/>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default ModuSetup;
