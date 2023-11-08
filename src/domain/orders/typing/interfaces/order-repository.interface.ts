import { Repository } from 'typeorm'
import { IOrder, IOrderProduct, IOrderUser } from './order.interface'

export type IOrdersRepository = Repository<IOrder>
export type IOrdersUsersRepository = Repository<IOrderUser>

export type IOrdersProductsRepository = Repository<IOrderProduct>
