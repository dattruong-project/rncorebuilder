import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { Text, ViewStyle, TextStyle, StyleSheet, ModalProps, TextInputProps, TouchableOpacityProps } from 'react-native';
import RNPickerSelect, { Item, PickerStyle } from 'react-native-picker-select';
import { VerticalBox } from '../../../general/box';
import { PickerProps } from '@react-native-picker/picker/typings/Picker';

export type SelectType = {
  label: string,
  value: any
}

interface SelectBuilderProps {
  onValueChange: (value: string) => void;
  items: SelectType[];
  customContainerStyle?: ViewStyle;
  label?: string,
  field: string,
  errorSpacing?: number;
  selectStyle?: {
    error?: TextStyle;
  },
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

const SelectPickerBuilder: React.FC<SelectBuilderProps> = (props: SelectBuilderProps) => {
  const { onValueChange,
    customContainerStyle,
    label,
    field,
    errorSpacing,
    selectStyle,
    items,
    disabled,
    itemKey,
    children,
    onOpen,
    useNativeAndroidPickerStyle,
    fixAndroidTouchableBug,
    doneText,
    onDonePress,
    onUpArrow,
    onDownArrow,
    onClose,
    modalProps,
    textInputProps,
    pickerProps,
    touchableDoneProps,
    touchableWrapperProps,
    Icon,
    InputAccessoryView,
    darkTheme,
  } = props;
  const [selectedValue, setSelectedValue] = useState<SelectType>({ label: "", value: null });

  const formik = useFormikContext<any>();

  useEffect(() => {
    const defaultValue: SelectType = formik.values[field];
    if (defaultValue) {
      setSelectedValue(defaultValue)
    }
  }, [])

  const handleValueChange = (value: any) => {
    setSelectedValue(value);
    onValueChange(value);
    validateChange();
  };

  const validateChange = () => {
    formik.setFieldValue(field, selectedValue).then(() => {
      formik.validateField(field);
    });
  };

  return (
    <React.Fragment>
      <RNPickerSelect
        items={items}
        disabled={disabled}
        itemKey={itemKey}
        children={children}
        onOpen={onOpen}
        useNativeAndroidPickerStyle={useNativeAndroidPickerStyle}
        fixAndroidTouchableBug={fixAndroidTouchableBug}
        doneText={doneText}
        onUpArrow={onUpArrow}
        onDownArrow={onDownArrow}
        modalProps={modalProps}
        textInputProps={textInputProps}
        pickerProps={pickerProps}
        touchableDoneProps={touchableDoneProps}
        touchableWrapperProps={touchableWrapperProps}
        Icon={Icon}
        InputAccessoryView={InputAccessoryView}
        darkTheme={darkTheme}
        onValueChange={handleValueChange}
        placeholder={{
          label: label || 'Please choose an option',
          value: null,
        }}
        value={selectedValue}
        style={{
          ...defaultPickerStyles,
          ...customContainerStyle
        }}
        onClose={() => {
          onClose;
          validateChange
        }}
        onDonePress={() => {
          validateChange;
          onDonePress
        }}
      />
      <VerticalBox dimen={errorSpacing ?? 5} />
      {formik.errors[field] && (
        <Text style={{ ...selectStyle?.error, ...styles?.error }}>
          {formik.errors[field]?.toString()}
        </Text>)}
    </React.Fragment>
  );
};

const defaultPickerStyles: PickerStyle = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    margin: 20
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
  placeholder: {
    color: 'gray',
  }
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    marginStart: 20,
    marginTop: 3
  },
});

export default SelectPickerBuilder;