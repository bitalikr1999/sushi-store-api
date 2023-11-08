export interface IMediaService {
	put: (payload: IPutMediaPayload) => void
	remove: (id: number) => void
}

export interface IPutMediaPayload {
	url: string
	name: string
	type: string
	userId?: number
}
