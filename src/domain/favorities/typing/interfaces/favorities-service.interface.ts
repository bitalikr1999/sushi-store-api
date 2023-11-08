export interface IFavoritiesService {
	toggle(payload: IAddFavoritePayload): Promise<boolean>
	getIds(ownerId: string): Promise<number[]>
}

export interface IAddFavoritePayload {
	productId: number
	ownerId: string
}
