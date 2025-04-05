import { useCallback, useMemo } from 'react'

import BN, { BigNumber } from 'bignumber.js'
import { ChevronDownIcon } from 'lucide-react'

import { IToken } from '@/app/_hooks/useTokenList'
import { SelectTokenModal } from '@/app/_modal/SelectTokenModal'
import { cn } from '@/app/_utils'
import { Input } from '@/design-system/Input'
import Typography from '@/design-system/Typography'

interface IProps {
	token?: IToken
	isInput0: boolean
	value: string
	onInput: (isInput0: boolean, amount: string) => void
	onSelect: (isInput0: boolean, token: IToken) => void
}

export function SwapInputField({
	token,
	isInput0,
	value,
	onInput,
	onSelect,
}: IProps) {
	const selected = useMemo(() => {
		return !!token?.address
	}, [token])
	const valueUSD = useMemo(() => {
		return !value
			? '0'
			: new BigNumber(value).multipliedBy(token?.price ?? 0).toFormat(2)
	}, [token, value])

	return (
		<div
			className={cn(
				'rounded-[20px] border-[1px] border-solid p-4 active:opacity-75',
				isInput0
					? 'border-[#22222212] pb-6'
					: 'bg-surface2 hover:bg-surface2Hovered border-transparent',
			)}
		>
			<Typography size={16} textColor="neutral2">
				{isInput0 ? '팔기' : '구매'}
			</Typography>

			<div className="flex items-center justify-between py-2.5">
				<div>
					<Input
						className="placeholder:text-neutral3 border-none p-0 !text-4xl font-medium shadow-none"
						value={value}
						onChange={(e) => onInput(isInput0, e.target.value)}
					/>
				</div>

				<SelectTokenModal
					trigger={
						<div
							className={cn(
								'border-surface3Solid flex h-9 w-auto shrink-0 cursor-pointer items-center gap-1.5 rounded-full border-[1px] border-solid px-2 shadow-[0px_0px_10px_rgba(34,_34,_34,_0.04)] active:scale-[0.98] active:opacity-75',
								!selected && 'bg-accent1 border-transparent',
							)}
						>
							{selected && (
								<img
									width={28}
									height={28}
									src={token.icon}
									alt={token.symbol}
								/>
							)}
							<Typography
								textColor={!selected ? 'white' : 'default'}
								size={16}
								weight="semibold"
							>
								{!selected ? '토큰 선택' : token.symbol}
							</Typography>
							<div className="mr-[-2px] ml-[-2px] h-6 w-6">
								<ChevronDownIcon
									color={selected ? 'var(--color-neutral2)' : 'white'}
									size={24}
									aria-hidden="true"
								/>
							</div>
						</div>
					}
					onSelect={(token: IToken) => onSelect(isInput0, token)}
				/>
			</div>

			<div className="h-5">
				<Typography textColor="neutral2">US${valueUSD}</Typography>
			</div>
		</div>
	)
}
