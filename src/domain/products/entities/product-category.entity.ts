import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { IProductCategory } from '../typing/interfaces'
import { ProductCategoryTranslation } from './product-category-translation.entity'

@Entity('productCategories')
export class ProductCategory implements IProductCategory {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ nullable: true })
	parentId?: number

	@Column({ nullable: true })
	key?: string

	@Column({ nullable: true, type: 'json' })
	data?: string

	@Column({ type: 'numeric', array: true, default: [] })
	path?: number[]

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string

	@UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	updatedAt: string

	@Column({ nullable: true })
	authorId?: number

	@OneToMany(() => ProductCategoryTranslation, translation => translation.productCategory)
	translations: ProductCategoryTranslation[]
}
