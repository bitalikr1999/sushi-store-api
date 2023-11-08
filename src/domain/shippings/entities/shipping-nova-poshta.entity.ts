import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IShippingNovaPoshta } from '../typing'
import { Shipping } from './shipping.entity'

@Entity('shippingsNovaPoshta')
export class ShippingNovaPoshta implements IShippingNovaPoshta {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	shippingId: number

	@Column()
	region: string

	@Column({ nullable: true })
	regionCode?: string

	@Column()
	town: string

	@Column({ nullable: true })
	townCode?: string

	@Column()
	departmentName: string

	@Column()
	departmentCode: string

	@ManyToOne(() => Shipping, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'shippingId' })
	shipping?: Shipping
}
