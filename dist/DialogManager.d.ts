export type Resolver = ((value: any) => void);
export type DialogEntry = {
    id: string;
    Component: () => JSX.Element;
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
    push: (Component: () => JSX.Element, props?: Record<string, any>) => Promise<any>;
    open: (dialogId: string, props?: Record<string, any>) => Promise<any>;
    register: (Component: () => JSX.Element, dialogId: string) => void;
};
export type Manager = ReturnType<typeof createDialogflow>;
