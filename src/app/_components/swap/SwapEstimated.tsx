import { useMemo, useState } from 'react'

import BigNumber from 'bignumber.js'
import Image from 'next/image'

import { useSwapStore } from '@/app/_state/swap'
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from '@/design-system/Accordion'
import Typography from '@/design-system/Typography'

import { TooltipWrapper } from '../TooltipWrapper'

export function SwapEstimated() {
	const { inputToken, inputAmount, outputToken, outputAmount, slippage } =
		useSwapStore()
	const [accordionValue, setAccoridionValue] = useState('')

	const [reverse, setReverse] = useState(false)
	const valueWithReverse = useMemo(() => {
		return {
			inputToken: reverse ? outputToken : inputToken,
			inputAmount: reverse
				? outputAmount
				: new BigNumber(inputAmount).dividedBy(outputAmount).toString(),
			outputToken: reverse ? inputToken : outputToken,
			outputAmount: reverse
				? inputAmount
				: new BigNumber(outputAmount).dividedBy(inputAmount).toString(),
		}
	}, [reverse, inputToken, inputAmount, outputToken, outputAmount])

	const fee = useMemo(() => {
		return new BigNumber(inputAmount)
			.multipliedBy(inputToken.price)
			.multipliedBy(0.25 / 100)
	}, [inputAmount, inputToken])
	const outputUSD = useMemo(() => {
		return new BigNumber(outputAmount).multipliedBy(outputToken.price)
	}, [outputAmount, outputToken])

	return (
		<div className="py-1">
			<Accordion
				type="single"
				collapsible
				value={accordionValue}
				onValueChange={setAccoridionValue}
			>
				<AccordionItem value="detail">
					<div className="flex justify-between px-2">
						<div
							className="flex cursor-pointer active:opacity-20"
							onClick={() => setReverse(!reverse)}
						>
							<Typography textColor="neutral2">
								1 {valueWithReverse.outputToken.symbol} ={' '}
								{valueWithReverse.inputAmount.toString()}{' '}
								{valueWithReverse.inputToken.symbol}
							</Typography>
							<Typography textColor="neutral3">
								{' '}
								(US${outputUSD.toFormat(2)})
							</Typography>
						</div>

						<AccordionTrigger />
					</div>

					<AccordionContent className="mt-2 flex flex-col gap-1.5 px-2">
						<div className="flex justify-between">
							<div className="flex items-center gap-1">
								<Typography weight="medium" textColor="neutral2">
									수수료 (0.25%)
								</Typography>
								<TooltipWrapper
									classNames="max-w-[270px]"
									content={
										<div className="flex flex-col gap-2">
											<Typography
												className="whitespace-normal"
												size={11}
												textColor="neutral2"
												weight="medium"
											>
												Uniswap에 대한 최고의 경험을 보장하기 위해 수수료가
												적용되며 이미 이 견적에 포함되어 있습니다.
											</Typography>
											<a className="text-accent1 text-[11px] font-bold">
												더 알아보기
											</a>
										</div>
									}
								/>
							</div>
							<div>
								<Typography textColor="neutral1">
									US${fee.toFormat(2)}
								</Typography>
							</div>
						</div>
						<div className="flex justify-between">
							<div className="flex items-center gap-1">
								<Typography weight="medium" textColor="neutral2">
									네트워크 비용
								</Typography>
								<TooltipWrapper
									classNames="max-w-[270px]"
									content={
										<div className="flex flex-col gap-1">
											<Typography
												className="whitespace-normal"
												size={11}
												textColor="neutral2"
												weight="medium"
											>
												이는 블록체인에서 트랜잭션을 처리하는 데 드는
												비용입니다. Uniswap은 이러한 수수료의 일부를 받지
												않습니다.
											</Typography>
											<a className="text-accent1 text-[11px] font-bold">
												더 알아보기
											</a>
										</div>
									}
								/>
							</div>
							<div className="flex items-center gap-1">
								<div className="overflow-hidden rounded-[5px]">
									<Image width={16} height={16} src="/img/eth.png" alt="eth" />
								</div>
								<Typography textColor="neutral3">US$1.31</Typography>
							</div>
						</div>
						<div className="flex justify-between">
							<div className="flex items-center gap-1">
								<Typography weight="medium" textColor="neutral2">
									주문 라우팅
								</Typography>
							</div>
							<div>
								<Typography textColor="neutral1">Uniswap API</Typography>
							</div>
						</div>
						<div className="flex justify-between">
							<div className="flex items-center gap-1">
								<Typography weight="medium" textColor="neutral2">
									가격 영향
								</Typography>
								<TooltipWrapper
									classNames="max-w-[270px]"
									content={
										<div className="flex flex-col gap-1">
											<Typography
												className="whitespace-normal"
												size={11}
												textColor="neutral2"
												weight="medium"
											>
												당신의 거래가 이 풀의 시장 가격에 미치는 영향.
											</Typography>
											<a className="text-accent1 text-[11px] font-bold">
												더 알아보기
											</a>
										</div>
									}
								/>
							</div>
							<div>
								<Typography textColor="neutral2">0%</Typography>
							</div>
						</div>
						<div className="flex justify-between">
							<div className="flex items-center gap-1">
								<Typography weight="medium" textColor="neutral2">
									최대 슬리피지
								</Typography>
								<TooltipWrapper
									classNames="max-w-[270px]"
									content={
										<div className="flex flex-col gap-2">
											<Typography
												className="whitespace-normal"
												size={11}
												textColor="neutral2"
												weight="medium"
											>
												가격이 더 이상 하락하면 트랜잭션이 취소됩니다. 다음은
												귀하가 받을 수 있는 최소 금액입니다.
											</Typography>
											<div className="bg-surface2 flex justify-between rounded-[8px] p-2">
												<Typography
													size={11}
													textColor="neutral2"
													weight="medium"
												>
													최소 수령
												</Typography>
												<Typography size={11} weight="medium">
													{new BigNumber(outputAmount)
														.multipliedBy(1 - slippage / 100)
														.toFormat(4)}{' '}
													{outputToken.symbol}
												</Typography>
											</div>
										</div>
									}
								/>
							</div>
							<div>
								<Typography textColor="neutral1">{slippage}%</Typography>
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	)
}
