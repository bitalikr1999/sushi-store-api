import { Lang } from 'src/shared'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Post } from './post.entity'
import { IPostTranslation } from '../typing'

@Entity('postsTranslations')
export class PostTranslation implements IPostTranslation {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	title: string

	@Column({ type: 'varchar' })
	lang: Lang

	@Column()
	postId: number

	@Column({ nullable: true, type: 'text' })
	description: string

	@ManyToOne(() => Post, post => post)
	@JoinColumn({ name: 'pageId' })
	post?: Post
}
