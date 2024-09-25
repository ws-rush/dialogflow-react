import { createContext, useContext } from 'react'

export type DialogContextType = {
    push: (Component: () => JSX.Element, props?: {}) => Promise<any>
    open: (dialogId: string, props?: {}) => Promise<any>
}

export const DialogContext = createContext<DialogContextType>({
    push: async () => null,
    open: async () => null
})

export const useDialog = () => useContext(DialogContext)