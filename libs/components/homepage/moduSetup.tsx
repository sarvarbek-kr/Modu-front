import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

// Define types for room data
interface Room {
	id: string;
	type: string;
	title: string;
	image: string;
}

const RoomInspiration: React.FC = () => {
	const [activeSlide, setActiveSlide] = useState<number>(0);

	const rooms: Room[] = [
		{
			id: '01',
			type: 'Bed Room',
			title: 'Inner Peace',
			image: '/img/setup/pexels-darina-belonogova-7959568.jpg',
		},
		{
			id: '02',
			type: 'Living Room',
			title: 'Cozy Comfort',
			image: '/img/setup/pexels-fotoaibe-1571460.jpg',
		},
		{
			id: '03',
			type: 'Dining Room',
			title: 'Bright Spaces',
			image: '/img/setup/pexels-quang-nguyen-vinh-222549-14024763.jpg',
		},
		{
			id: '04',
			type: 'Office',
			title: 'Creative Corner',
			image: '/img/setup/outdoorFurnitureee.jpg',
		},
	];

	const nextSlide = (): void => {
		setActiveSlide((prev) => (prev === rooms.length - 1 ? 0 : prev + 1));
	};

	const goToSlide = (index: number): void => {
		setActiveSlide(index);
	};

	return (
		<div
			style={{
				background: '#FCF8F3',
				width: '1320px',
				height: '670px',
				fontFamily: 'Poppins, sans-serif',
				position: 'relative',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: '0 100px',
			}}
		>
			{/* Left Section */}
			<div style={{ width: '30%' }}>
				<h1
					style={{
						color: '#3A3A3A',
						fontSize: '40px',
						fontWeight: 700,
						lineHeight: '120%',
						marginBottom: '20px',
					}}
				>
					50+ Beautiful rooms inspiration
				</h1>
				<p
					style={{
						color: '#616161',
						fontSize: '16px',
						fontWeight: 500,
						lineHeight: '150%',
						marginBottom: '30px',
					}}
				>
					Our designer already made a lot of beautiful prototipe of rooms that inspire you
				</p>
				<button
					style={{
						background: '#B88E2F',
						width: '176px',
						height: '48px',
						color: '#FFF',
						fontSize: '16px',
						fontWeight: 600,
						lineHeight: '150%',
						border: 'none',
						cursor: 'pointer',
					}}
				>
					Explore More
				</button>
			</div>

			{/* Right Section - Gallery */}
			<div
				style={{
					width: '70%',
					position: 'relative',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				{/* Main Room Card */}
				<div
					style={{
						width: '404px',
						height: '582px',
						position: 'relative',
						marginRight: '20px',
					}}
				>
					<img
						src={rooms[activeSlide].image}
						alt={rooms[activeSlide].title}
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
						}}
					/>

					{/* Room Info Overlay */}
					<div
						style={{
							position: 'absolute',
							bottom: '0',
							left: '0',
							backgroundColor: 'white',
							padding: '20px',
							width: '100%',
						}}
					>
						<div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
							<span style={{ fontWeight: 500, color: '#616161' }}>{rooms[activeSlide].id}</span>
							<span style={{ margin: '0 10px', borderTop: '1px solid #616161', width: '20px' }}></span>
							<span style={{ color: '#616161' }}>{rooms[activeSlide].type}</span>
						</div>
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<h3 style={{ fontSize: '24px', fontWeight: 500, color: '#3A3A3A', margin: 0 }}>
								{rooms[activeSlide].title}
							</h3>
							<button
								onClick={nextSlide}
								style={{
									background: '#B88E2F',
									border: 'none',
									color: 'white',
									width: '48px',
									height: '48px',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									cursor: 'pointer',
								}}
								aria-label="Next slide"
							>
								<ChevronRight size={24} />
							</button>
						</div>
					</div>
				</div>

				{/* Second Room Card */}
				<div
					style={{
						width: '372px',
						height: '486px',
						position: 'relative',
					}}
				>
					<img
						src="/img/setup/pexels-max-rahubovskiy-6782567.jpg"
						alt="Bright room with white furniture"
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
						}}
					/>
				</div>

				{/* Next arrow button outside cards */}
				<button
					style={{
						position: 'absolute',
						right: '10px',
						top: '50%',
						transform: 'translateY(-50%)',
						background: 'white',
						borderRadius: '50%',
						width: '40px',
						height: '40px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						border: 'none',
						boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
						cursor: 'pointer',
					}}
				>
					<ChevronRight size={20} color="#3A3A3A" />
				</button>
			</div>

			{/* Navigation Dots */}
			<div
				style={{
					position: 'absolute',
					bottom: '40px',
					left: '50%',
					transform: 'translateX(-50%)',
					display: 'flex',
					gap: '10px',
				}}
			>
				{rooms.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						style={{
							width: '12px',
							height: '12px',
							borderRadius: '50%',
							background: activeSlide === index ? '#B88E2F' : '#D8D8D8',
							border: 'none',
							padding: 0,
							cursor: 'pointer',
						}}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
};

export default RoomInspiration;
