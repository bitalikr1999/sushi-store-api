import { Repository } from 'typeorm'
import { IPage, IPageTransation } from './page.interface'

export type IPagesRepository = Repository<IPage>
export type IPageTranslationsRepository = Repository<IPageTransation>
