import { Geist, Geist_Mono } from 'next/font/google'

import { GlobalNav } from '@/app/_components/gnb'

import type { Metadata } from 'next'

import RootProvider from '@/app/_providers/RootProvider'

import './_style/globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Buy, sell & trade Ethereum and other top tokens on Uniswap',
	description:
		'Swapping made simple. Buy and sell crypto on Ethereum, Base, Arbitrum, Polygon, and more. Trusted by millions.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<head>
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"
				/>
				<link rel="icon" type="image/png" href="/favicon.png" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<RootProvider>
					<div id="root">
						<GlobalNav />
						{children}
					</div>
				</RootProvider>
			</body>
		</html>
	)
}
