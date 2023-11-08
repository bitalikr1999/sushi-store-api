import { INovaPoshtaModuleOptions } from 'src/libs'
import { getEnv } from 'src/shared'

export const getNovaPoshtaConfig = (): INovaPoshtaModuleOptions => {
	return {
		apiKey: getEnv('NOVA_POSHTA_API_KEY'),
		seedEnabled: getEnv('NOVA_POSHTA_SEED_ENABLED') === 'true',
	}
}
