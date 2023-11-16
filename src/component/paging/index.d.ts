import React from 'react';
import { FlatListProps } from 'react-native';
export type Props<T> = Omit<FlatListProps<T>, 'maintainVisibleContentPosition'> & {
    onEndReached: () => Promise<void>;
    onStartReached?: () => Promise<void>;
    activityIndicatorColor?: string;
    enableAutoscrollToTop?: boolean;
    autoscrollToTopThreshold?: number;
    onStartReachedThreshold?: number;
    onEndReachedThreshold?: number;
    showDefaultLoadingIndicators?: boolean;
    HeaderLoadingIndicator?: React.ComponentType;
    FooterLoadingIndicator?: React.ComponentType;
    ListHeaderComponent?: React.ComponentType;
    ListFooterComponent?: React.ComponentType;
};
export declare const FlatListBuilder: FlatListBuilderType;
type FlatListBuilderType = <T extends any>(props: Props<T>) => React.ReactElement;
export {};
