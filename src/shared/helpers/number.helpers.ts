export const formatPrice = (price: number) => {
	return Number(Math.round(price * 100) / 100)
}
