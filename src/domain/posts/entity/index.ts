import { PostCategoryTranslation } from './post-category-translation.entity'
import { PostCategory } from './post-category.entity'
import { PostToCategory } from './post-to-category.entity'
import { PostTranslation } from './post-translation.entity'
import { PostTypeTranslation } from './post-type-translation.entity'
import { PostType } from './post-type.entity'
import { Post } from './post.entity'

export const POSTS_ENITIES = [
	Post,
	PostType,
	PostCategory,
	PostToCategory,
	PostTranslation,
	PostCategoryTranslation,
	PostTypeTranslation,
]

export {
	Post,
	PostType,
	PostCategory,
	PostToCategory,
	PostTranslation,
	PostCategoryTranslation,
	PostTypeTranslation,
}
