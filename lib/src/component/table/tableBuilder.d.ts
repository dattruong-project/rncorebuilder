/// <reference types="react" />
import { ViewStyle, StyleProp } from "react-native";
type TableProps = {
    style?: StyleProp<ViewStyle>;
    src: string;
};
declare const TableBuilder: React.FC<TableProps>;
export default TableBuilder;
