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
  const dialogRegistry: Map<string, () => JSX.Element> = new Map();

  const store = createStore<DialogStore>({
    dialogs: []
  })

  // Register a dialog component with a unique ID
  const register = (Component: () => JSX.Element, dialogId: string) => {
    if (dialogRegistry.has(dialogId)) {
      console.warn(`Dialog with ID "${dialogId}" is already registered. Overwriting.`);
    }
    dialogRegistry.set(dialogId, Component);
  };

  // Open dialog by Component or by dialog ID
  const open = (
    ComponentOrId: (() => JSX.Element) | string,
    props: Record<string, any> = {}
  ): Promise<any> => {
    let Component: (() => JSX.Element) | undefined;
    let dialogId: string;

    if (typeof ComponentOrId === 'string') {
      dialogId = ComponentOrId;
      Component = dialogRegistry.get(dialogId);
      if (!Component) {
        return Promise.reject(new Error(`No dialog registered with ID "${dialogId}".`));
      }
    } else if (typeof ComponentOrId === 'function') {
      Component = ComponentOrId;
      dialogId = `dialog_${dialogIdCounter++}`;
    } else {
      return Promise.reject(new Error('Invalid dialog identifier.'));
    }

    return new Promise((resolver) => {
      const dialogEntry: DialogEntry = {
        id: dialogId,
        Component,
        resolver,
        props: {
          ...props,
          close: (result?: any) => {
            close(dialogId, result);
          },
        },
      };

      const { dialogs } = store.getSnapshot();
      store.setState({ dialogs: [...dialogs, dialogEntry] });
    });
  };

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
    register,
    ...store
  }
}

export type Manager = ReturnType<typeof createDialogflow>