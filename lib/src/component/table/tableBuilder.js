import WebView from "react-native-webview";
import { useRef } from "react";
const TableBuilder = ({ style, src }) => {
    const webViewRef = useRef(null);
    return <>
        <WebView ref={webViewRef} onLoadEnd={() => {
            webViewRef.current.postMessage(style);
        }} scalesPageToFit={false} originWhitelist={['*']} source={require(src)} style={{ flex: 1 }}/>
    </>;
};
export default TableBuilder;
