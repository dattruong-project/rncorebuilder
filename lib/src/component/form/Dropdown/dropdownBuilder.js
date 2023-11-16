import { useFormikContext } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
const DropdownBuilder = (props) => {
    const { data, field, placeholder, searchPlaceholder, maxHeight, labelField, valueField, style, isFocus, customStyles, borderColor, search } = props;
    const formik = useFormikContext();
    return (<View style={[styles.container, style, customStyles === null || customStyles === void 0 ? void 0 : customStyles.container]}>
            <Dropdown style={[styles.dropdown, customStyles === null || customStyles === void 0 ? void 0 : customStyles.dropdown, isFocus && { borderColor: borderColor }]} placeholderStyle={[styles.placeholderStyle, customStyles === null || customStyles === void 0 ? void 0 : customStyles.placeholderStyle]} selectedTextStyle={[styles.selectedTextStyle, customStyles === null || customStyles === void 0 ? void 0 : customStyles.selectedTextStyle]} inputSearchStyle={[styles.inputSearchStyle, customStyles === null || customStyles === void 0 ? void 0 : customStyles.inputSearchStyle]} iconStyle={[styles.iconStyle, customStyles === null || customStyles === void 0 ? void 0 : customStyles.iconStyle]} data={data} search={search} maxHeight={maxHeight} labelField={labelField} valueField={valueField} placeholder={!isFocus ? placeholder : 'Please select'} searchPlaceholder={searchPlaceholder} value={formik.values[field]} onChange={(item) => {
            formik.setFieldValue(field, item);
            formik.validateField(field);
        }}/>
        </View>);
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});
export default DropdownBuilder;
