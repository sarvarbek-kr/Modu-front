import {
	FurnitureBrand,
	FurnitureColor,
	FurnitureCondition,
	FurnitureLocation,
	FurnitureMaterial,
	FurnitureStatus,
	FurnitureType,
} from '../../enums/furniture.enum';
import { Member } from '../member/member';
import { FurnitureDimensionsInput } from './furniture.input';

export interface MeLiked {
	memberId: string;
	likeRefId: string;
	myFavorite: boolean;
}

export interface TotalCounter {
	total: number;
}

export interface Furniture {
	_id: string;
	furnitureType: FurnitureType;
	furnitureStatus: FurnitureStatus;
	furnitureLocation: FurnitureLocation;
	furnitureCondition: FurnitureCondition;
	furnitureDimensions: FurnitureDimensionsInput;
	furnitureColor: FurnitureColor;
	furnitureMaterial: FurnitureMaterial;
	furnitureBrand: FurnitureBrand;
	furnitureTitle: string;
	furniturePrice: number;
	furnitureViews: number;
	furnitureLikes: number;
	furnitureComments: number;
	furnitureRank: number;
	furnitureImages: string[];
	furnitureDesc?: string;
	furnitureBarter: boolean;
	memberId: string;
	soldAt?: Date;
	deletedAt?: Date;
	constructedAt?: Date;
	createdAt: Date;
	updatedAt: Date;
	/** from aggregation **/
	meLiked?: MeLiked[];
	memberData?: Member;
}

export interface Furnitures {
	list: Furniture[];
	metaCounter: TotalCounter[];
}
