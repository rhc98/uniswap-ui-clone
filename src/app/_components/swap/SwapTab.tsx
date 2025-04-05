import { useState, useMemo } from 'react'

import { SwapSetting } from '@/app/_components/swap/SwapSetting'
import { cn } from '@/app/_utils'
import { Button } from '@/design-system/Button'
import { Tabs, TabsList, TabsTrigger } from '@/design-system/Tabs'
import Typography from '@/design-system/Typography'
import { SettingIcon } from '@/design-system/icons/Setting'

export function SwapTab() {
	const swapTabs = useMemo(() => {
		return [
			{ value: 'swap', title: '스왑', link: '/swap' },
			{ value: 'limit', title: '지정가 주문', link: '/limit' },
			{ value: 'buy', title: '보내기', link: '/buy' },
			{ value: 'send', title: '구입하기', link: '/send' },
		]
	}, [])

	const [currentTab, setCurrentTab] = useState<string>('swap')

	return (
		<div className="flex items-center justify-between">
			<div>
				<Tabs value={currentTab} onValueChange={setCurrentTab}>
					<TabsList className="h-10 gap-3 rounded-full border-none bg-transparent px-2 py-1">
						{swapTabs.map((tab) => {
							return (
								<TabsTrigger
									value={tab.value}
									key={tab.value}
									className="h-8 cursor-pointer rounded-full px-3 py-2 !shadow-none data-[state=active]:bg-[#2222220f]"
								>
									<Typography
										textColor="neutral2"
										weight="bold"
										className={cn(
											'hover:font-bold',
											tab.value === currentTab && 'text-neutral1',
										)}
									>
										{tab.title}
									</Typography>
								</TabsTrigger>
							)
						})}
					</TabsList>
				</Tabs>
			</div>

			<SwapSetting />
		</div>
	)
}
