import { type ReactNode, useMemo, useSyncExternalStore } from 'react'
import { Manager } from './DialogManager'
import { DialogContext } from './DialogContext'

export type Props = {
  readonly children: ReactNode
  readonly manager: Manager
}

export function DialogProvider({ children, manager }: Props): JSX.Element {
  const { dialog } = useSyncExternalStore(manager.subscribe, manager.getSnapshot, manager.getSnapshot)

  const actions = useMemo(() => ({ close: manager.close, open: manager.close }), [manager.close, manager.open])

  return (
    <DialogContext.Provider value={actions}>
        {children}
        {dialog && <dialog.Component {...dialog.props} />}
    </DialogContext.Provider>
  )
}