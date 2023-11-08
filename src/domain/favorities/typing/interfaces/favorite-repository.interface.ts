import { Repository } from 'typeorm'
import { IFavorite } from './favorite.interface'

export type IFavoritiesRepository = Repository<IFavorite>
