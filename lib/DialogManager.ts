import { createStore } from "../lib/store";
import type {
  DialogRegistry,
  DialogComponent,
  DialogContextType,
} from "./DialogContext";

export type Resolver = (value: any) => void;

export type DialogEntry = {
  id: string;
  Component: DialogComponent<any>;
  resolver: Resolver;
  props?: any;
};

export type DialogStore = {
  dialogs: DialogEntry[];
};

export function createDialogflow() {
  let dialogIdCounter = 0;
  const dialogRegistry = new Map<keyof DialogRegistry, DialogComponent<any>>();

  const store = createStore<DialogStore>({
    dialogs: [],
  });

  // Register a dialog component with a unique ID
  const register = <T extends keyof DialogRegistry>(
    Component: DialogRegistry[T],
    dialogId: T
  ) => {
    if (dialogRegistry.has(dialogId)) {
      console.warn(
        `Dialog with ID "${dialogId}" is already registered. Overwriting.`
      );
    }
    dialogRegistry.set(dialogId, Component);
  };

  // Push a new dialog onto the stack
  const push: DialogContextType["push"] = (Component, props): Promise<any> => {
    const dialogId = `dialog_${dialogIdCounter++}`;
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

  // Open a registered dialog by ID
  const open: DialogContextType["open"] = (dialogId, props): Promise<any> => {
    const Component = dialogRegistry.get(dialogId);
    if (!Component) {
      return Promise.reject(
        new Error(`No dialog registered with ID "${dialogId}".`)
      );
    }

    const { dialogs } = store.getSnapshot();
    const isAlreadyOpen = dialogs.some((dialog) => dialog.id === dialogId);
    if (isAlreadyOpen) {
      // return Promise.reject(new Error(`Dialog with ID "${dialogId}" is already open.`));
      return Promise.resolve();
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

      store.setState({ dialogs: [...dialogs, dialogEntry] });
    });
  };

  // close dialog
  const close = (id: string, result?: any) => {
    const { dialogs } = store.getSnapshot();
    const index = dialogs.findIndex((dialog) => dialog.id === id);

    if (index !== -1) {
      const dialogEntry = dialogs[index];
      dialogEntry.resolver(result);
      const newDialogs = [...dialogs];
      newDialogs.splice(index, 1);
      store.setState({ dialogs: newDialogs });
    }
  };

  return {
    push,
    open,
    register,
    ...store,
  };
}

export type Manager = ReturnType<typeof createDialogflow>;
