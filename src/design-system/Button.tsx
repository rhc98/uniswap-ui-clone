import * as React from 'react'

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/app/_utils'

const buttonVariants = cva(
	'cursor-pointer active:scale-[0.98] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
	{
		variants: {
			variant: {
				default: 'bg-accent1 text-white',
				pinkLight: 'bg-[rgba(255,55,199,0.08)] text-accent1 font-bold',
				transparent: 'bg-transparent',
			},
			size: {
				default: 'h-9 px-3 py-2',
				icon: 'size-9',
			},
			rounded: {
				default: 'rounded-[4px]',
				12: 'rounded-[12px]',
				20: 'rounded-[20px]',
				full: 'rounded-full',
			},
		},
		defaultVariants: {
			variant: 'default',
			rounded: 'default',
			size: 'default',
		},
	},
)

function Button({
	className,
	variant,
	size,
	rounded,
	asChild = false,
	...props
}: React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean
	}) {
	const Comp = asChild ? Slot : 'button'

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, rounded, className }))}
			{...props}
		/>
	)
}

export { Button, buttonVariants }
