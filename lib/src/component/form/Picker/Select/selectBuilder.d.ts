import React from 'react';
import { ViewStyle, TextStyle, ModalProps, TextInputProps, TouchableOpacityProps } from 'react-native';
import { Item, PickerStyle } from 'react-native-picker-select';
import { PickerProps } from '@react-native-picker/picker/typings/Picker';
export type SelectType = {
    label: string;
    value: any;
};
interface SelectBuilderProps {
    onValueChange: (value: string) => void;
    items: SelectType[];
    customContainerStyle?: ViewStyle;
    label?: string;
    field: string;
    errorSpacing?: number;
    selectStyle?: {
        error?: TextStyle;
    };
    value?: any;
    placeholder?: Item | {};
    disabled?: boolean;
    itemKey?: string | number;
    style?: PickerStyle;
    children?: React.ReactNode;
    onOpen?: () => void;
    useNativeAndroidPickerStyle?: boolean;
    fixAndroidTouchableBug?: boolean;
    doneText?: string;
    onDonePress?: () => void;
    onUpArrow?: () => void;
    onDownArrow?: () => void;
    onClose?: () => void;
    modalProps?: ModalProps;
    textInputProps?: TextInputProps;
    pickerProps?: PickerProps;
    touchableDoneProps?: TouchableOpacityProps;
    touchableWrapperProps?: TouchableOpacityProps;
    Icon?: React.ReactNode;
    InputAccessoryView?: React.ReactNode;
    darkTheme?: boolean;
}
declare const SelectPickerBuilder: React.FC<SelectBuilderProps>;
export default SelectPickerBuilder;
