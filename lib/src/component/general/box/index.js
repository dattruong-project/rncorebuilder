import { View } from "react-native";
export const VerticalBox = (prop) => {
    return <View style={{ height: prop.dimen }}/>;
};
export const HorizontalBox = (prop) => {
    return <View style={{ width: prop.dimen }}/>;
};
