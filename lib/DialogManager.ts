import { createStore } from '../lib/store';

export type Resolver = ((value: any) => void)

export type DialogEntry = {
  id: string;
  Component: () => JSX.Element;
  resolver: Resolver;
  props?: any;
}

export type DialogStore = {
  dialogs: DialogEntry[]
}

export function createDialogflow() {
  let dialogIdCounter = 0;

  const store = createStore<DialogStore>({
    dialogs: []
  })

  // open dialog
  const open = (Component: () => JSX.Element, props = {}) => {
    const dialogId = String(dialogIdCounter++)

    return new Promise(resolver => {
      const dialogEntry: DialogEntry = {
        id: dialogId,
        Component,
        resolver,
        props: { ...props, close: (result?: any) => {
          close(dialogId, result)
        } }
      };
      const { dialogs } = store.getSnapshot();
      store.setState({ dialogs: [...dialogs, dialogEntry] });
    })
  }

  // close dialog
  const close = (id: string, result?: any) => {
    const { dialogs } = store.getSnapshot()
    const index = dialogs.findIndex((dialog) => dialog.id === id);

    if (index !== -1) {
      const dialogEntry = dialogs[index];
      dialogEntry.resolver(result);
      const newDialogs = [...dialogs];
      newDialogs.splice(index, 1);
      store.setState({ dialogs: newDialogs });
    }
  }

  return {
    open,
    ...store
  }
}

export type Manager = ReturnType<typeof createDialogflow>