import BigNumber from 'bignumber.js'
import { create } from 'zustand'

import { IToken } from '@/app/_hooks/useTokenList'

export interface ISwapStore {
	inputToken: IToken
	inputAmount: string
	outputToken: IToken
	outputAmount: string
	onSelectToken: (isInput0: boolean, token: IToken) => void
	switchToken: () => void
	updateInput: (isInput0: boolean, value: string) => void
	slippage: number
	setSlippage: (newValue: number) => void
	deadline: number
	setDeadline: (newValue: number) => void
}

export const initialState = {
	inputToken: {} as IToken,
	inputAmount: '',
	outputToken: {} as IToken,
	outputAmount: '',
	slippage: 0.5,
	deadline: 60,
}

export const useSwapStore = create<ISwapStore>((set, get) => ({
	...initialState,
	onSelectToken: (isInput0, token) => {
		set({ [isInput0 ? 'inputToken' : 'outputToken']: token })
	},
	switchToken: () => {
		const prevState = get()

		set({
			inputToken: prevState.outputToken,
			inputAmount: prevState.outputAmount,
			outputToken: prevState.inputToken,
			outputAmount: prevState.inputAmount,
		})
	},
	updateInput: (isInput0, value) => {
		set({
			[isInput0 ? 'inputAmount' : 'outputAmount']: value,
		})
	},
	setSlippage: (newValue) => set({ slippage: newValue }),
	setDeadline: (newValue) => set({ deadline: newValue }),
}))
