import { ReactElement, useCallback, useState } from 'react'

import { SearchBar } from '@/app/_components/token/SearchBar'
import { IToken } from '@/app/_hooks/useTokenList'
import {
	Dialog,
	DialogTitle,
	DialogTrigger,
	DialogContent,
	DialogHeader,
} from '@/design-system/Dialog'

interface IProps {
	trigger: ReactElement
	onSelect: (token: IToken) => void
}

export function SelectTokenModal({ trigger, onSelect }: IProps) {
	const [show, setShow] = useState(false)
	const handleSelectToken = useCallback(
		(token: IToken) => {
			setShow(false)
			onSelect(token)
		},
		[onSelect],
	)

	return (
		<Dialog open={show} onOpenChange={setShow}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className="overflow-hidden">
				<DialogHeader>
					<DialogTitle>토큰을 선택하세요</DialogTitle>
				</DialogHeader>

				<SearchBar place="modal" onSelect={handleSelectToken} />
			</DialogContent>
		</Dialog>
	)
}
