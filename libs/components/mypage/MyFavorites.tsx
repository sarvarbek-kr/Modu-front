import React, { useState } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Pagination, Stack, Typography } from '@mui/material';
import FurnitureCard from '../furniture/FurnitureCard';
import { Furniture } from '../../types/furniture/furniture';
import { T } from '../../types/common';
import { LIKE_TARGET_FURNITURE } from '../../../apollo/user/mutation';
import { useMutation, useQuery } from '@apollo/client';
import { GET_FAVORITES } from '../../../apollo/user/query';
import { sweetMixinErrorAlert } from '../../sweetAlert';
import { Messages } from '../../config';

const MyFavorites: NextPage = () => {
	const device = useDeviceDetect();
	const [myFavorites, setMyFavorites] = useState<Furniture[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [searchFavorites, setSearchFavorites] = useState<T>({ page: 1, limit: 6 });

	/** APOLLO REQUESTS **/

	const [likeTargetFurniture] = useMutation(LIKE_TARGET_FURNITURE);
	const {
		loading: getFavoritesLoading,
		data: getFavoritesData,
		error: getFavoritesError,
		refetch: getFavoritesRefetch,
	} = useQuery(GET_FAVORITES, {
		fetchPolicy: 'network-only',
		variables: {
			input: searchFavorites,
		},
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setMyFavorites(data?.getFavorites?.list);
			setTotal(data?.getFavorites?.metaCounter[0]?.total || 0);
		},
	});

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchFavorites({ ...searchFavorites, page: value });
	};

	const likeFurnitureHandler = async (user: any, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Messages.error2);

			await likeTargetFurniture({
				variables: {
					input: id,
				},
			});
			await getFavoritesRefetch({ input: searchFavorites });
		} catch (err: any) {
			console.log('ERROR, likeFurnitureHandler:', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	if (device === 'mobile') {
		return <div>MODU FURNITURES MOBILE</div>;
	} else {
		return (
			<div id="my-favorites-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">My Favorites</Typography>
						<Typography className="sub-title">We are glad to see you again!</Typography>
					</Stack>
				</Stack>
				<Stack className="favorites-list-box">
					{myFavorites?.length ? (
						myFavorites?.map((furniture: Furniture) => {
							return (
								<FurnitureCard furniture={furniture} likeFurnitureHandler={likeFurnitureHandler} myFavorites={true} />
							);
						})
					) : (
						<div className={'no-data'}>
							<img src="/img/icons/icoAlert.svg" alt="" />
							<p>No Favorites found!</p>
						</div>
					)}
				</Stack>
				{myFavorites?.length ? (
					<Stack className="pagination-config">
						<Stack className="pagination-box">
							<Pagination
								count={Math.ceil(total / searchFavorites.limit)}
								page={searchFavorites.page}
								shape="circular"
								color="primary"
								onChange={paginationHandler}
							/>
						</Stack>
						<Stack className="total-result">
							<Typography>
								Total {total} favorite furniture{total > 1 ? 's' : ''}
							</Typography>
						</Stack>
					</Stack>
				) : null}
			</div>
		);
	}
};

export default MyFavorites;
