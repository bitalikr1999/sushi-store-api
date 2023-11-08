import { Lang } from 'src/shared'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IPostTypeTranslation } from '../typing'
import { PostType } from './post-type.entity'

@Entity('postsTypesTranslations')
export class PostTypeTranslation implements IPostTypeTranslation {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column({ type: 'varchar' })
	lang: Lang

	@Column()
	typeId: number

	@Column({ nullable: true, type: 'text' })
	description: string

	@ManyToOne(() => PostType, type => type.translations, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'typeId' })
	postType?: PostType
}
