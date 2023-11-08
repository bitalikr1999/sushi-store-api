import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IProductVariant } from '../typing'
import { Product } from './product.entity'

@Entity('productsVariants')
export class ProductVariant implements IProductVariant {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	productId: number

	@Column({ nullable: true })
	previewMediaId?: number

	@Column()
	name: string

	@Column({ type: 'text', nullable: true })
	description: string

	@ManyToOne(() => Product, product => product.variants, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	@JoinColumn({ name: 'productId' })
	product?: Product
}
