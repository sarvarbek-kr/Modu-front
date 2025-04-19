import { FurnitureLocation, FurnitureStatus, FurnitureType } from '../../enums/furniture.enum';
import { Direction } from '../../enums/common.enum';

export interface FurnitureInput {
	furnitureType: FurnitureType;
	furnitureLocation: FurnitureLocation;
	furnitureAddress: string;
	furnitureTitle: string;
	furniturePrice: number;
	furnitureBeds: number;
	furnitureRooms: number;
	furnitureImages: string[];
	furnitureDesc?: string;
	furnitureBarter?: boolean;
	memberId?: string;
	constructedAt?: Date;
}

interface PISearch {
	memberId?: string;
	locationList?: FurnitureLocation[];
	typeList?: FurnitureType[];
	roomsList?: Number[];
	options?: string[];
	bedsList?: Number[];
	pricesRange?: Range;
	periodsRange?: PeriodsRange;
	squaresRange?: Range;
	text?: string;
}

export interface FurnituresInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: PISearch;
}

interface APISearch {
	furnitureStatus?: FurnitureStatus;
}

export interface AgentFurnituresInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: APISearch;
}

interface ALPISearch {
	furnitureStatus?: FurnitureStatus;
	furnitureLocationList?: FurnitureLocation[];
}

export interface AllFurnituresInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ALPISearch;
}

interface Range {
	start: number;
	end: number;
}

interface PeriodsRange {
	start: Date | number;
	end: Date | number;
}
