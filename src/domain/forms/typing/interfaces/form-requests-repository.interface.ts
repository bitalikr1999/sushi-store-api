import { Repository } from 'typeorm'
import { IFormRequest } from './form-requests.interface'

export type IFormRequestsRepository = Repository<IFormRequest>
