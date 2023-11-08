export interface IInstagramResponce {
	media_url: string
	permalink: string
	media_type: string
	id: string
}

export interface IInstagramService {
	getInstagramPhotos(length?: number): Promise<IInstagramResponce[]>
}
