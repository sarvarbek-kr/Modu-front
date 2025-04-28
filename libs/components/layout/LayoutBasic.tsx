import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import Head from 'next/head';
import Top from '../Top';
import Footer from '../Footer';
import { Stack } from '@mui/material';
import { getJwtToken, updateUserInfo } from '../../auth';
import Chat from '../Chat';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useTranslation } from 'next-i18next';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const withLayoutBasic = (Component: any) => {
	return (props: any) => {
		const router = useRouter();
		const { t, i18n } = useTranslation('common');
		const device = useDeviceDetect();
		const [authHeader, setAuthHeader] = useState<boolean>(false);
		const user = useReactiveVar(userVar);

		const memoizedValues = useMemo(() => {
			let title = '',
				desc = '',
				bgImage = '';

			switch (router.pathname) {
				case '/furniture':
					title = 'Furniture Search';
					desc = 'We are glad to see you again!';
					bgImage = '/img/banner/furnitures.png';
					break;
				case '/agent':
					title = 'Agents';
					bgImage = '/img/banner/officeAgent.png';
					break;
				case '/agent/detail':
					title = 'Agent Page';
					bgImage = '/img/banner/officeCommunity.png';
					break;
				case '/mypage':
					title = 'my page';
					bgImage = '/img/banner/officeCommunity.png';
					break;
				case '/community':
					title = 'Community';
					bgImage = '/img/banner/officeCommunity.png';
					break;
				case '/community/detail':
					title = 'Community Detail';
					bgImage = '/img/banner/officeCommunity.png';
					break;
				case '/cs':
					title = 'CS';
					desc = 'We are glad to see you again!';
					bgImage = '/img/banner/officeCommunity.png';
					break;
				case '/account/join':
					title = 'Login/Signup';
					desc = 'Authentication Process';
					bgImage = '/img/banner/officeCommunity.png';
					setAuthHeader(true);
					break;
				case '/member':
					title = 'Member Page';
					desc = 'Home / For Rent';
					bgImage = '/img/banner/furnitures.png';
					break;
				default:
					break;
			}

			return { title, desc, bgImage };
		}, [router.pathname]);

		/** LIFECYCLES **/
		useEffect(() => {
			const jwt = getJwtToken();
			if (jwt) updateUserInfo(jwt);
		}, []);

		/** HANDLERS **/

		if (device == 'mobile') {
			return (
				<>
					<Head>
						<title>Modu</title>
						<meta name={'title'} content={`Modu`} />
					</Head>
					<Stack id="mobile-wrap">
						<Stack id={'top'}>
							<Top />
						</Stack>

						<Stack id={'main'}>
							<Component {...props} />
						</Stack>

						<Stack id={'footer'}>
							<Footer />
						</Stack>
					</Stack>
				</>
			);
		} else {
			return (
				<>
					<Head>
						<title>Modu</title>
						<meta name={'title'} content={`Modu`} />
					</Head>
					<Stack id="pc-wrap">
						<Stack id={'top'}>
							<Top />
						</Stack>

						<Stack className={`header-basic ${authHeader && 'auth'}`}>
							<Stack
								className={'header-img'}
								style={{
									backgroundImage: `url(${memoizedValues.bgImage})`,
									backgroundSize: 'cover',
								}}
							/>
							<Stack className={'container'}>
								<strong>{t(memoizedValues.title)}</strong>
								<span>{t(memoizedValues.desc)}</span>
							</Stack>
						</Stack>

						<Stack id={'main'}>
							<Component {...props} />
						</Stack>
						<Chat />
						<Stack id={'footer'}>
							<Footer />
						</Stack>
					</Stack>
				</>
			);
		}
	};
};

export default withLayoutBasic;
