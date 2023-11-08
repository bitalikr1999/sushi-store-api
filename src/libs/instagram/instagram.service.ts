import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import {
	IInstagramModuleOptions,
	IInstagramResponce,
	IInstagramService,
	INSTAGRAM_OPTIONS,
} from './typing'
import axios, { AxiosInstance } from 'axios'

@Injectable()
export class InstagramService implements IInstagramService {
	private http: AxiosInstance

	constructor(@Inject(INSTAGRAM_OPTIONS) private readonly options: IInstagramModuleOptions) {
		this.http = axios.create({
			baseURL: `https://graph.facebook.com/${this.options.apiVersion}/${this.options.pageId}/media`,
		})
	}

	// async onModuleInit() {
	// 	const posts = await this.getInstagramPhotos(1)
	// }

	public async getInstagramPhotos(length?: number) {
		try {
			const {
				data: { data },
			} = await this.http.get(
				`?access_token=${this.options.accessToken}&fields=media_url,permalink,media_type&limit=${length}`,
			)
			return data.filter(it => it.media_type === 'IMAGE')
		} catch (error) {}
	}
}
