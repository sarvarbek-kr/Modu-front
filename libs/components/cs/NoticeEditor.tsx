import { useMutation } from '@apollo/client';
import { Box, Typography, FormControl, Select, MenuItem, TextField, Button, Stack } from '@mui/material';
import { Editor } from '@toast-ui/react-editor';
import { useRouter } from 'next/router';
import { useRef, useState, useMemo } from 'react';
import { Message } from '../../enums/common.enum';
import { NoticeCategory } from '../../enums/notice.enum';
import { sweetTopSuccessAlert, sweetErrorHandling } from '../../sweetAlert';
import { T } from '../../types/common';
import '@toast-ui/editor/dist/toastui-editor.css';
import { CREATE_NOTICE } from '../../../apollo/admin/mutation';

const NoticeEditor = () => {
	const editorRef = useRef<Editor>(null);
	const [noticeCategory, setNoticeCategory] = useState<NoticeCategory>(NoticeCategory.NOTICE);
	const router = useRouter();

	/** APOLLO REQUESTS **/
	const [createNotice] = useMutation(CREATE_NOTICE);

	const memoizedValues = useMemo(() => {
		const noticeTitle = '',
			noticeContent = '',
			subject = '',
			content = '';

		return { noticeTitle, noticeContent, subject, content };
	}, []);

	// LIFECYCLE

	/** HANDLERS **/
	const changeCategoryHandler = (e: any) => {
		setNoticeCategory(e.target.value);
	};

	const noticeTitleHandler = (e: T) => {
		console.log(e.target.value);
		if (noticeCategory === NoticeCategory.FAQ) {
			memoizedValues.subject = e.target.value;
		} else {
			memoizedValues.noticeTitle = e.target.value;
		}
	};

	const handleRegisterButton = async () => {
		try {
			const editor = editorRef.current;
			if (noticeCategory === NoticeCategory.FAQ) {
				const content = editor?.getInstance().getHTML() as string;
				memoizedValues.content = content;
			} else {
				const content = editor?.getInstance().getHTML() as string;
				memoizedValues.noticeContent = content;
			}
			console.log('memoizedValues', memoizedValues);

			if (
				(memoizedValues.noticeTitle === '' && memoizedValues.subject === '') ||
				(memoizedValues.noticeContent === '' && memoizedValues.content === '')
			) {
				throw new Error(Message.INSERT_ALL_INPUTS);
			}
			console.log('=================');
			await createNotice({
				variables: {
					input: { ...memoizedValues, noticeCategory },
				},
			});

			await sweetTopSuccessAlert('Notice is created successfully', 700);
			await router.push({
				pathname: '/_admin/cs/notice',
			});
		} catch (err: any) {
			console.log(err);
			sweetErrorHandling(new Error(Message.INSERT_ALL_INPUTS)).then();
		}
	};

	return (
		<Stack>
			<Stack
				direction="row"
				style={{
					margin: '40px',
					justifyContent: 'space-evenly',
				}}
			>
				<Box component={'div'} className={'form_row'} style={{ width: '300px' }}>
					<Typography style={{ color: '#000', margin: '10px' }} variant="h3">
						Category
					</Typography>
					<FormControl sx={{ width: '100%' }}>
						<Select
							value={noticeCategory}
							onChange={changeCategoryHandler}
							displayEmpty
							inputProps={{ 'aria-label': 'Without label' }}
							sx={{
								outline: 'none',
							}}
						>
							<MenuItem value={NoticeCategory.NOTICE}>
								<span>NOTICE</span>
							</MenuItem>
							<MenuItem value={NoticeCategory.TERMS}>TERMS</MenuItem>
							<MenuItem value={NoticeCategory.INQUIRY}>INQUIRY</MenuItem>
							<MenuItem value={NoticeCategory.FAQ}>FAQ</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<Box component={'div'} style={{ width: '300px', flexDirection: 'column' }}>
					<Typography style={{ color: '#000', margin: '10px' }} variant="h3">
						{noticeCategory === NoticeCategory.FAQ ? 'Subject' : 'Title'}
					</Typography>
					<TextField
						onChange={noticeTitleHandler}
						id="filled-basic"
						InputProps={{
							disableUnderline: true,
							sx: {
								outline: 'none',
								border: 'none',
								backgroundColor: '#fff', // Background color
								color: '#000', // Text color
								padding: '10px', // Adds padding
							},
						}}
					/>
				</Box>
			</Stack>

			<Editor
				initialValue={'Type here'}
				placeholder={'Type here'}
				previewStyle={'vertical'}
				height={'640px'}
				// @ts-ignore
				initialEditType={'WYSIWYG'}
				toolbarItems={[
					['heading', 'bold', 'italic', 'strike'],
					['table', 'link'],
					['ul', 'ol', 'task'],
				]}
				ref={editorRef}
				events={{
					load: function (param: any) {},
				}}
			/>

			<Stack direction="row" style={{ justifyContent: 'center' }}>
				<Button
					variant="contained"
					style={{
						margin: '30px',
						width: '250px',
						height: '45px',
						backgroundColor: '#703fb7',
						color: '#ffffff',
					}}
					onClick={handleRegisterButton}
				>
					Register
				</Button>
			</Stack>
		</Stack>
	);
};

export default NoticeEditor;
