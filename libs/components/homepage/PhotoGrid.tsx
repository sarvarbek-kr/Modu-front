import React from 'react';

export interface CardProps {
	title: string;
	price: string;
	discountCode: string;
	imageSrc: string;
}

interface PhotoGridProps {
	weeklyHighlights?: {
		exclusiveShoes: CardProps;
		exquisiteStyles: CardProps;
		newArrivals: CardProps;
		exclusiveItems: CardProps;
	};
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ weeklyHighlights }) => {
	// Default data if none is provided
	const defaultData = {
		exclusiveShoes: {
			title: 'Exclusive Sofa',
			price: '50%',
			discountCode: 'SATR4320',
			imageSrc: '/img/weeksDiscount/pexels-subham-majumder-1992868-3614082.jpg',
		},
		exquisiteStyles: {
			title: 'Exquisite Styles & Collections',
			price: '70%',
			discountCode: 'VAMT6920',
			imageSrc: '/img/weeksDiscount/pexels-itsterrymag-2635038.jpg',
		},
		newArrivals: {
			title: 'New Arrivals',
			price: '35%',
			discountCode: 'VATR3920',
			imageSrc: '/img/furniture/bigImage.png',
		},
		exclusiveItems: {
			title: 'Best seller',
			price: '15%',
			discountCode: 'MODA3920',
			imageSrc: '/img/weeksDiscount/pexels-medhat-ayad-122846-447592.jpg',
		},
	};

	const data = weeklyHighlights || defaultData;
	const { exclusiveShoes, exquisiteStyles, newArrivals, exclusiveItems } = data;

	return (
		<div className="photo-grid">
			<div className="photo-grid__header">
				<h2 className="photo-grid__title">THIS WEEKS HIGHLIGHTS</h2>
			</div>

			<div className="photo-grid__content">
				<div className="photo-grid__row">
					<div className="photo-grid__card photo-grid__card--small">
						<div className="photo-grid__card-background" style={{ backgroundImage: `url(${exclusiveShoes.imageSrc})` }}>
							<div className="photo-grid__card-content">
								<h3 className="photo-grid__card-title">
									Exclusive
									<br />
									Sofa
								</h3>
							</div>
							<div className="photo-grid__card-info">
								<h4 className="photo-grid__card-subtitle">{exclusiveShoes.title}</h4>
								<p className="photo-grid__card-price">PRICE {exclusiveShoes.price} OFF</p>
								<p className="photo-grid__card-discount">DISCOUNT CODE - {exclusiveShoes.discountCode}</p>
							</div>
						</div>
					</div>

					<div className="photo-grid__card photo-grid__card--large">
						<div
							className="photo-grid__card-background"
							style={{ backgroundImage: `url(${exquisiteStyles.imageSrc})` }}
						>
							<div className="photo-grid__card-content">
								<h3 className="photo-grid__card-title">
									Exquisite Styles &<br />
									Collections
								</h3>
							</div>
							<div className="photo-grid__card-info">
								<h4 className="photo-grid__card-subtitle">{exquisiteStyles.title}</h4>
								<p className="photo-grid__card-price">PRICE {exquisiteStyles.price} OFF</p>
								<p className="photo-grid__card-discount">DISCOUNT CODE - {exquisiteStyles.discountCode}</p>
							</div>
						</div>
					</div>
				</div>

				<div className="photo-grid__row">
					<div className="photo-grid__card photo-grid__card--large">
						<div className="photo-grid__card-background" style={{ backgroundImage: `url(${newArrivals.imageSrc})` }}>
							<div className="photo-grid__card-content">
								<h3 className="photo-grid__card-title">New Arrivals</h3>
							</div>
							<div className="photo-grid__card-info">
								<h4 className="photo-grid__card-subtitle">{newArrivals.title}</h4>
								<p className="photo-grid__card-price">PRICE {newArrivals.price} OFF</p>
								<p className="photo-grid__card-discount">DISCOUNT CODE - {newArrivals.discountCode}</p>
							</div>
						</div>
					</div>

					<div className="photo-grid__card photo-grid__card--small">
						<div className="photo-grid__card-background" style={{ backgroundImage: `url(${exclusiveItems.imageSrc})` }}>
							<div className="photo-grid__card-content">
								<h3 className="photo-grid__card-title">
									Best
									<br />
									Seller
								</h3>
							</div>
							<div className="photo-grid__card-info">
								<h4 className="photo-grid__card-subtitle">{exclusiveItems.title}</h4>
								<p className="photo-grid__card-price">PRICE {exclusiveItems.price} OFF</p>
								<p className="photo-grid__card-discount">DISCOUNT CODE - {exclusiveItems.discountCode}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PhotoGrid;
