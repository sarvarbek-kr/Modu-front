import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import PopularFurnitureCard from './PopularFurnitureCard';
import { Furniture } from '../../types/furniture/furniture';
import Link from 'next/link';
import { FurnituresInquiry } from '../../types/furniture/furniture.input';
import { GET_FURNITURES } from '../../../apollo/user/query';
import { useQuery } from '@apollo/client';
import { T } from '../../types/common';

interface PopularFurnituresProps {
	initialInput: FurnituresInquiry;
}

const PopularFurnitures = (props: PopularFurnituresProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [popularFurnitures, setPopularFurnitures] = useState<Furniture[]>([]);

	/** APOLLO REQUESTS **/
	const {
		loading: getFurnituresLoading,
		data: getFurnituresData,
		error: getFurnituresError,
		refetch: getFurnituresRefetch,
	} = useQuery(GET_FURNITURES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setPopularFurnitures(data?.getFurnitures?.list);
		},
	});
	/** HANDLERS **/

	if (!popularFurnitures) return null;

	if (device === 'mobile') {
		return (
			<Stack className={'popular-furnitures'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>Popular furnitures</span>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'popular-furniture-swiper'}
							slidesPerView={'auto'}
							centeredSlides={true}
							spaceBetween={25}
							modules={[Autoplay]}
						>
							{popularFurnitures.map((furniture: Furniture) => {
								return (
									<SwiperSlide key={furniture._id} className={'popular-furniture-slide'}>
										<PopularFurnitureCard furniture={furniture} />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'popular-furnitures'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span>Popular furnitures</span>
							<p>Popularity is based on views</p>
						</Box>
						<Box component={'div'} className={'right'}>
							<div className={'more-box'}>
								<Link href={'/furniture'}>
									<span>See All Categories</span>
								</Link>
								<img src="/img/icons/rightup.svg" alt="" />
							</div>
						</Box>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'popular-furniture-swiper'}
							slidesPerView={'auto'}
							spaceBetween={25}
							modules={[Autoplay, Navigation, Pagination]}
							navigation={{
								nextEl: '.swiper-popular-next',
								prevEl: '.swiper-popular-prev',
							}}
							pagination={{
								el: '.swiper-popular-pagination',
							}}
						>
							{popularFurnitures.map((furniture: Furniture) => {
								return (
									<SwiperSlide key={furniture._id} className={'popular-furniture-slide'}>
										<PopularFurnitureCard furniture={furniture} />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Stack>
					<Stack className={'pagination-box'}>
						<WestIcon className={'swiper-popular-prev'} />
						<div className={'swiper-popular-pagination'}></div>
						<EastIcon className={'swiper-popular-next'} />
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

PopularFurnitures.defaultProps = {
	initialInput: {
		page: 1,
		limit: 7,
		sort: 'furnitureViews',
		direction: 'DESC',
		search: {},
	},
};

export default PopularFurnitures;
