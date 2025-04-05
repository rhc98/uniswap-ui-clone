import { useMemo, useState } from 'react'
import { Clock, Search } from 'react-feather'

import { useClickAway } from '@uidotdev/usehooks'

import { TokenRow } from '@/app/_components/token/TokenRow'
import { IToken, useTokenList } from '@/app/_hooks/useTokenList'
import { cn } from '@/app/_utils'
import { Input } from '@/design-system/Input'
import Typography from '@/design-system/Typography'
import { PopularTokenIcon } from '@/design-system/icons/PopularToken'

export function SearchBar({
	place = 'gnb',
	onSelect,
}: {
	place?: 'gnb' | 'modal'
	onSelect?: (token: IToken) => void
}) {
	const [isActiveInput, setIsActiveInput] = useState<boolean>(place === 'modal')
	const ref = useClickAway(() => {
		if (place === 'modal') {
			return
		}

		setIsActiveInput(false)
	})

	const { tokens } = useTokenList()
	const [keyword, setKeyword] = useState<string>('')

	const showResult = useMemo(() => {
		return keyword.length > 2
	}, [keyword])
	const searchedTokens = useMemo(() => {
		return tokens.filter((token) => {
			const searchKeyword = keyword.toLowerCase()
			return (
				token.name.toLowerCase().includes(searchKeyword) ||
				token.symbol.toLowerCase().includes(searchKeyword) ||
				token.address.toLowerCase().includes(searchKeyword)
			)
		})
	}, [tokens, keyword])

	return (
		<section
			ref={ref}
			className={cn(
				'w-full lg:w-[400px] lg:min-w-[400px]',
				place === 'gnb' &&
					'bg-surface2 h-[40px] rounded-[20px] border-[1px] border-solid border-[#22222212]',
				isActiveInput &&
					place === 'gnb' &&
					'rounded-br-none rounded-bl-none border-b-0 bg-white',
				place === 'modal' && 'flex flex-col gap-2',
			)}
		>
			<section className={cn(place === 'modal' && 'bg-white px-4 pt-1')}>
				<div
					className={cn(
						'flex w-full items-center justify-center gap-1 px-4 py-2',
						place === 'modal' && 'bg-surface2 h-[48px] rounded-full',
					)}
				>
					<Search
						className="shrink-0"
						width="20px"
						height="20px"
						color="var(--color-neutral2)"
					/>

					<Input
						value={keyword}
						onChange={(e) => setKeyword(e.target.value)}
						placeholder="토큰 검색"
						className="h-auto border-none py-0 text-[16px] shadow-none outline-0 placeholder:text-[16px]"
						onFocus={() => setIsActiveInput(true)}
					/>

					<div>
						<div className="text-neutral2 flex h-5 w-5 items-center justify-center rounded-[4px] bg-[#22222212] px-2 text-[12px] leading-[16px] font-[535] opacity-60 backdrop-blur-[60px] backdrop-filter">
							/
						</div>
					</div>
				</div>
			</section>

			{isActiveInput && (
				<section
					className={cn(
						'relative top-0 z-10 ml-[-1px] w-full lg:w-[400px]',
						place === 'gnb' &&
							'rounded-br-[20px] rounded-bl-[20px] border-[1px] border-t-0 border-solid border-[#22222212] bg-white',
					)}
				>
					{showResult ? (
						<div>
							{searchedTokens.map((token) => {
								return (
									<TokenRow
										key={token.address}
										token={token}
										place={place}
										onSelect={() => onSelect && onSelect(token)}
									/>
								)
							})}
						</div>
					) : (
						<div
							className={cn(
								'flex flex-col',
								place === 'gnb' ? 'gap-5' : 'gap-2',
							)}
						>
							<section
								className={cn('flex flex-col', place === 'gnb' && 'gap-2')}
							>
								<div className="flex items-center gap-2 px-4 py-1">
									<Clock
										width={20}
										height={20}
										fill={
											place === 'modal'
												? 'var(--color-neutral2)'
												: 'currentColor'
										}
										stroke="white"
									/>
									<Typography
										size={place === 'gnb' ? 14 : 16}
										textColor={place === 'gnb' ? 'neutral1' : 'neutral2'}
									>
										최근 검색어
									</Typography>
								</div>

								<div>
									<TokenRow
										token={tokens[0]}
										place={place}
										onSelect={() => onSelect && onSelect(tokens[0])}
									/>
								</div>
							</section>

							<section
								className={cn('flex flex-col', place === 'gnb' && 'gap-2')}
							>
								<div className="flex items-center gap-2 px-4 py-1">
									<PopularTokenIcon
										width={20}
										height={20}
										stroke={
											place === 'modal'
												? 'var(--color-neutral2)'
												: 'currentColor'
										}
									/>
									<Typography
										size={place === 'gnb' ? 14 : 16}
										textColor={place === 'gnb' ? 'neutral1' : 'neutral2'}
									>
										인기있는 토큰
									</Typography>
								</div>

								<div>
									<TokenRow
										token={tokens[1]}
										place={place}
										onSelect={() => onSelect && onSelect(tokens[1])}
									/>
								</div>
							</section>
						</div>
					)}
				</section>
			)}
		</section>
	)
}
