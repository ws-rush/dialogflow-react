import { createContext, useContext } from 'react'

export type DialogContextType = {
    open: (Component: () => JSX.Element, props?: {}) => Promise<any>
}

export const DialogContext = createContext<DialogContextType>({
    open: async () => null
})

export const useDialog = () => useContext(DialogContext)