import {
	FurnitureBrand,
	FurnitureColor,
	FurnitureCondition,
	FurnitureLocation,
	FurnitureMaterial,
	FurnitureStatus,
	FurnitureType,
} from '../../enums/furniture.enum';
import { FurnitureDimensionsInput } from './furniture.input';

export interface FurnitureUpdate {
	_id: string;
	furnitureType?: FurnitureType;
	furnitureStatus?: FurnitureStatus;
	furnitureLocation?: FurnitureLocation;
	furnitureCondition?: FurnitureCondition;
	furnitureDimensions?: FurnitureDimensionsInput;
	furnitureColor?: FurnitureColor;
	furnitureMaterial?: FurnitureMaterial;
	furnitureBrand?: FurnitureBrand;
	furnitureTitle?: string;
	furniturePrice?: number;
	furnitureImages?: string[];
	furnitureDesc?: string;
	furnitureBarter?: boolean;
	soldAt?: Date;
	deletedAt?: Date;
	constructedAt?: Date;
}
