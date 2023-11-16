import React, { MutableRefObject, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList as FlatListType,
  FlatListProps,
  StyleSheet,
  View,
} from 'react-native';
import { FlatList } from 'react-native';

const styles = StyleSheet.create({
  indicatorContainer: {
    paddingVertical: 5,
    width: '100%',
  },
});

export type Props<T> = Omit<FlatListProps<T>, 'maintainVisibleContentPosition'> & {
  onEndReached?: () => Promise<void>;
  onStartReached?: () => Promise<void>;
  onRefresh?: () => Promise<void>; 
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

const FlatListBuilder: FlatListBuilderType = React.forwardRef(
  <T extends any>(
    props: Props<T>,
    ref:
      | ((instance: FlatListType<T> | null) => void)
      | MutableRefObject<FlatListType<T> | null>
      | null
  ) => {
    const {
      activityIndicatorColor = 'black',
      autoscrollToTopThreshold = 100,
      data,
      enableAutoscrollToTop,
      FooterLoadingIndicator,
      HeaderLoadingIndicator,
      ListHeaderComponent,
      ListFooterComponent,
      onEndReached = () => Promise.resolve(),
      onStartReached = () => Promise.resolve(),
      onRefresh = () => Promise.resolve(),
      showDefaultLoadingIndicators = true,
    } = props;
    const [onStartReachedInProgress, setOnStartReachedInProgress] = useState(false);
    const [onEndReachedInProgress, setOnEndReachedInProgress] = useState(false);
    const [refreshing, setRefreshing] = useState(false); // Added state for refreshing

    const onStartReachedTracker = useRef<Record<number, boolean>>({});
    const onEndReachedTracker = useRef<Record<number, boolean>>({});

    const onStartReachedInPromise = useRef<Promise<void> | null>(null);
    const onEndReachedInPromise = useRef<Promise<void> | null>(null);

    const maybeCallOnStartReached = () => {
      if (data?.length && onStartReachedTracker.current[data.length]) {
        return;
      }

      if (data?.length) {
        onStartReachedTracker.current[data.length] = true;
      }

      setOnStartReachedInProgress(true);
      const p = () => {
        return new Promise<void>((resolve) => {
          onStartReachedInPromise.current = null;
          setOnStartReachedInProgress(false);
          resolve();
        });
      };

      if (onEndReachedInPromise.current) {
        onEndReachedInPromise.current.finally(() => {
          onStartReachedInPromise.current = onStartReached().then(p);
        });
      } else {
        onStartReachedInPromise.current = onStartReached().then(p);
      }
    };

    const maybeCallOnEndReached = () => {
      if (data?.length && onEndReachedTracker.current[data.length]) {
        return;
      }

      if (data?.length) {
        onEndReachedTracker.current[data.length] = true;
      }

      setOnEndReachedInProgress(true);
      const p = () => {
        return new Promise<void>((resolve) => {
          onStartReachedInPromise.current = null;
          setOnEndReachedInProgress(false);
          resolve();
        });
      };

      if (onStartReachedInPromise.current) {
        onStartReachedInPromise.current.finally(() => {
          onEndReachedInPromise.current = onEndReached().then(p);
        });
      } else {
        onEndReachedInPromise.current = onEndReached().then(p);
      }
    };

    const handleRefresh = async () => {
      if (!refreshing) {
        setRefreshing(true);
        onRefresh();
        setRefreshing(false);
      }
    };

    const renderHeaderLoadingIndicator = () => {
      if (!showDefaultLoadingIndicators) {
        if (ListHeaderComponent) {
          return <ListHeaderComponent />;
        } else {
          return null;
        }
      }

      if (!onStartReachedInProgress && !refreshing) return null;

      if (HeaderLoadingIndicator) {
        return <HeaderLoadingIndicator />;
      }

      return (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size={'small'} color={activityIndicatorColor} />
        </View>
      );
    };

    const renderFooterLoadingIndicator = () => {
      if (!showDefaultLoadingIndicators) {
        if (ListFooterComponent) {
          return <ListFooterComponent />;
        } else {
          return null;
        }
      }

      if (!onEndReachedInProgress) return null;

      if (FooterLoadingIndicator) {
        return <FooterLoadingIndicator />;
      }

      return (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size={'small'} color={activityIndicatorColor} />
        </View>
      );
    };

    return (
      <>
        <FlatList<T>
          {...props}
          ref={ref}
          progressViewOffset={50}
          onEndReached={maybeCallOnEndReached}
          onStartReached={maybeCallOnStartReached}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          maintainVisibleContentPosition={{
            autoscrollToTopThreshold: enableAutoscrollToTop
              ? autoscrollToTopThreshold
              : undefined,
            minIndexForVisible: 1
          }}
          ListHeaderComponent={renderHeaderLoadingIndicator}
          ListFooterComponent={renderFooterLoadingIndicator}
        />
      </>
    );
  }
) as FlatListBuilderType;

type FlatListBuilderType = <T extends any>(
  props: Props<T>
) => React.ReactElement;

export default FlatListBuilder;
