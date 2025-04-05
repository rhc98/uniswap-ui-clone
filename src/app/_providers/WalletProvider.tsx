import { ReactNode, createContext, useContext, useState } from 'react'

interface WalletContextType {
	openSelectWallet: boolean
	setOpenSelectWallet: (open: boolean) => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function useWalletProvider() {
	const context = useContext(WalletContext)
	if (!context) {
		throw new Error('useWallet must be used within a WalletProvider')
	}
	return context
}

export default function WalletProvider({ children }: { children: ReactNode }) {
	const [openSelectWallet, setOpenSelectWallet] = useState(false)

	return (
		<WalletContext.Provider
			value={{
				openSelectWallet,
				setOpenSelectWallet,
			}}
		>
			{children}
		</WalletContext.Provider>
	)
}
