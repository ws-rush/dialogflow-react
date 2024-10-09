export type DialogContextType = {
    push: (Component: () => JSX.Element, props?: {}) => Promise<any>;
    open: (dialogId: string, props?: {}) => Promise<any>;
};
export declare const DialogContext: import('react').Context<DialogContextType>;
export declare const useDialog: () => DialogContextType;
