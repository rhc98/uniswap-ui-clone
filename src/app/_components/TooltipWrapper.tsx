import { ReactNode } from 'react'

import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from '@/design-system/Tooltip'
import { TooltipIcon } from '@/design-system/icons/Tooltip'

export function TooltipWrapper({
	trigger,
	content,
	classNames,
}: {
	trigger?: ReactNode
	content?: ReactNode | string
	classNames?: string
}) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				{trigger || (
					<TooltipIcon width={16} height={16} color="rgba(19, 19, 19, 0.35)" />
				)}
			</TooltipTrigger>
			<TooltipContent className={classNames ?? ''}>{content}</TooltipContent>
		</Tooltip>
	)
}
