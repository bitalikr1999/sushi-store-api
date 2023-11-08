import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { IOrder } from '../typing'
import { OrderUser } from './order-user.entity'

import { OrderPaymentMethod, OrderStatus } from '../typing/enums'
import { OrderProduct } from './order-product.entity'
import { Currency } from 'src/shared'
import { Shipping } from 'src/domain/shippings/entities'

@Entity('orders')
export class Order implements IOrder {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'varchar', default: OrderStatus.New })
	status: OrderStatus

	@Column({ type: 'varchar', default: Currency.UAH })
	currency: Currency

	@Column({ nullable: true, type: 'text' })
	comment: string

	@Column()
	orderUserId: number

	@Column({ default: 0 })
	usedBonuses?: number

	@Column({ nullable: true })
	shippingId?: number

	@Column({ nullable: true, type: 'json' })
	options?: any

	@Column({ type: 'varchar', default: OrderPaymentMethod.Offline })
	paymentMethod: OrderPaymentMethod

	@ManyToOne(() => OrderUser, { onDelete: 'SET NULL' })
	@JoinColumn({ name: 'orderUserId' })
	orderUser?: OrderUser

	@ManyToOne(() => Shipping, { onDelete: 'SET NULL' })
	@JoinColumn({ name: 'shippingId' })
	shipping?: Shipping

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string

	@UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	updatedAt: string

	@OneToMany(() => OrderProduct, product => product.order)
	orderProducts?: OrderProduct[]
}
