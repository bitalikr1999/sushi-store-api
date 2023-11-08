import { Lang } from 'src/shared'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Page } from './page.entity'
import { IPageTransation } from '../typing'

@Entity('pagesTranslations')
export class PageTranslation implements IPageTransation {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	title: string

	@Column({ type: 'varchar' })
	lang: Lang

	@Column()
	pageId: number

	@Column({ nullable: true, type: 'text' })
	description: string

	@ManyToOne(() => Page, page => page.translations, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'pageId' })
	page: Page
}
