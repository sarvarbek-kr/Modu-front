import { Box, Stack } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';

const plans = [
	{
		title: 'HOME',
		img: '/img/banner/homeFurniture.jpg',
	},
	{
		title: 'OUTDOOR',
		img: '/img/banner/outdoorFurniture.png',
	},
	{
		title: 'OFFICE',
		img: '/img/banner/officeFurniture.jpg',
	},
	{
		title: 'COMMERCIAL',
		img: '/img/banner/commercialFurniture.jpg',
	},
	{
		title: 'ACCESSORIES',
		img: '/img/banner/accessoriesFurniture.jpg',
	},
];

SwiperCore.use([Autoplay, Navigation, Pagination]);

export default function Events() {
	return (
		<div className={'events-frame'}>
			<Stack className={'events-main'}>
				<Box className={'events-text'}>
					<span className={'category-title'}>Events</span>
				</Box>

				<Swiper
					className={'events-info swiper-wrapper'}
					slidesPerView={'auto'}
					centeredSlides={true}
					spaceBetween={30}
					navigation={{
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					}}
					pagination={{
						el: '.swiper-pagination',
						clickable: true,
					}}
					autoplay={{
						delay: 3000,
						disableOnInteraction: true,
					}}
				>
					{plans.map((value, number) => {
						return (
							<SwiperSlide key={number} className={'events-info-frame'}>
								<div className={'events-img'}>
									<img src={value.img} className={'events-img'} />
								</div>
								<Box className={'events-desc'}>
									<div className={'event-title-speaker'}>
										<strong>{value.title}</strong>
									</div>
								</Box>
							</SwiperSlide>
						);
					})}
				</Swiper>
				<Box className={'prev-next-frame'}>
					<img src={'/icons/arrow-right.svg'} className={'swiper-button-prev'} />
					<div className={'dot-frame-pagination .swiper-pagination'}></div>
					<img
						src={'/icons/arrow-right.svg'}
						className={'swiper-button-next'}
						style={{ transform: 'rotate(-180deg)' }}
					/>
				</Box>
			</Stack>
		</div>
	);
}
