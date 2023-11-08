export interface ISendPayload {
	to?: string
	subject: string
	text?: string
	from?: string
	html?: string
	toAdmin?: boolean
}

export interface IMailerService {
	send(payload: ISendPayload): Promise<void>
}
