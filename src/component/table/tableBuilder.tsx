import WebView from "react-native-webview";
import { MutableRefObject, useRef } from "react";
import { ViewStyle, StyleProp } from "react-native";

type TableProps = {
    style?: StyleProp<ViewStyle>,
    src: string;
}

const TableBuilder: React.FC<TableProps> = ({ style, src }) => {
    const webViewRef: MutableRefObject<any> = useRef(null)

    return <>
        <WebView
            ref={webViewRef}
            onLoadEnd={() => {
                webViewRef.current.postMessage(style)
            }}
            scalesPageToFit={false}
            originWhitelist={['*']} source={require(src)}
            style={{ flex: 1 }} />
    </>
}

export default TableBuilder;