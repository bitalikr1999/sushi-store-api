import { Repository } from 'typeorm'
import { IShipping, IShippingNovaPoshta, IShippingUrkPoshta } from './shipping.interfaces'

export type IShippingRepository = Repository<IShipping>
export type IShippingNovaPoshtaRepository = Repository<IShippingNovaPoshta>
export type IShippingUkrPoshtaRepository = Repository<IShippingUrkPoshta>
