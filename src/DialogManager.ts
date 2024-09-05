import { createStore } from './store';


export type ComponentHolder = { Component: () => JSX.Element; props: any } | null
export type Resolver = ((value: any) => void) | null

export type DialogStore = {
  dialog: ComponentHolder;
  resolver: Resolver
}

export function createDialogManager() {
  const store = createStore<DialogStore>({
    dialog: null,
    resolver: null
  })

  // open dialog
  const open = (Component: () => JSX.Element, props = {}) => {
    return new Promise(resolve => {
      store.setState({ dialog: { Component, props }, resolver: resolve })
    })
  }

  // close dialog
  const close = (result: any) => {
    const snapshot = store.getSnapshot()
    if (snapshot.resolver) {
      snapshot.resolver(result)
      store.setState({
        dialog: null,
        resolver: null
      })
    }
  }

  return {
    close,
    open,
    ...store
  }
}

export type Manager = ReturnType<typeof createDialogManager>