export interface IInstagramModuleOptions {
	accessToken: string
	pageId: string
	apiVersion: string
}

export const INSTAGRAM_OPTIONS = Symbol('INSTAGRAM_OPTIONS')
export const INSTAGRAM_SERVICES = Symbol('INSTAGRAM_SERVICES')
