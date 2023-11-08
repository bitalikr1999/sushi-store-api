import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { IPost } from '../typing'
import { PageTemplate } from 'src/config/templates'
import { PostType } from './post-type.entity'
import { PostToCategory } from './post-to-category.entity'
import { PostTranslation } from './post-translation.entity'

@Entity('posts')
export class Post implements IPost {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ nullable: true })
	template: PageTemplate

	@Column({ nullable: true })
	authorId?: number

	@Column()
	typeId?: number

	@ManyToOne(() => PostType, pt => pt.post)
	@JoinColumn({ name: 'typeId' })
	type?: PostType

	@OneToMany(() => PostTranslation, translate => translate.post)
	translations?: PostTranslation[]

	@OneToMany(() => PostToCategory, postToCategory => postToCategory.post)
	postToCategories: PostToCategory[]

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string

	@UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	updatedAt: string
}
