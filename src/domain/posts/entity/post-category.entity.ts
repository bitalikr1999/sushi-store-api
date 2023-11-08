import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { IPostCategory } from '../typing'
import { PostToCategory } from './post-to-category.entity'
import { PostCategoryTranslation } from './post-category-translation.entity'

@Entity('postsCategory')
export class PostCategory implements IPostCategory {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	key: string

	@Column({ nullable: true })
	parentId?: number

	@Column()
	authorId?: number

	@OneToMany(() => PostCategoryTranslation, translate => translate.postCategory)
	translations?: PostCategoryTranslation[]

	@OneToMany(() => PostToCategory, postToCategory => postToCategory.category)
	postToCategories: PostToCategory[]

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string

	@UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	updatedAt: string
}
