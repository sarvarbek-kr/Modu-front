import { gql } from '@apollo/client';

/**************************
 *         MEMBER         *
 *************************/

export const UPDATE_MEMBER_BY_ADMIN = gql`
	mutation UpdateMemberByAdmin($input: MemberUpdate!) {
		updateMemberByAdmin(input: $input) {
			_id
			memberType
			memberStatus
			memberAuthType
			memberPhone
			memberNick
			memberFullName
			memberImage
			memberAddress
			memberDesc
			memberFurnitures
			memberRank
			memberArticles
			memberPoints
			memberLikes
			memberViews
			memberWarnings
			memberBlocks
			deletedAt
			createdAt
			updatedAt
			accessToken
		}
	}
`;

/**************************
 *        FURNITURE        *
 *************************/

export const UPDATE_FURNITURE_BY_ADMIN = gql`
	mutation UpdateFurnitureByAdmin($input: FurnitureUpdate!) {
		updateFurnitureByAdmin(input: $input) {
			_id
			furnitureType
			furnitureStatus
			furnitureLocation
			furnitureCondition
			furnitureColor
			furnitureMaterial
			furnitureBrand
			furnitureTitle
			furniturePrice
			furnitureViews
			furnitureLikes
			furnitureComments
			furnitureRank
			furnitureImages
			furnitureDesc
			furnitureBarter
			memberId
			soldAt
			deletedAt
			constructedAt
			createdAt
			updatedAt
			furnitureDimensions {
				width
				height
				depth
			}
		}
	}
`;

export const REMOVE_FURNITURE_BY_ADMIN = gql`
	mutation RemoveFurnitureByAdmin($input: String!) {
		removeFurnitureByAdmin(furnitureId: $input) {
			_id
			furnitureType
			furnitureStatus
			furnitureLocation
			furnitureCondition
			furnitureColor
			furnitureMaterial
			furnitureBrand
			furnitureTitle
			furniturePrice
			furnitureViews
			furnitureLikes
			furnitureImages
			furnitureDesc
			furnitureBarter
			memberId
			soldAt
			deletedAt
			constructedAt
			createdAt
			updatedAt
			furnitureDimensions {
				width
				height
				depth
			}
		}
	}
`;

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const UPDATE_BOARD_ARTICLE_BY_ADMIN = gql`
	mutation UpdateBoardArticleByAdmin($input: BoardArticleUpdate!) {
		updateBoardArticleByAdmin(input: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			memberId
			createdAt
			updatedAt
		}
	}
`;

export const REMOVE_BOARD_ARTICLE_BY_ADMIN = gql`
	mutation RemoveBoardArticleByAdmin($input: String!) {
		removeBoardArticleByAdmin(articleId: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			memberId
			createdAt
			updatedAt
		}
	}
`;

/**************************
 *         COMMENT        *
 *************************/

export const REMOVE_COMMENT_BY_ADMIN = gql`
	mutation RemoveCommentByAdmin($input: String!) {
		removeCommentByAdmin(commentId: $input) {
			_id
			commentStatus
			commentGroup
			commentContent
			commentRefId
			memberId
			createdAt
			updatedAt
		}
	}
`;
