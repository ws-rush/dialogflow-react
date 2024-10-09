import { DialogRegistry, DialogComponent } from './DialogContext';
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
export declare function createDialogflow(): {
    getSnapshot: () => DialogStore;
    setState: (newState: DialogStore) => void;
    subscribe: (listener: import('../lib/store').Listener) => () => boolean;
    push: <T extends DialogComponent<any>>(Component: T, props?: Omit<React.ComponentProps<T>, keyof import('./DialogContext').DialogComponentProps>) => Promise<any>;
    open: <T extends keyof DialogRegistry>(dialogId: T, props?: Omit<React.ComponentProps<DialogRegistry[T]>, keyof import('./DialogContext').DialogComponentProps>) => Promise<any>;
    register: <T extends keyof DialogRegistry>(Component: DialogRegistry[T], dialogId: T) => void;
};
export type Manager = ReturnType<typeof createDialogflow>;
