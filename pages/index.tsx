import { NextPage } from 'next';
import useDeviceDetect from '../libs/hooks/useDeviceDetect';
import withLayoutMain from '../libs/components/layout/LayoutHome';
import CommunityBoards from '../libs/components/homepage/CommunityBoards';
import TopAgents from '../libs/components/homepage/TopAgents';
import PhotoGrid from '../libs/components/homepage/PhotoGrid';
import TrendFurnitures from '../libs/components/homepage/TrendFurnitures';
import TopFurnitures from '../libs/components/homepage/TopFurnitures';
import { Stack } from '@mui/material';
import Advertisement from '../libs/components/homepage/Advertisement';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import FurnitureCategories from '../libs/components/homepage/FurnitureCategoryCards';
import AllBrand from '../libs/components/homepage/AllBrands';
import Setup from '../libs/components/homepage/ModuSetup';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const Home: NextPage = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return (
			<Stack className={'home-page'}>
				<TrendFurnitures />
				<FurnitureCategories />
				<Advertisement />
				<TopFurnitures />
				<TopAgents />
			</Stack>
		);
	} else {
		return (
			<Stack className={'home-page'}>
				<FurnitureCategories />
				<TrendFurnitures />
				<Advertisement />
				<Setup />
				<AllBrand />
				<TopFurnitures />

				<PhotoGrid />
				<TopAgents />
				<CommunityBoards />
			</Stack>
		);
	}
};

export default withLayoutMain(Home);
