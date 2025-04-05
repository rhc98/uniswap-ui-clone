import { useCallback, useMemo } from 'react'

import BigNumber from 'bignumber.js'

import { useSwapStore } from '@/app/_state/swap'

import { IToken } from './useTokenList'

export function useSwapEstimate() {
	const { inputToken, outputToken, updateInput } = useSwapStore()
	const handleRoute = useCallback(
		(
			isInput0: boolean,
			value: BigNumber,
			tokens?: { inputToken: IToken; outputToken: IToken },
		) => {
			const token0 = tokens?.inputToken ?? inputToken
			const token1 = tokens?.outputToken ?? outputToken

			if (!token0.address || !token1.address || !value) {
				return '0'
			}

			const routeFrom = isInput0 ? token0 : token1
			const routeTo = isInput0 ? token1 : token0

			const inputUSD = value.multipliedBy(routeFrom.price)
			const outputAmount = inputUSD.dividedBy(routeTo.price).toString()

			updateInput(!isInput0, outputAmount)
		},
		[inputToken, outputToken],
	)

	return {
		handleRoute,
	}
}
