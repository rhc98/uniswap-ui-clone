import { useCallback } from 'react'

import Link from 'next/link'

import {
	NavigationMenuItem,
	NavigationMenuTrigger,
	NavigationMenuContent,
} from '@/design-system/NavigationMenu'
import Typography from '@/design-system/Typography'

interface IProps {
	value: string
	title: string
	enabled: boolean
	links: {
		text: string
		link: string
		icon?: string | Element
	}[]
}

export function SiteMenu({ value, title, enabled, links }: IProps) {
	const handleLink = useCallback((e: MouseEvent) => {
		alert('링크 클릭')
		e.preventDefault()
	}, [])

	return (
		<NavigationMenuItem value={value}>
			<NavigationMenuTrigger
				className="mx-2 cursor-pointer p-0 hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent"
				showIcon={false}
			>
				<Typography size={18} textColor={enabled ? 'neutral1' : 'neutral2'}>
					{title}
				</Typography>
			</NavigationMenuTrigger>
			<NavigationMenuContent className="border-surface2 flex w-[160px] flex-col gap-0.5 rounded-2xl border-[1px] border-solid p-1">
				{links.map((item) => {
					return (
						<Link
							key={item.link}
							href={item.link}
							onClick={handleLink}
							className="bg-surface2 hover:bg-surface3 flex h-[48px] w-[160px] items-center gap-3 rounded-xl px-3"
						>
							{item.icon && <div>{item.icon}</div>}
							<Typography weight="bold" textColor="neutral2" size={16}>
								{item.text}
							</Typography>
						</Link>
					)
				})}
			</NavigationMenuContent>
		</NavigationMenuItem>
	)
}
