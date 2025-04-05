import { ComponentProps } from 'react'

export function PopularTokenIcon(props: ComponentProps<'svg'>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
			<polyline points="17 6 23 6 23 12"></polyline>
		</svg>
	)
}
