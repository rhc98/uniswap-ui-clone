'use client'

import { useMemo } from 'react'

import BigNumber from 'bignumber.js'

import { SwapEstimated } from '@/app/_components/swap/SwapEstimated'
import { SwapInput } from '@/app/_components/swap/SwapInput'
import { SwapTab } from '@/app/_components/swap/SwapTab'
import { useSwapStore } from '@/app/_state/swap'
import Typography from '@/design-system/Typography'

export function SwapForm() {
	const { inputAmount, outputAmount } = useSwapStore()
	const isValidRoute = useMemo(() => {
		return (
			new BigNumber(inputAmount).comparedTo(0) > 0 &&
			new BigNumber(outputAmount).comparedTo(0) > 0
		)
	}, [inputAmount, outputAmount])

	return (
		<div>
			<section className="mx-auto w-full max-w-[480px] px-2 pt-[60px] pb-10">
				<SwapTab />
				<SwapInput />

				{isValidRoute && (
					<section className="mx-auto w-full max-w-[480px] pt-3">
						<SwapEstimated />
					</section>
				)}
			</section>

			<section className="mx-auto mt-5 w-full max-w-[480px]">
				<div className="flex cursor-pointer justify-center opacity-60 hover:opacity-100">
					<Typography size={11} textColor="neutral1">
						Uniswap 사용 가능 국가:
					</Typography>
					<a className="hover:opacity-60">
						<Typography size={11} textColor="accent1">
							영어
						</Typography>
					</a>
				</div>
			</section>
		</div>
	)
}
