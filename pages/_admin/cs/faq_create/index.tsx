import { Typography, Stack } from '@mui/material';
import dynamic from 'next/dynamic';

const NoticeEditor = dynamic(() => import('../../../../libs/components/cs/NoticeEditor'), { ssr: false });
const FaqCreate = () => {
	return (
		<div id="write-notice-page" style={{ height: 'auto' }}>
			<Stack className="container">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">Write Notice</Typography>
					</Stack>
				</Stack>
				<NoticeEditor />
			</Stack>
		</div>
	);
};

export default FaqCreate;
