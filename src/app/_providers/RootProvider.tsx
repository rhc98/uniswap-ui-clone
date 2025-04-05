'use client'

import { ReactNode } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import WalletProvider from '@/app/_providers/WalletProvider'

const queryClient = new QueryClient()

export default function RootProvider({ children }: { children: ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<WalletProvider>{children}</WalletProvider>
		</QueryClientProvider>
	)
}
