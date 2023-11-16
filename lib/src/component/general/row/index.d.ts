/// <reference types="react" />
import { DimensionValue } from 'react-native';
export type RowProps = {
    children: React.ReactNode;
    maxWidth?: DimensionValue;
};
export declare const Row: (props: RowProps) => import("react").JSX.Element;
