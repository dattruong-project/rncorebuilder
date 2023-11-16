/// <reference types="react" />
import { AlertContextData, AlertProviderProps } from './type';
declare function AlertProvider({ children }: AlertProviderProps): import("react").JSX.Element;
declare function useAlert(): AlertContextData;
export { AlertProvider, useAlert };
