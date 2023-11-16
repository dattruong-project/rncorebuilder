import React from 'react';
import { ColorValue, ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';
interface DropdownBuilderProps {
    data: Array<{
        label: string;
        value: string;
    }>;
    field: any;
    placeholder: string;
    searchPlaceholder: string;
    maxHeight: number;
    labelField: string;
    valueField: string;
    style?: ViewStyle;
    isFocus: boolean;
    setIsFocus?: (isFocus: boolean) => void;
    setValue?: (value: any) => void;
    borderColor?: ColorValue;
    customStyles?: {
        container?: ViewStyle;
        dropdown?: ViewStyle;
        label?: StyleProp<TextStyle>;
        placeholderStyle?: StyleProp<TextStyle>;
        selectedTextStyle?: StyleProp<TextStyle>;
        iconStyle?: StyleProp<ImageStyle>;
        inputSearchStyle?: StyleProp<TextStyle>;
    };
    search?: boolean;
}
declare const DropdownBuilder: React.FC<DropdownBuilderProps>;
export default DropdownBuilder;
