import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
type FieldProps = {
    field: string;
    placeholder?: string;
    placeholderTextColor?: string;
    secureTextEntry?: boolean;
    style?: {
        inputContainer?: ViewStyle;
        iconContainer?: ViewStyle;
        textInput?: TextStyle;
        error?: TextStyle;
    };
    errorSpacing?: number;
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
};
declare const FieldBuilder: React.FC<FieldProps>;
export default FieldBuilder;
