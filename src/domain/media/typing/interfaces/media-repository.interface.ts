import { Repository } from 'typeorm'
import { IMedia } from './media.interface'

export type IMediaRepository = Repository<IMedia>
