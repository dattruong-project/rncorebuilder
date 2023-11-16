import React, { useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, } from 'react-native';
import { FlatList } from 'react-native';
const styles = StyleSheet.create({
    indicatorContainer: {
        paddingVertical: 5,
        width: '100%',
    },
});
export const FlatListBuilder = React.forwardRef((props, ref) => {
    const { activityIndicatorColor = 'black', autoscrollToTopThreshold = 100, data, enableAutoscrollToTop, FooterLoadingIndicator, HeaderLoadingIndicator, ListHeaderComponent, ListFooterComponent, onEndReached = () => Promise.resolve(), onStartReached = () => Promise.resolve(), showDefaultLoadingIndicators = true, } = props;
    const [onStartReachedInProgress, setOnStartReachedInProgress] = useState(false);
    const [onEndReachedInProgress, setOnEndReachedInProgress] = useState(false);
    const onStartReachedTracker = useRef({});
    const onEndReachedTracker = useRef({});
    const onStartReachedInPromise = useRef(null);
    const onEndReachedInPromise = useRef(null);
    const maybeCallOnStartReached = () => {
        if ((data === null || data === void 0 ? void 0 : data.length) && onStartReachedTracker.current[data.length]) {
            return;
        }
        if (data === null || data === void 0 ? void 0 : data.length) {
            onStartReachedTracker.current[data.length] = true;
        }
        setOnStartReachedInProgress(true);
        const p = () => {
            return new Promise((resolve) => {
                onStartReachedInPromise.current = null;
                setOnStartReachedInProgress(false);
                resolve();
            });
        };
        if (onEndReachedInPromise.current) {
            onEndReachedInPromise.current.finally(() => {
                onStartReachedInPromise.current = onStartReached().then(p);
            });
        }
        else {
            onStartReachedInPromise.current = onStartReached().then(p);
        }
    };
    const maybeCallOnEndReached = () => {
        if ((data === null || data === void 0 ? void 0 : data.length) && onEndReachedTracker.current[data.length]) {
            return;
        }
        if (data === null || data === void 0 ? void 0 : data.length) {
            onEndReachedTracker.current[data.length] = true;
        }
        setOnEndReachedInProgress(true);
        const p = () => {
            return new Promise((resolve) => {
                onStartReachedInPromise.current = null;
                setOnEndReachedInProgress(false);
                resolve();
            });
        };
        if (onStartReachedInPromise.current) {
            onStartReachedInPromise.current.finally(() => {
                onEndReachedInPromise.current = onEndReached().then(p);
            });
        }
        else {
            onEndReachedInPromise.current = onEndReached().then(p);
        }
    };
    const renderHeaderLoadingIndicator = () => {
        if (!showDefaultLoadingIndicators) {
            if (ListHeaderComponent) {
                return <ListHeaderComponent />;
            }
            else {
                return null;
            }
        }
        if (!onStartReachedInProgress)
            return null;
        if (HeaderLoadingIndicator) {
            return <HeaderLoadingIndicator />;
        }
        return (<View style={styles.indicatorContainer}>
          <ActivityIndicator size={'small'} color={activityIndicatorColor}/>
        </View>);
    };
    const renderFooterLoadingIndicator = () => {
        if (!showDefaultLoadingIndicators) {
            if (ListFooterComponent) {
                return <ListFooterComponent />;
            }
            else {
                return null;
            }
        }
        if (!onEndReachedInProgress)
            return null;
        if (FooterLoadingIndicator) {
            return <FooterLoadingIndicator />;
        }
        return (<View style={styles.indicatorContainer}>
          <ActivityIndicator size={'small'} color={activityIndicatorColor}/>
        </View>);
    };
    return (<>
        <FlatList {...props} ref={ref} progressViewOffset={50} ListHeaderComponent={renderHeaderLoadingIndicator} ListFooterComponent={renderFooterLoadingIndicator} onEndReached={maybeCallOnEndReached} onStartReached={maybeCallOnStartReached} maintainVisibleContentPosition={{
            autoscrollToTopThreshold: enableAutoscrollToTop
                ? autoscrollToTopThreshold
                : undefined,
            minIndexForVisible: 1,
        }}/>
      </>);
});
