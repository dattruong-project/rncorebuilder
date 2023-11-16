import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
export type CheckboxType = {
    label: string;
    checked: boolean;
};
export type CheckBoxProps = {
    label: string;
    initialValue: boolean;
    onCheckChange: (newValue: boolean) => void;
    disabledError?: boolean;
    field?: string;
    style?: StyleProp<ViewStyle>;
    errorSpacing?: number;
    customError?: string;
    status?: 'checked' | 'unchecked' | 'indeterminate';
    labelStyle?: StyleProp<TextStyle>;
    theme?: ThemeProp | undefined;
    testID?: string | undefined;
    mode?: 'android' | 'ios' | undefined;
    position?: 'leading' | 'trailing';
    accessibilityLabel?: string;
    disabled?: boolean;
    labelVariant?: 'displayLarge' | 'displayMedium' | 'displaySmall' | 'headlineLarge' | 'headlineMedium' | 'headlineSmall' | 'titleLarge' | 'titleMedium' | 'titleSmall' | 'labelLarge' | 'labelMedium' | 'labelSmall' | 'bodyLarge' | 'bodyMedium' | 'bodySmall';
    labelMaxFontSizeMultiplier?: number;
};
declare const CheckBoxBuilder: React.FC<CheckBoxProps>;
export default CheckBoxBuilder;
