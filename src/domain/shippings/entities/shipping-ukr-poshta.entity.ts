import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IShippingUrkPoshta } from '../typing'
import { Shipping } from './shipping.entity'

@Entity('shippingsUkrPoshta')
export class ShippingUrkPoshta implements IShippingUrkPoshta {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	shippingId: number

	@Column()
	town: string

	@Column()
	departmentAddress: string

	@ManyToOne(() => Shipping, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'shippingId' })
	shipping?: Shipping
}
