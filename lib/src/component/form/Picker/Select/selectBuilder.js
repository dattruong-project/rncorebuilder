import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { VerticalBox } from '../../../general/box';
const SelectPickerBuilder = (props) => {
    var _a;
    const { onValueChange, customContainerStyle, label, field, errorSpacing, selectStyle, items, disabled, itemKey, children, onOpen, useNativeAndroidPickerStyle, fixAndroidTouchableBug, doneText, onDonePress, onUpArrow, onDownArrow, onClose, modalProps, textInputProps, pickerProps, touchableDoneProps, touchableWrapperProps, Icon, InputAccessoryView, darkTheme, } = props;
    const [selectedValue, setSelectedValue] = useState({ label: "", value: null });
    const formik = useFormikContext();
    useEffect(() => {
        const defaultValue = formik.values[field];
        if (defaultValue) {
            setSelectedValue(defaultValue);
        }
    }, []);
    const handleValueChange = (value) => {
        setSelectedValue(value);
        onValueChange(value);
        validateChange();
    };
    const validateChange = () => {
        formik.setFieldValue(field, selectedValue).then(() => {
            formik.validateField(field);
        });
    };
    return (<React.Fragment>
      <RNPickerSelect items={items} disabled={disabled} itemKey={itemKey} children={children} onOpen={onOpen} useNativeAndroidPickerStyle={useNativeAndroidPickerStyle} fixAndroidTouchableBug={fixAndroidTouchableBug} doneText={doneText} onUpArrow={onUpArrow} onDownArrow={onDownArrow} modalProps={modalProps} textInputProps={textInputProps} pickerProps={pickerProps} touchableDoneProps={touchableDoneProps} touchableWrapperProps={touchableWrapperProps} Icon={Icon} InputAccessoryView={InputAccessoryView} darkTheme={darkTheme} onValueChange={handleValueChange} placeholder={{
            label: label || 'Please choose an option',
            value: null,
        }} value={selectedValue} style={{
            ...defaultPickerStyles,
            ...customContainerStyle
        }} onClose={() => {
            onClose;
            validateChange;
        }} onDonePress={() => {
            validateChange;
            onDonePress;
        }}/>
      <VerticalBox dimen={errorSpacing !== null && errorSpacing !== void 0 ? errorSpacing : 5}/>
      {formik.errors[field] && (<Text style={{ ...selectStyle === null || selectStyle === void 0 ? void 0 : selectStyle.error, ...styles === null || styles === void 0 ? void 0 : styles.error }}>
          {(_a = formik.errors[field]) === null || _a === void 0 ? void 0 : _a.toString()}
        </Text>)}
    </React.Fragment>);
};
const defaultPickerStyles = {
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
