import { ReactNode, useMemo } from 'react'

import { cn } from '@/app/_utils'
import Typography from '@/design-system/Typography'
import { ExpandIcon } from '@/design-system/icons/Expand'
import { ScanQrIcon } from '@/design-system/icons/ScanQr'

interface IWallet {
	id: string
	name: string
	image: string | ReactNode
	desc?: string
	status: 'detected' | 'latest' | ''
}

function WalletCard({
	id,
	name,
	image,
	desc,
	status,
	classNames,
}: IWallet & { classNames?: string | string[] }) {
	return (
		<div
			className={cn(
				'bg-surface2 relative flex h-[76px] max-h-[72px] cursor-pointer items-center justify-between gap-3 overflow-hidden p-[18px] hover:bg-[#22222212]',
				classNames,
				id === 'uniswap' && 'bg-cover hover:bg-[#22222212] hover:opacity-50',
			)}
			style={{
				backgroundImage:
					id === 'uniswap' ? 'url(/img/wallet/background_connector.png)' : '',
			}}
		>
			<div className="h-10 w-10 rounded-[12px]">
				{typeof image === 'string' ? (
					<img src={image} alt={name} className="rounded-[12px]" />
				) : (
					image
				)}
			</div>

			<div className="px-2">
				<Typography
					textColor={id === 'uniswap' ? 'white' : 'neutral1'}
					size={16}
					weight={id === 'uniswap' ? 'bold' : 'medium'}
					className="leading-[1]"
				>
					{name}
				</Typography>
				{desc && (
					<Typography
						size={12}
						textColor={id === 'uniswap' ? 'white' : 'neutral2'}
					>
						{desc}
					</Typography>
				)}
			</div>

			<div className="ml-auto">
				<Typography
					size={12}
					textColor={status === 'detected' ? 'neutral2' : 'accent1'}
					weight="medium"
				>
					{status === 'detected' ? '감지됨' : status === 'latest' ? '최근' : ''}
				</Typography>
			</div>
		</div>
	)
}

export function WalletOptions() {
	const uniswapWalletGuide: IWallet[] = useMemo(() => {
		return [
			{
				id: 'uniswap',
				name: 'Uniswap 지갑 받기',
				desc: 'iOS, Android, Chrome에서 사용 가능',
				image: '/img/wallet/uniswap.png',
				status: '',
			},
			{
				id: 'uniswapMobile',
				name: 'Uniswap 모바일',
				desc: '연결하려면 QR 코드를 스캔하세요.',
				image: (
					<div className="p-1.5">
						<ScanQrIcon color="#fc72ff" />
					</div>
				),
				status: '',
			},
		]
	}, [])

	const walletList: IWallet[] = useMemo(() => {
		return [
			{
				id: 'walletConnect',
				name: 'WalletConnect',
				image: '/img/wallet/walletconnect.svg',
				status: 'latest',
			},
			{
				id: 'phantom',
				name: 'Phantom',
				image: '/img/wallet/phantom.png',
				status: 'detected',
			},
			{
				id: 'metamask',
				name: 'Metamask',
				image: '/img/wallet/metamask.svg',
				status: 'detected',
			},
			{
				id: 'nightly',
				name: 'Nightly',
				image: '/img/wallet/nightly.svg',
				status: 'detected',
			},
			{
				id: 'coinbase',
				name: 'Coinbase Wallet',
				image: '/img/wallet/coinbase.svg',
				status: '',
			},
		]
	}, [])

	return (
		<section className="border-surface2 flex w-full flex-col gap-4 rounded-[20px] border-[1px] border-solid px-5 py-4">
			<div>
				<Typography size={16} weight="medium">
					지갑을 연결하세요
				</Typography>
			</div>

			<div className="flex flex-col gap-2">
				{uniswapWalletGuide.map((guide, i) => {
					return (
						<WalletCard key={guide.id} {...guide} classNames="rounded-[18px]" />
					)
				})}
			</div>

			<div className="flex items-center py-2">
				<div className="bg-surface3 h-[1px] w-full" />
				<div className="mx-[18px] flex min-w-[80px] items-center">
					<Typography weight="medium" textColor="neutral2">
						기타 지갑
					</Typography>
					<ExpandIcon width={22} height={22} />
				</div>
				<div className="bg-surface3 h-[1px] w-full" />
			</div>

			<div className="flex flex-col gap-0.5">
				{walletList.map((wallet, i) => {
					return (
						<WalletCard
							key={wallet.id}
							{...wallet}
							classNames={
								i === 0
									? 'rounded-tl-[18px] rounded-tr-[18px]'
									: i === walletList.length - 1
										? 'rounded-bl-[18px] rounded-br-[18px]'
										: ''
							}
						/>
					)
				})}
			</div>
		</section>
	)
}
