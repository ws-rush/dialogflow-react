import { createContext, useContext } from 'react'

export type DialogContextType = {
    close: (result: any) => void
    open: (Component: () => JSX.Element, props?: {}) => Promise<any>
}

export const DialogContext = createContext<DialogContextType>({
    close: () => null,
    open: async () => null
})

export const useDialog = () => useContext(DialogContext)