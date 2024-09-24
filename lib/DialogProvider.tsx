import React, { type ReactNode, useMemo, useSyncExternalStore } from 'react'
import { Manager } from './DialogManager'
import { DialogContext } from './DialogContext'

export type Props = {
  readonly children: ReactNode
  readonly manager: Manager
}

export function DialogProvider({ children, manager }: Props): JSX.Element {
  const { dialogs } = useSyncExternalStore(manager.subscribe, manager.getSnapshot, manager.getSnapshot)

  const actions = useMemo(() => ({ close: manager.close, open: manager.open }), [manager.close, manager.open])

  return (
    <DialogContext.Provider value={actions}>
        {children}
        { 
          dialogs.map((dialogEntry, index) => {
            const { Component, props } = dialogEntry.dialog;
            return <Component key={index} {...props} />;
          }) 
        }
    </DialogContext.Provider>
  )
}