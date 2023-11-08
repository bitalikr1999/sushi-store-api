import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Post } from './post.entity'
import { PostCategory } from './post-category.entity'

@Entity('postsToCategory')
export class PostToCategory {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	postId: number

	@Column()
	categoryId: number

	@ManyToOne(() => Post, post => post, {
		onDelete: 'CASCADE',
	})
	post?: Post

	@ManyToOne(() => PostCategory, category => category, {
		onDelete: 'CASCADE',
	})
	category?: PostCategory

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string

	@UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	updatedAt: string
}
