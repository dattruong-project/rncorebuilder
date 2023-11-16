import React from 'react';
import { TextStyle, StyleProp, ViewStyle } from 'react-native';
type MultiCheckBoxBuilderProps = {
    field: string;
    multiCheckboxStyle?: {
        error?: TextStyle;
        checkBoxStyle?: StyleProp<ViewStyle>;
    };
    customError?: string;
    errorSpacing?: number;
};
declare const MultiCheckBoxBuilder: React.FC<MultiCheckBoxBuilderProps>;
export default MultiCheckBoxBuilder;
