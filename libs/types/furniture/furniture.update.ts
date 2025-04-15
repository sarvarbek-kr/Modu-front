import { FurnitureLocation, FurnitureStatus, FurnitureType } from '../../enums/furniture.enum';

export interface FurnitureUpdate {
	_id: string;
	furnitureType?: FurnitureType;
	furnitureStatus?: FurnitureStatus;
	furnitureLocation?: FurnitureLocation;
	furnitureAddress?: string;
	furnitureTitle?: string;
	furniturePrice?: number;
	furnitureSquare?: number;
	furnitureBeds?: number;
	furnitureRooms?: number;
	furnitureImages?: string[];
	furnitureDesc?: string;
	furnitureBarter?: boolean;
	furnitureRent?: boolean;
	soldAt?: Date;
	deletedAt?: Date;
	constructedAt?: Date;
}
