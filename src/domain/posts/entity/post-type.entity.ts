import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { IPostType } from '../typing'
import { Post } from './post.entity'
import { PostTypeTranslation } from './post-type-translation.entity'

@Entity('postsType')
export class PostType implements IPostType {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	key: string

	@Column({ nullable: true })
	authorId?: number

	@OneToMany(() => Post, post => post.type)
	post?: Post[]

	@OneToMany(() => PostTypeTranslation, translate => translate.postType)
	translations?: PostTypeTranslation[]

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string

	@UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	updatedAt: string
}
