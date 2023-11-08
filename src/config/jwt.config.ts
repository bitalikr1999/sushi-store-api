import { getEnv } from 'src/shared'

export const getJwtConfig = () => {
	return { jwtKey: getEnv('JWT_KEY'), payloadKey: getEnv('JWT_PAYLOAD_KEY') }
}
