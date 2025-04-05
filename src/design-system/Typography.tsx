import React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/app/_utils'

export const typographyVariants = cva('', {
	variants: {
		variant: {
			h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg: text-5xl',
			h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
			h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
			h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
			p: 'leading-5',
			span: '',
		},
		size: {
			10: 'text-[10px]',
			11: 'text-[11px]',
			12: 'text-[12px]',
			14: 'text-[14px]',
			16: 'text-[16px]',
			18: 'text-[18px]',
			20: 'text-[20px]',
			24: 'text-[24px]',
			32: 'text-[32px]',
			40: 'text-[40px]',
		},
		textColor: {
			default: 'text-black',
			white: 'text-white',
			accent1: 'text-accent1',
			neutral1: 'text-neutral1',
			neutral2: 'text-neutral2',
			neutral3: 'text-neutral3',
		},
		weight: {
			normal: '',
			medium: 'font-[500]',
			semibold: 'font-[600]',
			bold: 'font-bold',
		},
		affects: {
			default: '',
			removePMargin: '[&:not(:first-child)]:mt-0',
		},
	},
	defaultVariants: {
		variant: 'p',
		size: 14,
		textColor: 'default',
		weight: 'normal',
		affects: 'default',
	},
})

export interface TypographyProps
	extends React.HTMLAttributes<HTMLParagraphElement>,
		VariantProps<typeof typographyVariants> {}

const Typography = React.forwardRef<HTMLParagraphElement, TypographyProps>(
	({ className, variant, size, textColor, weight, affects, ...props }, ref) => {
		const Comp = variant || 'p'
		return (
			<Comp
				className={cn(
					typographyVariants({
						variant,
						size,
						textColor,
						weight,
						affects,
						className,
					}),
				)}
				ref={ref}
				{...props}
			/>
		)
	},
)
Typography.displayName = 'P'

export default Typography
