import { ComponentProps } from 'react'

export function ArrowRightIcon(props: ComponentProps<'svg'>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke={props.fill || '#222222'}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<polyline points="9 18 15 12 9 6"></polyline>
		</svg>
	)
}
