import React, { useState } from 'react';
import { NextPage } from 'next';
import { Pagination, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { FurnitureCard } from './FurnitureCard';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { Furniture } from '../../types/furniture/furniture';
import { AgentFurnituresInquiry } from '../../types/furniture/furniture.input';
import { T } from '../../types/common';
import { FurnitureStatus } from '../../enums/furniture.enum';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import { UPDATE_FURNITURE } from '../../../apollo/user/mutation';
import { GET_AGENT_FURNITURES } from '../../../apollo/user/query';
import { sweetConfirmAlert, sweetErrorHandling } from '../../sweetAlert';

const MyFurnitures: NextPage = ({ initialInput, ...props }: any) => {
	const device = useDeviceDetect();
	const [searchFilter, setSearchFilter] = useState<AgentFurnituresInquiry>(initialInput);
	const [agentFurnitures, setAgentFurnitures] = useState<Furniture[]>([]);
	const [total, setTotal] = useState<number>(0);
	const user = useReactiveVar(userVar);
	const router = useRouter();

	/** APOLLO REQUESTS **/
	const [updateFurniture] = useMutation(UPDATE_FURNITURE);

	const {
		loading: getAgentFurnituresLoading,
		data: getAgentFurnituresData,
		error: getAgentFurnituresError,
		refetch: getAgentFurnituresRefetch,
	} = useQuery(GET_AGENT_FURNITURES, {
		fetchPolicy: 'network-only',
		variables: { input: searchFilter },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setAgentFurnitures(data?.getAgentFurnitures?.list);
			setTotal(data?.getAgentFurnitures?.metaCounter[0]?.total ?? 0);
		},
	});

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchFilter({ ...searchFilter, page: value });
	};

	const changeStatusHandler = (value: FurnitureStatus) => {
		setSearchFilter({ ...searchFilter, search: { furnitureStatus: value } });
	};

	const deleteFurnitureHandler = async (id: string) => {
		try {
			if (await sweetConfirmAlert('Are you sure to delete this furniture?')) {
				await updateFurniture({
					variables: {
						input: {
							_id: id,
							furnitureStatus: 'DELETE',
						},
					},
				});

				await getAgentFurnituresRefetch({ input: searchFilter });
			}
		} catch (err: any) {
			await sweetErrorHandling(err);
		}
	};

	const updateFurnitureHandler = async (status: string, id: string) => {
		try {
			if (await sweetConfirmAlert(`Are you sure to change the ${status} status?`)) {
				await updateFurniture({
					variables: {
						input: {
							_id: id,
							furnitureStatus: status,
						},
					},
				});
				await getAgentFurnituresRefetch({ input: searchFilter });
			}
		} catch (err: any) {
			await sweetErrorHandling(err);
		}
	};

	if (user?.memberType !== 'AGENT') {
		router.back();
	}

	if (device === 'mobile') {
		return <div>MODU FURNITURES MOBILE</div>;
	} else {
		return (
			<div id="my-furniture-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">My Furnitures</Typography>
						<Typography className="sub-title">We are glad to see you again!</Typography>
					</Stack>
				</Stack>
				<Stack className="furniture-list-box">
					<Stack className="tab-name-box">
						<Typography
							onClick={() => changeStatusHandler(FurnitureStatus.ACTIVE)}
							className={searchFilter.search.furnitureStatus === 'ACTIVE' ? 'active-tab-name' : 'tab-name'}
						>
							On Sale
						</Typography>
						<Typography
							onClick={() => changeStatusHandler(FurnitureStatus.SOLD)}
							className={searchFilter.search.furnitureStatus === 'SOLD' ? 'active-tab-name' : 'tab-name'}
						>
							On Sold
						</Typography>
					</Stack>
					<Stack className="list-box">
						<Stack className="listing-title-box">
							<Typography className="title-text">Listing title</Typography>
							<Typography className="title-text">Date Published</Typography>
							<Typography className="title-text">Status</Typography>
							<Typography className="title-text">View</Typography>
							{searchFilter.search.furnitureStatus === 'ACTIVE' && (
								<Typography className="title-text">Action</Typography>
							)}
						</Stack>

						{agentFurnitures?.length === 0 ? (
							<div className={'no-data'}>
								<img src="/img/icons/icoAlert.svg" alt="" />
								<p>No Furniture found!</p>
							</div>
						) : (
							agentFurnitures.map((furniture: Furniture) => {
								return (
									<FurnitureCard
										furniture={furniture}
										deleteFurnitureHandler={deleteFurnitureHandler}
										updateFurnitureHandler={updateFurnitureHandler}
									/>
								);
							})
						)}

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
									<Typography>
										{total} furniture{total > 1 ? 's' : ''} available
									</Typography>
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
			furnitureStatus: 'ACTIVE',
		},
	},
};

export default MyFurnitures;
