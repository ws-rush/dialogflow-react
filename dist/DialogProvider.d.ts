import { ReactNode } from 'react';
import { Manager } from './DialogManager';
export type Props = {
    readonly children: ReactNode;
    readonly manager: Manager;
};
export declare function DialogProvider({ children, manager }: Props): JSX.Element;
