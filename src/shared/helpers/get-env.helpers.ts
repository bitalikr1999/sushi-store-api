const testEnv = {
	AUTO_SEED_ENABLED: true,
}

const isTest = process.env.NODE_ENV === 'test'

export const getEnv = (name: string, optional = false): string => {
	const value = isTest ? testEnv[name] : process.env[name]

	if (!optional && (value === undefined || value === null))
		throw new Error('Not found env var: ' + name)

	return value
}
