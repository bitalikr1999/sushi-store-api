import { IMenu } from 'src/domain/menu/typing'
import { IUser } from 'src/domain/users/typing'

export interface IPublicDataResponse {
	topMenu?: IMenu
	secondMenu?: IMenu
	footerMenu?: IMenu
	user?: Partial<IUser>
}
