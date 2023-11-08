import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { IPage } from '../typing'
import { PageTemplate } from 'src/config/templates'
import { PageTranslation } from './page-translation.entity'

@Entity('pages')
export class Page implements IPage {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ nullable: true })
	template: PageTemplate

	@Column()
	key: string

	@Column({ nullable: true })
	authorId?: number

	@Column({ type: 'json', default: {}, nullable: true })
	metadata?: any

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string

	@UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	updatedAt: string

	@OneToMany(() => PageTranslation, translate => translate.page)
	translations?: PageTranslation[]
}
