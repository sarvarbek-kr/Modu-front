export const REACT_APP_API_URL = `${process.env.REACT_APP_API_URL}`;

export const availableOptions = ['furnitureBarter'];

const thisYear = new Date().getFullYear();

export const furnitureYears: any = [];

for (let i = 1970; i <= thisYear; i++) {
	furnitureYears.push(String(i));
}

export const Messages = {
	error1: 'Something went wrong!',
	error2: 'Please login first!',
	error3: 'Please fulfill all inputs!',
	error4: 'Message is empty!',
	error5: 'Only images with jpeg, jpg, png format allowed!',
};

export const topFurnitureRank = 2;
