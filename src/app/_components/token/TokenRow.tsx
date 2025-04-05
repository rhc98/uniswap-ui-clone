import { IToken } from '@/app/_hooks/useTokenList'
import { cn, getEllipsisAddress } from '@/app/_utils'
import Typography from '@/design-system/Typography'

interface IProps {
	token: IToken
	place: 'modal' | 'gnb'
	onSelect: () => void
}

export function TokenRow({ token, place, onSelect }: IProps) {
	return (
		<div
			className={cn(
				'flex w-full cursor-pointer items-center justify-between px-4 py-2',
				place === 'modal' && 'hover:bg-surface2 py-3 active:opacity-75',
			)}
			onClick={onSelect}
		>
			<div className="flex w-full items-center gap-2">
				<div className="h-9 w-9 rounded-full">
					<img
						src={token.icon}
						alt={token.symbol}
						className="h-full w-full rounded-full"
					/>
				</div>

				<div>
					<Typography size={16}>{token.name}</Typography>
					<div className="flex gap-1">
						<Typography textColor="neutral2">{token.symbol}</Typography>
						<Typography className="text-[#cecece]">
							{getEllipsisAddress(token.address)}
						</Typography>
					</div>
				</div>

				{place === 'gnb' && (
					<div className="ml-auto text-right">
						<Typography className="mb-1">
							$ {token.price.toLocaleString()}
						</Typography>
						<Typography className="text-[#40b66b]">0.00%</Typography>
					</div>
				)}
			</div>
		</div>
	)
}
