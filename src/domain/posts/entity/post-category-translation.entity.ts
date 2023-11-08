import { Lang } from 'src/shared'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IPostCategoryTranslation } from '../typing'
import { PostCategory } from './post-category.entity'

@Entity('postsCategoriesTranslations')
export class PostCategoryTranslation implements IPostCategoryTranslation {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column({ type: 'varchar' })
	lang: Lang

	@Column()
	categoryId: number

	@Column({ nullable: true, type: 'text' })
	description: string

	@ManyToOne(() => PostCategory, category => category.translations, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'categoryId' })
	postCategory?: PostCategory
}
