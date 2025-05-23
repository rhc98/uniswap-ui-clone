import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getEllipsisAddress(address: string) {
	if (!address) return ''
	return `${address.slice(0, 6)}...${address.slice(-4)}`
}
