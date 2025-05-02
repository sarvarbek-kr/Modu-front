import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Define types for room data
interface Room {
	id: string;
	type: string;
	title: string;
	image: string;
}

const RoomInspiration: React.FC = () => {
	const [activeSlide, setActiveSlide] = useState<number>(0);

	// Updated with more rooms for pagination
	const rooms: Room[] = [
		{
			id: '01',
			type: 'Bed Room',
			title: 'Inner Peace',
			image: '/img/setup/f89a66d94961c3801f4c07439f27b13468e5e545.png',
		},
		{
			id: '02',
			type: 'Living Room',
			title: 'Cozy Comfort',
			image: '/img/setup/pexels-element5-1125135.jpg',
		},
		{
			id: '03',
			type: 'Dining Room',
			title: 'Bright Spaces',
			image: '/img/setup/acc48179d1b18b523420e79dda1e92951ecde49b.png',
		},
		{
			id: '04',
			type: 'Office',
			title: 'Creative Corner',
			image: '/img/setup/pexels-pixabay-373541.jpg',
		},
	];

	// Calculate visible slides based on current active slide
	const getVisibleSlides = () => {
		const visibleSlides = [];
		for (let i = 0; i < 3; i++) {
			const slideIndex = (activeSlide + i) % rooms.length;
			visibleSlides.push(rooms[slideIndex]);
		}
		return visibleSlides;
	};

	const nextSlide = (): void => {
		setActiveSlide((prev) => (prev === rooms.length - 1 ? 0 : prev + 1));
	};

	const goToSlide = (index: number): void => {
		setActiveSlide(index);
	};

	const visibleSlides = getVisibleSlides();

	return (
		<div className="room-inspiration">
			<div className="container">
				{/* Left Section */}
				<div className="content-section">
					<h1 className="title">50+ Beautiful rooms inspiration</h1>
					<p className="description">
						Our designer already made a lot of beautiful prototipe of rooms that inspire you
					</p>
					<Link href={'/furniture'}>
						<button className="explore-button">Explore More</button>
					</Link>
				</div>

				{/* Right Section - Gallery */}
				<div className="gallery-section">
					{/* Main Room Card */}
					<div className="main-card">
						<img
							src={visibleSlides[0].image}
							alt={visibleSlides[0].title}
							className="room-image"
							onError={(e) => {
								console.error('Image failed to load');
								e.currentTarget.src = '/api/placeholder/404/650';
							}}
						/>

						{/* Room Info Overlay */}
						<div className="info-overlay">
							<div className="room-id">
								<span className="id-number">{visibleSlides[0].id}</span>
								<span className="divider"></span>
								<span className="room-type">{visibleSlides[0].type}</span>
							</div>
							<div className="room-title-wrapper">
								<h3 className="room-title">{visibleSlides[0].title}</h3>
								<button onClick={nextSlide} className="next-button" aria-label="Next slide">
									<img src="/img/icons/Right 16px.svg" alt="Next" />
								</button>
							</div>
						</div>
					</div>

					{/* Second Room Card */}
					<div className="second-card">
						<img
							src={visibleSlides[1].image}
							alt={visibleSlides[1].title}
							className="room-image"
							onError={(e) => {
								console.error('Image failed to load');
								e.currentTarget.src = '/api/placeholder/372/486';
							}}
						/>

						{/* Next arrow button */}
						<button onClick={nextSlide} className="arrow-button" aria-label="Next slide">
							<ChevronRight size={20} color="#3A3A3A" />
						</button>

						{/* Pagination Dots */}
						<div className="pagination-dots">
							{rooms.map((_, index) => (
								<button
									key={index}
									onClick={() => goToSlide(index)}
									className={`dot ${activeSlide === index ? 'active' : ''}`}
									aria-label={`Go to slide ${index + 1}`}
								/>
							))}
						</div>
					</div>

					{/* Third Room Card (Partially Visible) */}
					<div className="third-card">
						<img
							src={visibleSlides[2].image}
							alt={visibleSlides[2].title}
							className="room-image"
							onError={(e) => {
								console.error('Image failed to load');
								e.currentTarget.src = '/api/placeholder/372/486';
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RoomInspiration;
