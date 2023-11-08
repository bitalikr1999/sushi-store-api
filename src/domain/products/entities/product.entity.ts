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
import { IProduct } from '../typing/interfaces'
import { Currency } from 'src/shared'
import { ProductStatus } from '../typing/enums'
import { ProductTranslation } from './product-translation.entity'
import { Media } from 'src/domain/media/entities'
import { ProductVariant } from './product-variants.entity'

@Entity('products')
export class Product implements IProduct {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ default: '' })
	code: string

	@Column({ nullable: true, unique: true })
	key: string

	@Column({ type: 'numeric' })
	price: number

	@Column({ default: 1 })
	countInStock: number

	@Column({ default: 0, type: 'int' })
	discount: number

	@Column({ default: Currency.UAH })
	currency: Currency

	@Column({ type: 'varchar', default: ProductStatus.Active })
	status: ProductStatus

	@Column({ type: 'numeric', array: true })
	categoriesIds: number[]

	@Column({ type: 'numeric', nullable: true })
	previewMediaId: number

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string

	@UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	updatedAt: string

	@OneToMany(() => ProductTranslation, translation => translation.product)
	translations: ProductTranslation[]

	@ManyToOne(() => Media, { onDelete: 'SET NULL' })
	@JoinColumn({ name: 'previewMediaId' })
	previewMedia: Media

	@OneToMany(() => ProductVariant, variant => variant.product)
	variants?: ProductVariant[]
}
