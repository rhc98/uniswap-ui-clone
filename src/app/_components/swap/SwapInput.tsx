import { useCallback, useEffect, useMemo } from 'react'

import BigNumber from 'bignumber.js'

import { useSwapEstimate } from '@/app/_hooks/useSwapEstimate'
import { IToken, useTokenList } from '@/app/_hooks/useTokenList'
import { useWalletProvider } from '@/app/_providers/WalletProvider'
import { useSwapStore } from '@/app/_state/swap'
import { Button } from '@/design-system/Button'
import Typography from '@/design-system/Typography'

import { SwapInputField } from './SwapInputField'

export function SwapInput() {
	const {
		inputToken,
		inputAmount,
		outputToken,
		outputAmount,
		onSelectToken,
		switchToken,
		updateInput,
		inputTarget,
		setInputTarget,
	} = useSwapStore()

	const { tokens, isFetched } = useTokenList()
	const initSelectedToken = useCallback(() => {
		onSelectToken(true, tokens[0])
	}, [tokens])

	const { handleRoute } = useSwapEstimate()
	const handleInput = useCallback(
		(isInput0: boolean, value: string) => {
			updateInput(isInput0, value)

			if (value.endsWith('.') || value.includes('-')) {
				return
			}

			handleRoute(isInput0, new BigNumber(value || 0))
		},
		[handleRoute],
	)
	const handleSelect = useCallback(
		(isInput0: boolean, token: IToken) => {
			onSelectToken(isInput0, token)

			const amount0 = new BigNumber(inputAmount)
			const amount1 = new BigNumber(outputAmount)

			const needNewRoute =
				(isInput0 && amount1.comparedTo(0) === 1) ||
				(!isInput0 && amount0.comparedTo(0) === 1)

			if (needNewRoute) {
				const tokens = {
					inputToken: isInput0 ? token : inputToken,
					outputToken: isInput0 ? outputToken : token,
				}

				handleRoute(!isInput0, isInput0 ? amount1 : amount0, tokens)
			}
		},
		[inputAmount, outputAmount, inputToken, outputToken],
	)

	useEffect(() => {
		if (isFetched && tokens.length > 0) {
			initSelectedToken()
		}
	}, [tokens, isFetched])

	const { setOpenSelectWallet } = useWalletProvider()

	return (
		<section className="mt-1 flex flex-col gap-1">
			<div className="relative flex flex-col gap-1">
				<SwapInputField
					target={0}
					onFocus={setInputTarget}
					isActive={inputTarget === 0}
					token={inputToken}
					value={inputAmount}
					onInput={handleInput}
					onSelect={handleSelect}
				/>

				<Button
					onClick={switchToken}
					className="bg-surface2 hover:bg-surface2Hovered absolute top-[calc(50%-22px)] left-[calc(50%-26px)] z-[2] flex h-[52px] w-[52px] items-center justify-center rounded-2xl border-4 border-solid border-white p-2 active:scale-[0.98] active:opacity-75"
				>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						strokeWidth="2"
						style={{
							width: '24px',
							height: '24px',
							color: 'rgb(34, 34, 34)',
							transform: 'rotateZ(0deg)',
						}}
					>
						<path
							d="M12 5V19"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						></path>
						<path
							d="M19 12L12 19L5 12"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						></path>
					</svg>
				</Button>

				<SwapInputField
					target={1}
					isActive={inputTarget === 1}
					onFocus={setInputTarget}
					token={outputToken}
					value={outputAmount}
					onInput={handleInput}
					onSelect={handleSelect}
				/>
			</div>

			<div className="w-full pt-0.5">
				<Button
					variant="pinkLight"
					className="h-auto w-full rounded-[20px] px-5 py-3.5"
					onClick={setOpenSelectWallet}
				>
					<Typography size={18} weight="bold" textColor="accent1">
						지갑 연결
					</Typography>
				</Button>
			</div>
		</section>
	)
}
