import { type ReactNode, useMemo, useSyncExternalStore } from 'react'
import { Manager } from './DialogManager'
import { DialogContext } from './DialogContext'

export type Props = {
  readonly children: ReactNode
  readonly manager: Manager
}

export function DialogProvider({ children, manager }: Props): JSX.Element {
  const { dialogs } = useSyncExternalStore(manager.subscribe, manager.getSnapshot, manager.getSnapshot)

  const actions = useMemo(() => ({ open: manager.open, push: manager.push }), [manager.open, manager.push])

  return (
    <DialogContext.Provider value={actions}>
        {children}
        { 
          dialogs.map((dialogEntry) => {
            const { Component, props, id } = dialogEntry;
            return <Component key={id} {...props} />;
          }) 
        }
    </DialogContext.Provider>
  )
}