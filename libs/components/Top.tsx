import React, { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import { useRouter, withRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { getJwtToken, logOut, updateUserInfo } from '../auth';
import { Stack, Box, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { CaretDown } from 'phosphor-react';
import useDeviceDetect from '../hooks/useDeviceDetect';
import Link from 'next/link';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useMutation, useReactiveVar } from '@apollo/client';
import { notificationsVar, userVar } from '../../apollo/store';
import { Logout } from '@mui/icons-material';
import { Messages, REACT_APP_API_URL } from '../config';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../sweetAlert';
import { RippleBadge } from '../../scss/MaterialTheme/styled';
import { UPDATE_NOTIFICATION } from '../../apollo/user/query';

const Top = () => {
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const { t, i18n } = useTranslation('common');
	const router = useRouter();
	const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
	const [lang, setLang] = useState<string | null>('en');
	const drop = Boolean(anchorEl2);
	const [colorChange, setColorChange] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<any | HTMLElement>(null);
	let open = Boolean(anchorEl);
	const [bgColor, setBgColor] = useState<boolean>(false);
	const [logoutAnchor, setLogoutAnchor] = React.useState<null | HTMLElement>(null);
	const logoutOpen = Boolean(logoutAnchor);

	const [anchorEl3, setAnchorEl3] = React.useState<any | HTMLElement>(null);

	const [notifications, setNotifications] = React.useState<Notification[]>([]);
	const [notificationCount, setNotificationCount] = React.useState<number>(0);
	let openNotifications = Boolean(anchorEl3);

	// Apollo requests
	const [updateNotification] = useMutation(UPDATE_NOTIFICATION);
	const notificationsList = useReactiveVar(notificationsVar);

	/** LIFECYCLES **/
	useEffect(() => {
		// @ts-ignore
		setNotifications(notificationsList?.list ?? []);
		setNotificationCount(notificationsList?.metaCounter[0]?.total ?? 0);
		if (localStorage.getItem('locale') === null) {
			localStorage.setItem('locale', 'en');
			setLang('en');
		} else {
			setLang(localStorage.getItem('locale'));
		}
	}, [router, notificationsList, user]);

	useEffect(() => {
		switch (router.pathname) {
			case '/furniture/detail':
				setBgColor(true);
				break;
			default:
				break;
		}
	}, [router]);

	useEffect(() => {
		const jwt = getJwtToken();
		if (jwt) updateUserInfo(jwt);
	}, []);

	/** HANDLERS **/

	const updateNotificationHandler = async (user: any, notificationId: any) => {
		try {
			if (!notificationId) return;
			if (!user._id) throw new Error(Messages.error2);
			await updateNotification({
				variables: { input: notificationId },
			});
			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log('ERROR, updateNotificationHandler', err);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	const langClick = (e: any) => {
		setAnchorEl2(e.currentTarget);
	};
	const notClick = (e: any) => {
		setAnchorEl3(e.currentTarget);
	};
	const notClose = () => {
		setAnchorEl3(null);
	};
	const langClose = () => {
		setAnchorEl2(null);
	};

	const langChoice = useCallback(
		async (e: any) => {
			setLang(e.target.id);
			localStorage.setItem('locale', e.target.id);
			setAnchorEl2(null);
			await router.push(router.asPath, router.asPath, { locale: e.target.id });
		},
		[router],
	);

	const changeNavbarColor = () => {
		if (window.scrollY >= 50) {
			setColorChange(true);
		} else {
			setColorChange(false);
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleHover = (event: any) => {
		if (anchorEl !== event.currentTarget) {
			setAnchorEl(event.currentTarget);
		} else {
			setAnchorEl(null);
		}
	};

	const StyledMenu = styled((props: MenuProps) => (
		<Menu
			elevation={0}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			{...props}
		/>
	))(({ theme }) => ({
		'& .MuiPaper-root': {
			top: '109px',
			borderRadius: 6,
			marginTop: theme.spacing(1),
			minWidth: 160,
			color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
			boxShadow:
				'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
			'& .MuiMenu-list': {
				padding: '4px 0',
			},
			'& .MuiMenuItem-root': {
				'& .MuiSvgIcon-root': {
					fontSize: 18,
					color: theme.palette.text.secondary,
					marginRight: theme.spacing(1.5),
				},
				'&:active': {
					backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
				},
			},
		},
	}));

	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', changeNavbarColor);
	}

	if (device == 'mobile') {
		return (
			<Stack className={'top'}>
				<Link href={'/'}>
					<div>{t('Home')}</div>
				</Link>
				<Link href={'/furniture'}>
					<div>{t('Furnitures')}</div>
				</Link>
				<Link href={'/agent'}>
					<div> {t('Agents')} </div>
				</Link>
				<Link href={'/community?articleCategory=FREE'}>
					<div> {t('Community')} </div>
				</Link>
				<Link href={'/cs'}>
					<div> {t('CS')} </div>
				</Link>
			</Stack>
		);
	} else {
		return (
			<Stack className={'navbar'}>
				<Stack className={`navbar-main ${colorChange ? 'transparent' : ''} ${bgColor ? 'transparent' : ''}`}>
					<Stack className={'container'}>
						<Box component={'div'} className={'logo-box'}>
							<Link href={'/'} style={{ display: 'flex', flexDirection: 'row' }}>
								<img src="/img/logo/logo-modu.svg" alt="" />
								<h1>odu</h1>
							</Link>
						</Box>
						<Box component={'div'} className={'router-box'}>
							<Link href={'/'}>
								<div>{t('Home')}</div>
							</Link>
							<Link href={'/furniture'}>
								<div>{t('Furnitures')}</div>
							</Link>
							<Link href={'/agent'}>
								<div> {t('Agents')} </div>
							</Link>
							<Link href={'/community?articleCategory=FREE'}>
								<div> {t('Community')} </div>
							</Link>
							{user?._id && (
								<Link href={'/mypage'}>
									<div> {t('My Page')} </div>
								</Link>
							)}
							<Link href={'/cs'}>
								<div> {t('CS')} </div>
							</Link>
						</Box>
						<Box component={'div'} className={'user-box'}>
							{user?._id ? (
								<>
									<div className={'login-user'} onClick={(event: any) => setLogoutAnchor(event.currentTarget)}>
										<img
											src={
												user?.memberImage ? `${REACT_APP_API_URL}/${user?.memberImage}` : '/img/profile/defaultUser.svg'
											}
											alt=""
										/>
									</div>

									<Menu
										id="basic-menu"
										anchorEl={logoutAnchor}
										open={logoutOpen}
										onClose={() => {
											setLogoutAnchor(null);
										}}
										sx={{ mt: '5px' }}
									>
										<MenuItem onClick={() => logOut()}>
											<Logout fontSize="small" style={{ color: 'blue', marginRight: '10px' }} />
											Logout
										</MenuItem>
									</Menu>
								</>
							) : (
								<Link href={'/account/join'}>
									<div className={'join-box'}>
										<AccountCircleOutlinedIcon />
										<span>
											{t('Login')} / {t('Register')}
										</span>
									</div>
								</Link>
							)}

							<div id="notifications" className={'lan-box'}>
								{user?._id && (
									<Button
										disableRipple
										className="btn-lang"
										onClick={notClick}
										style={{ marginRight: '20px', background: 'none' }}
									>
										<NotificationsOutlinedIcon className={'notification-icon'} />
										<RippleBadge
											style={{
												margin: '-18px 0 0 0',
												transform: 'scale(0.65)',
											}}
											badgeContent={notificationCount}
										/>
									</Button>
								)}
								<StyledMenu
									anchorEl={anchorEl3}
									open={openNotifications}
									onClose={notClose}
									sx={{
										position: 'absolute',
										left: 10,
										top: 0,
										maxHeight: '400px',
										overflow: 'hidden',
									}}
								>
									{notifications?.length > 0 ? (
										notifications.map((notification) => (
											<MenuItem
												disableRipple
												onClick={() =>
													//@ts-ignore
													updateNotificationHandler(user, notification._id)
												}
												sx={{
													width: '200px',
													display: 'flex',
													flexDirection: 'column',
													alignItems: 'flex-start',
													background: '#ececec',
													borderRadius: '5px',
													boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
													margin: '0px 10px 10px 10px',
													overflow: 'hidden',
													'&:hover': { background: '#f2f2f2' },
												}}
											>
												<Typography
													sx={{
														fontSize: '14px',
														fontWeight: 500,
														fontFamily: 'sans-serif',
														color: '#000',
													}}
												>
													{
														// @ts-ignore
														notification.notificationTitle
													}
												</Typography>
												<p
													style={{
														fontSize: '10px',
														fontWeight: 400,
														fontFamily: 'sans-serif',
														color: '#999',
													}}
												>
													{
														// @ts-ignore
														notification.notificationDesc
													}
												</p>
											</MenuItem>
										))
									) : (
										<MenuItem
											disableRipple
											onClick={notClose}
											id="en"
											sx={{
												width: '200px',
												display: 'flex',
												flexDirection: 'column',
												background: '#ececec',
												borderRadius: '5px',
												boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
												overflow: 'hidden',
												'&:hover': { background: '#f2f2f2' },
											}}
										>
											<Typography
												sx={{
													fontSize: '18px',
													fontWeight: 500,
													fontFamily: 'sans-serif',
													color: '#000',
												}}
											>
												No Notifications Yet
											</Typography>
										</MenuItem>
									)}
								</StyledMenu>
								<Button
									disableRipple
									className="btn-lang"
									onClick={langClick}
									endIcon={<CaretDown size={14} color="#616161" weight="fill" />}
								>
									<Box component={'div'} className={'flag'}>
										{lang !== null ? (
											<img src={`/img/flag/lang${lang}.png`} alt={'usaFlag'} />
										) : (
											<img src={`/img/flag/langen.png`} alt={'usaFlag'} />
										)}
									</Box>
								</Button>
								<StyledMenu anchorEl={anchorEl2} open={drop} onClose={langClose} sx={{ position: 'absolute' }}>
									<MenuItem disableRipple onClick={langChoice} id="en">
										<img
											className="img-flag"
											src={'/img/flag/langen.png'}
											onClick={langChoice}
											id="en"
											alt={'usaFlag'}
										/>
										{t('English')}
									</MenuItem>
									<MenuItem disableRipple onClick={langChoice} id="kr">
										<img
											className="img-flag"
											src={'/img/flag/langkr.png'}
											onClick={langChoice}
											id="uz"
											alt={'koreanFlag'}
										/>
										{t('Korean')}
									</MenuItem>
									<MenuItem disableRipple onClick={langChoice} id="ru">
										<img
											className="img-flag"
											src={'/img/flag/langru.png'}
											onClick={langChoice}
											id="ru"
											alt={'russiaFlag'}
										/>
										{t('Russian')}
									</MenuItem>
								</StyledMenu>
							</div>
						</Box>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default withRouter(Top);
