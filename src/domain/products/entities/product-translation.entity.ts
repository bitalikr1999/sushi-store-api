import { Lang } from 'src/shared'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IProductTranslation } from '../typing/interfaces'
import { Product } from './product.entity'

@Entity('productsTranslations')
export class ProductTranslation implements IProductTranslation {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	productId: number

	@Column()
	name: string

	@Column()
	lang: Lang

	@Column({ nullable: true })
	description?: string

	@ManyToOne(() => Product, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
	@JoinColumn({ name: 'productId' })
	product?: Product
}
