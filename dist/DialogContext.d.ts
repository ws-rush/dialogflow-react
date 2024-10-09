import { ComponentType } from 'react';
export interface DialogComponentProps {
    close: (result?: any) => void;
}
export type DialogComponent<P = {}> = ComponentType<P & DialogComponentProps>;
export interface DialogRegistry {
}
export type DialogContextType = {
    push: <T extends DialogComponent<any>>(Component: T, props?: Omit<React.ComponentProps<T>, keyof DialogComponentProps>) => Promise<any>;
    open: <T extends keyof DialogRegistry>(dialogId: T, props?: Omit<React.ComponentProps<DialogRegistry[T]>, keyof DialogComponentProps>) => Promise<any>;
};
export declare const DialogContext: import('react').Context<DialogContextType>;
export declare const useDialog: () => DialogContextType;
