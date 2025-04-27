import React from 'react';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Member } from '../../types/member/member';
import Link from 'next/link';

interface TopAgentProps {
	agent: Member;
}
const TopAgentCard = (props: TopAgentProps) => {
	const { agent } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const agentImage = agent?.memberImage
		? `${process.env.REACT_APP_API_URL}/${agent?.memberImage}`
		: '/img/profile/defaultUser.svg';

	/** HANDLERS **/
	const pushAgentDetailHandler = async (agentId: string) => {
		if (!agentId) return;
		await router.push({ pathname: '/agent/detail', query: { id: agentId } });
	};

	if (device === 'mobile') {
		return (
			<Stack className="top-agent-card" onClick={() => pushAgentDetailHandler(agent._id)} sx={{ cursor: 'pointer' }}>
				<img src={agentImage} alt="" />
				<strong>{agent?.memberNick}</strong>
				<span>{agent?.memberType}</span>
			</Stack>
		);
	} else {
		return (
			<Stack className="top-agent-card">
				<Link
					className="top-agent-link"
					href={{
						pathname: '/agent/detail',
						query: { agentId: agent?._id },
					}}
					style={{ textDecoration: 'none', color: 'inherit' }}
				>
					<img src={agentImage} alt="" />
					<strong>{agent?.memberNick}</strong>
					<span>{agent?.memberType}</span>
				</Link>
			</Stack>
		);
	}
};

export default TopAgentCard;
