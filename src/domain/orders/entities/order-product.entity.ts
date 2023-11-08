import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IOrderProduct } from '../typing'

import { Order } from './order.entity'
import { Product, ProductVariant } from 'src/domain/products/entities'

@Entity('orderProducts')
export class OrderProduct implements IOrderProduct {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'numeric' })
	price: number

	@Column({ type: 'numeric' })
	count: number

	@Column({ default: 0 })
	discount: number

	@Column({ nullable: true })
	productVariantId?: number

	@Column()
	orderId: number

	@Column({ nullable: true })
	productId: number

	@ManyToOne(() => Order, order => order.orderProducts, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'orderId' })
	order?: Order

	@ManyToOne(() => Product, { onDelete: 'SET NULL' })
	@JoinColumn({ name: 'productId' })
	product?: Product

	@ManyToOne(() => ProductVariant, { onDelete: 'SET NULL' })
	@JoinColumn({ name: 'productVariantId' })
	productVariant?: ProductVariant
}
