import { createStore } from '../lib/store';


export type ComponentHolder = { Component: () => JSX.Element; props: any }
export type Resolver = ((value: any) => void)

export type DialogEntry = {
  dialog: ComponentHolder;
  resolver: Resolver
}

export type DialogStore = {
  dialogs: DialogEntry[]
}

export function createDialogflow() {
  const store = createStore<DialogStore>({
    dialogs: []
  })

  // open dialog
  const open = (Component: () => JSX.Element, props = {}) => {
    return new Promise(resolve => {
      const dialogEntry: DialogEntry = {
        dialog: { Component, props },
        resolver: resolve,
      };
      const { dialogs } = store.getSnapshot();
      store.setState({ dialogs: [...dialogs, dialogEntry] });
    })
  }

  // close dialog
  const close = (result: any) => {
    const { dialogs } = store.getSnapshot()
    if (dialogs.length > 0) {
      const lastDialogEntry = dialogs[dialogs.length - 1];
      lastDialogEntry.resolver(result);
      store.setState({ dialogs: dialogs.slice(0, -1) });
    }
  }

  return {
    close,
    open,
    ...store
  }
}

export type Manager = ReturnType<typeof createDialogflow>