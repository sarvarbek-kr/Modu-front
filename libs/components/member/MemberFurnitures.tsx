import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Pagination, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { FurnitureCard } from '../mypage/FurnitureCard';
import { Furniture } from '../../types/furniture/furniture';
import { FurnituresInquiry } from '../../types/furniture/furniture.input';
import { T } from '../../types/common';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_FURNITURES } from '../../../apollo/user/query';

const MyFurnitures: NextPage = ({ initialInput, ...props }: any) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const { memberId } = router.query;
	const [searchFilter, setSearchFilter] = useState<FurnituresInquiry>({ ...initialInput });
	const [agentFurnitures, setAgentFurnitures] = useState<Furniture[]>([]);
	const [total, setTotal] = useState<number>(0);

	/** APOLLO REQUESTS **/
	const {
		loading: getFurnituresLoading,
		data: getFurnituresData,
		error: getFurnituresError,
		refetch: getFurnituresRefetch,
	} = useQuery(GET_FURNITURES, {
		fetchPolicy: 'network-only',
		variables: { input: searchFilter },
		skip: !searchFilter?.search?.memberId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: any) => {
			setAgentFurnitures(data?.getFurnitures?.list);
			setTotal(data?.getFurnitures?.metaCounter[0]?.total ?? 0);
		},
	});

	/** LIFECYCLES **/
	useEffect(() => {
		getFurnituresRefetch().then();
	}, [searchFilter]);

	useEffect(() => {
		if (memberId)
			setSearchFilter({ ...initialInput, search: { ...initialInput.search, memberId: memberId as string } });
	}, [memberId]);

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchFilter({ ...searchFilter, page: value });
	};

	if (device === 'mobile') {
		return <div>MODU FURNITURES MOBILE</div>;
	} else {
		return (
			<div id="member-furnitures-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">Furnitures</Typography>
					</Stack>
				</Stack>
				<Stack className="furnitures-list-box">
					<Stack className="list-box">
						{agentFurnitures?.length > 0 && (
							<Stack className="listing-title-box">
								<Typography className="title-text">Listing title</Typography>
								<Typography className="title-text">Date Published</Typography>
								<Typography className="title-text">Status</Typography>
								<Typography className="title-text">View</Typography>
							</Stack>
						)}
						{agentFurnitures?.length === 0 && (
							<div className={'no-data'}>
								<img src="/img/icons/icoAlert.svg" alt="" />
								<p>No Furniture found!</p>
							</div>
						)}
						{agentFurnitures?.map((furniture: Furniture) => {
							return <FurnitureCard furniture={furniture} memberPage={true} key={furniture?._id} />;
						})}

						{agentFurnitures.length !== 0 && (
							<Stack className="pagination-config">
								<Stack className="pagination-box">
									<Pagination
										count={Math.ceil(total / searchFilter.limit)}
										page={searchFilter.page}
										shape="circular"
										color="primary"
										onChange={paginationHandler}
									/>
								</Stack>
								<Stack className="total-result">
									<Typography>{total} furniture available</Typography>
								</Stack>
							</Stack>
						)}
					</Stack>
				</Stack>
			</div>
		);
	}
};

MyFurnitures.defaultProps = {
	initialInput: {
		page: 1,
		limit: 5,
		sort: 'createdAt',
		search: {
			memberId: '',
		},
	},
};

export default MyFurnitures;
