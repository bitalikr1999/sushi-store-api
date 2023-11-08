import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IOrder, IOrderUser } from '../typing'
import { Order } from './order.entity'

@Entity('orderUsers')
export class OrderUser implements IOrderUser {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ nullable: true })
	email?: string

	@Column()
	phoneNumber: string

	@Column({ nullable: true })
	fixedUserId?: string

	@Column()
	name: string

	@Column({ nullable: true })
	userId?: number

	@OneToMany(() => Order, order => order.orderUser)
	orders: IOrder[]
}
