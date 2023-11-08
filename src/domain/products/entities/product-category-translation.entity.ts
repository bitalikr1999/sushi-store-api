import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IProductCategoryTranslation } from '../typing/interfaces'
import { ProductCategory } from './product-category.entity'
import { Lang } from 'src/shared'

@Entity('productCategoriesTranslations')
export class ProductCategoryTranslation implements IProductCategoryTranslation {
	@PrimaryGeneratedColumn()
	id?: number

	@Column()
	categoryId: number

	@Column()
	name: string

	@Column()
	lang: Lang

	@Column({ nullable: true })
	description?: string

	@ManyToOne(() => ProductCategory, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
	@JoinColumn({ name: 'categoryId' })
	productCategory?: ProductCategory
}
