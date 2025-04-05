'use client'

import { useMemo } from 'react'

import Image from 'next/image'

import { SiteMenu } from '@/app/_components/gnb/SiteMenu'
import { SiteSetting } from '@/app/_components/gnb/SiteSetting'
import { WalletOptions } from '@/app/_components/gnb/WalletOptions'
import { SearchBar } from '@/app/_components/token/SearchBar'
import { Button } from '@/design-system/Button'
import {
	NavigationMenu,
	NavigationMenuList,
} from '@/design-system/NavigationMenu'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/design-system/Popover'
import { ArrowChangeDownIcon } from '@/design-system/icons/ArrowChangeDown'
import { CreditCardIcon } from '@/design-system/icons/CreditCard'
import { LimitIcon } from '@/design-system/icons/Limit'
import { MoreHorizontalIcon } from '@/design-system/icons/MoreHorizontal'
import { SendIcon } from '@/design-system/icons/Send'
import { SwapV2Icon } from '@/design-system/icons/Swap'

export function GlobalNav() {
	const tradeMenu = useMemo(() => {
		return [
			{
				text: '스왑',
				link: '/swap',
				icon: <SwapV2Icon />,
			},
			{
				text: '지정가 주문',
				link: '/limit',
				icon: <LimitIcon />,
			},
			{
				text: '보내기',
				link: '/send',
				icon: <SendIcon />,
			},
			{
				text: '구입하다',
				link: '/buy',
				icon: <CreditCardIcon fill="#9B9B9B" />,
			},
		]
	}, [])

	const exploreMenu = useMemo(() => {
		return [
			{
				text: '토큰',
				link: '/explore/tokens',
			},
			{
				text: '플',
				link: '/explore/pools',
			},
			{
				text: '트랜잭션',
				link: '/explore/transacitons',
			},
		]
	}, [])

	const poolMenu = useMemo(() => {
		return [
			{
				text: '포지션 보기',
				link: '/positions',
			},
			{
				text: '포지션 생성',
				link: '/positions/create',
			},
		]
	}, [])

	return (
		<header className="flex h-[72px] w-full items-center justify-between px-3">
			<nav className="flex w-full items-center gap-3">
				<div className="relative flex cursor-pointer items-center gap-1 p-2">
					<Image width={20} height={20} src="/img/logo.svg" alt="logo" />
					<ArrowChangeDownIcon
						className="text-neutral2"
						width="12px"
						height="12px"
					/>
				</div>

				<NavigationMenu viewport={false}>
					<NavigationMenuList className="gap-3">
						<SiteMenu
							value="trade"
							title="거래"
							enabled={true}
							links={tradeMenu}
						/>
						<SiteMenu
							value="explore"
							title="탐색"
							enabled={false}
							links={exploreMenu}
						/>
						<SiteMenu
							value="pool"
							title="풀"
							enabled={false}
							links={poolMenu}
						/>
					</NavigationMenuList>
				</NavigationMenu>
			</nav>

			<SearchBar />

			<div className="flex w-full items-center justify-end gap-3">
				<Popover>
					<PopoverTrigger asChild>
						<div className="hover:bg-surface1Hovered data-[state=open]:bg-surface1Hovered flex h-10 w-10 cursor-pointer items-center justify-center rounded-full active:opacity-75">
							<MoreHorizontalIcon width={20} height={20} />
						</div>
					</PopoverTrigger>

					<PopoverContent
						className="mt-3 mr-2.5 w-[320px] border-none p-0 shadow-none"
						tabIndex={-1}
					>
						<SiteSetting />
					</PopoverContent>
				</Popover>

				<Popover>
					<PopoverTrigger asChild>
						<Button variant="pinkLight" rounded={12}>
							연결
						</Button>
					</PopoverTrigger>

					<PopoverContent
						className="mt-3 mr-2.5 w-[360px] rounded-[20px] border-none p-0 shadow-none"
						tabIndex={-1}
					>
						<WalletOptions />
					</PopoverContent>
				</Popover>
			</div>
		</header>
	)
}
