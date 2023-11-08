import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IFavorite } from '../typing/interfaces'
import { Product } from 'src/domain/products/entities'
import { IProduct } from 'src/domain/products/typing'

@Entity('favorities')
export class Favorite implements IFavorite {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	productId: number

	@Column({ nullable: false })
	ownerId: string

	@ManyToOne(() => Product)
	@JoinColumn({ name: 'productId' })
	product: IProduct
}
