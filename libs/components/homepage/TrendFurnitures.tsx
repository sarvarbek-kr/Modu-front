import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Furniture } from '../../types/furniture/furniture';
import { FurnituresInquiry } from '../../types/furniture/furniture.input';
import TrendFurnitureCard from './TrendFurnitureCard';
import { useMutation, useQuery } from '@apollo/client';
import { GET_FURNITURES } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { LIKE_TARGET_FURNITURE } from '../../../apollo/user/mutation';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { Message } from '../../enums/common.enum';

interface TrendFurnituresProps {
	initialInput: FurnituresInquiry;
}

const TrendFurnitures = (props: TrendFurnituresProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [trendFurnitures, setTrendFurnitures] = useState<Furniture[]>([]);

	/** APOLLO REQUESTS **/
	const [likeTargetFurniture] = useMutation(LIKE_TARGET_FURNITURE);

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
			setTrendFurnitures(data?.getFurnitures?.list);
		},
	});
	/** HANDLERS **/
	const likeFurnitureHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

			await likeTargetFurniture({ variables: { input: id } });
			await getFurnituresRefetch({ input: initialInput });

			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log('ERROR, likeFurnitureHandler:', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	if (trendFurnitures) console.log('trendFurnitures:', trendFurnitures);
	if (!trendFurnitures) return null;

	if (device === 'mobile') {
		return (
			<Stack className={'trend-furnitures'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>Trend Furnitures</span>
					</Stack>
					<Stack className={'card-box'}>
						{trendFurnitures.length === 0 ? (
							<Box component={'div'} className={'empty-list'}>
								Trends Empty
							</Box>
						) : (
							<Swiper
								className={'trend-furniture-swiper'}
								slidesPerView={'auto'}
								centeredSlides={true}
								spaceBetween={15}
								modules={[Autoplay]}
							>
								{trendFurnitures.map((furniture: Furniture) => {
									return (
										<SwiperSlide key={furniture._id} className={'trend-furniture-slide'}>
											<TrendFurnitureCard furniture={furniture} likeFurnitureHandler={likeFurnitureHandler} />
										</SwiperSlide>
									);
								})}
							</Swiper>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'trend-furnitures'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span>Trend Furnitures</span>
							<p>Trend is based on likes</p>
						</Box>
						<Box component={'div'} className={'right'}>
							<div className={'pagination-box'}>
								<WestIcon className={'swiper-trend-prev'} />
								<div className={'swiper-trend-pagination'}></div>
								<EastIcon className={'swiper-trend-next'} />
							</div>
						</Box>
					</Stack>
					<Stack className={'card-box'}>
						{trendFurnitures.length === 0 ? (
							<Box component={'div'} className={'empty-list'}>
								Trends Empty
							</Box>
						) : (
							<Swiper
								className={'trend-furniture-swiper'}
								slidesPerView={'auto'}
								spaceBetween={15}
								modules={[Autoplay, Navigation, Pagination]}
								navigation={{
									nextEl: '.swiper-trend-next',
									prevEl: '.swiper-trend-prev',
								}}
								pagination={{
									el: '.swiper-trend-pagination',
								}}
							>
								{trendFurnitures.map((furniture: Furniture) => {
									return (
										<SwiperSlide key={furniture._id} className={'trend-furniture-slide'}>
											<TrendFurnitureCard furniture={furniture} likeFurnitureHandler={likeFurnitureHandler} />
										</SwiperSlide>
									);
								})}
							</Swiper>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

TrendFurnitures.defaultProps = {
	initialInput: {
		page: 1,
		limit: 8,
		sort: 'furnitureLikes',
		direction: 'DESC',
		search: {},
	},
};

export default TrendFurnitures;
