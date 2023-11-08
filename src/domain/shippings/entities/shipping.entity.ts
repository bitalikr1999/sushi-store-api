import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IShipping } from '../typing/interfaces'
import { ShippingType } from '../typing'
import { ShippingUrkPoshta } from './shipping-ukr-poshta.entity'
import { ShippingNovaPoshta } from './shipping-nova-poshta.entity'

@Entity('shippings')
export class Shipping implements IShipping {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ nullable: true })
	countryCode?: string

	@Column({ nullable: true })
	addressLine?: string

	@Column({ default: ShippingType.NovaPoshta })
	type: ShippingType

	@OneToMany(() => ShippingUrkPoshta, item => item.shipping)
	urkPoshtaData?: ShippingUrkPoshta

	@OneToMany(() => ShippingNovaPoshta, item => item.shipping)
	novaPoshtaData?: ShippingNovaPoshta
}
