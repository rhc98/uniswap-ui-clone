import { useCallback, useMemo, useRef, useState } from 'react'

import { TooltipWrapper } from '@/app/_components/TooltipWrapper'
import { useSwapStore, initialState } from '@/app/_state/swap'
import { cn } from '@/app/_utils'
import { Button } from '@/design-system/Button'
import { Input } from '@/design-system/Input'
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@/design-system/Popover'
import Typography from '@/design-system/Typography'
import { ArrowRightIcon } from '@/design-system/icons/ArrowRight'
import { SettingIcon } from '@/design-system/icons/Setting'

export function SwapSetting() {
	const { deadline, setDeadline, slippage, setSlippage } = useSwapStore()

	const [focused, setFocused] = useState(false)
	const isDefaultSlippage = useMemo(() => {
		return slippage === initialState.slippage
	}, [slippage])
	const autoSlippage = useMemo(() => {
		return !focused && isDefaultSlippage
	}, [focused, isDefaultSlippage])

	const slippageInputRef = useRef<HTMLInputElement>(null)
	const onInputSlippage = useCallback((value: number) => {
		setSlippage(Math.max(0, value))
	}, [])

	const deadlineInputRef = useRef<HTMLInputElement>(null)
	const onInputDeadline = useCallback((value: number) => {
		setDeadline(Math.max(0, value))
	}, [])

	return (
		<div>
			<Popover>
				<PopoverTrigger asChild>
					<div
						className={cn(
							'flex h-8 items-center justify-center rounded-full px-2',
							!isDefaultSlippage &&
								'bg-surface3 gap-1 transition-all duration-200',
						)}
					>
						{!isDefaultSlippage && (
							<Typography textColor="neutral2" weight="medium">
								<strong>{slippage}</strong>%
							</Typography>
						)}
						<Button variant="transparent" className="h-5 w-5 p-0">
							<SettingIcon
								width={20}
								height={20}
								fill="var(--color-neutral2)"
							/>
						</Button>
					</div>
				</PopoverTrigger>

				<PopoverContent tabIndex={-1} asChild align="end">
					<section
						className={cn(
							'mt-3 mr-2.5 w-[320px] !rounded-3xl border-[1px] border-solid border-[rgba(34,34,34,0.05)] bg-white p-3 shadow-[0px_0px_6px_0_rgba(0,0,0,0.06)]',
						)}
					>
						<div className="flex flex-col gap-2">
							<div className="flex h-12 items-center justify-between">
								<div className="flex items-center gap-1">
									<Typography size={16} weight="medium" textColor="neutral1">
										최대 슬리피지
									</Typography>
									<TooltipWrapper
										classNames="max-w-[240px]"
										content={
											<div className="flex flex-col gap-2">
												<Typography
													className="break-all whitespace-normal"
													size={12}
													textColor="neutral2"
													weight="medium"
												>
													가격이 슬리피지 비율 이상으로 변동하면 트랜잭션이
													취소됩니다.
												</Typography>
											</div>
										}
									/>
								</div>

								<div
									onClick={() => slippageInputRef?.current?.focus()}
									className="border-surface3 hover:border-surface3Hovered flex cursor-pointer items-center gap-2 rounded-full border-[1px] border-solid px-1 py-0.5 active:opacity-75"
								>
									<Button
										onClick={() => setSlippage(initialState.slippage)}
										className={cn(
											'h-auto rounded-full px-2 py-0',
											autoSlippage ? 'bg-accent2' : 'bg-surface3',
										)}
									>
										<Typography
											textColor={autoSlippage ? 'accent1' : 'neutral2'}
											weight="bold"
										>
											자동
										</Typography>
									</Button>

									<div className="flex items-center gap-1">
										<Input
											ref={slippageInputRef}
											type="number"
											className="h-auto w-8 p-0 text-right"
											value={slippage}
											onChange={(e) => onInputSlippage(Number(e.target.value))}
											onFocus={() => setFocused(true)}
											onBlur={() => setFocused(false)}
										/>
										<Typography size={16} weight="medium" textColor="neutral2">
											%
										</Typography>
									</div>
								</div>
							</div>
							<div className="flex h-12 items-center justify-between">
								<div className="flex items-center gap-1">
									<Typography size={16} weight="medium" textColor="neutral1">
										스왑 기한
									</Typography>
									<TooltipWrapper
										classNames="max-w-[240px]"
										content={
											<div className="flex flex-col gap-2">
												<Typography
													className="break-all whitespace-normal"
													size={12}
													textColor="neutral2"
													weight="medium"
												>
													이 기간 이상 보류 중인 경우 트랜잭션이 취소됩니다.
												</Typography>
											</div>
										}
									/>
								</div>

								<div
									onClick={() => deadlineInputRef?.current?.focus()}
									className="border-surface3 hover:border-surface3Hovered flex cursor-pointer items-center gap-1 rounded-full border-[1px] border-solid p-1 pr-2.5 active:opacity-75"
								>
									<div>
										<Input
											ref={deadlineInputRef}
											type="number"
											className="h-auto w-11 p-0 text-right"
											value={Math.floor(deadline / 60)}
											onChange={(e) =>
												onInputDeadline(Number(e.target.value) * 60)
											}
										/>
									</div>
									<Typography size={16} weight="medium" textColor="neutral2">
										minutes
									</Typography>
								</div>
							</div>
							<div className="flex h-12 items-center justify-between">
								<Typography size={16} weight="medium" textColor="neutral1">
									거래 옵션
								</Typography>
								<div className="hover:text-neutral1Hovered flex cursor-pointer gap-1 active:opacity-75">
									<Typography size={16} weight="medium" textColor="neutral1">
										기본
									</Typography>
									<ArrowRightIcon
										width={24}
										height={24}
										stroke="rgba(19,19,19,0.35)"
									/>
								</div>
							</div>
						</div>
					</section>
				</PopoverContent>
			</Popover>
		</div>
	)
}
