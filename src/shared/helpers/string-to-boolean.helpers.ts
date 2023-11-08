export const stringToBoolean = (value: string) => {
	if (value === 'true') return true
	if (value === 'false') return false
}

export function camelize(str) {
	return str
		.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
			return index === 0 ? word.toLowerCase() : word.toUpperCase()
		})
		.replace(/\s+/g, '')
}
