import { Repository } from 'typeorm'
import {
	IPost,
	IPostCategory,
	IPostCategoryTranslation,
	IPostToCategory,
	IPostTranslation,
	IPostType,
	IPostTypeTranslation,
} from './posts.interface'

export type IPostRepository = Repository<IPost>
export type IPostCategoryRepository = Repository<IPostCategory>
export type IPostTypeRepository = Repository<IPostType>

export type IPostToCategoryRepository = Repository<IPostToCategory>

export type IPostTranslateRepository = Repository<IPostTranslation>
export type IPostCategoryTranslateRepository = Repository<IPostCategoryTranslation>
export type IPostTypeTranslateRepository = Repository<IPostTypeTranslation>
