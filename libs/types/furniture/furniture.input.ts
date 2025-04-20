import {
	FurnitureBrand,
	FurnitureColor,
	FurnitureCondition,
	FurnitureLocation,
	FurnitureMaterial,
	FurnitureStatus,
	FurnitureType,
} from '../../enums/furniture.enum';
import { Direction } from '../../enums/common.enum';

export interface FurnitureDimensionsInput {
	width: number;
	height: number;
	depth: number;
}

export interface FurnitureInput {
	furnitureType: FurnitureType;
	furnitureLocation: FurnitureLocation;
	furnitureCondition: FurnitureCondition;
	furnitureDimensions: FurnitureDimensionsInput;
	furnitureColor: FurnitureColor;
	furnitureMaterial: FurnitureMaterial;
	furnitureBrand: FurnitureBrand;
	furnitureTitle: string;
	furniturePrice: number;
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
	conditionList?: FurnitureCondition[];
	colorList?: FurnitureColor[];
	materialList?: FurnitureMaterial[];
	brandList?: FurnitureBrand[];
	furnitureDimensions?: FurnitureDimensionsInput;
	options?: string[];
	pricesRange?: Range;
	periodsRange?: PeriodsRange;
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
