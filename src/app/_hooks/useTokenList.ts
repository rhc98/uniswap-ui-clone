import { useQuery } from '@tanstack/react-query'

export interface IToken {
	name: string
	address: string
	symbol: string
	decimal: number
	price: number
	icon: string
}

const mockTokens: IToken[] = [
	{
		name: 'Ethereum',
		address: '0x0000000000000000000000000000000000000000',
		symbol: 'ETH',
		decimal: 18,
		price: 1000,
		icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
	},
	{
		name: 'Wrapped Bitcoin',
		address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
		symbol: 'WBTC',
		decimal: 8,
		price: 10000,
		icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3717.png',
	},
	{
		name: 'USD Coin',
		address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
		symbol: 'USDC',
		decimal: 18,
		price: 1,
		icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
	},
]

export function useTokenList() {
	const {
		data: tokens,
		isLoading,
		isFetched,
	} = useQuery({
		queryKey: ['tokens'],
		queryFn: async () => {
			return mockTokens
		},
	})

	return {
		tokens: tokens ?? [],
		isLoading,
		isFetched,
	}
}
