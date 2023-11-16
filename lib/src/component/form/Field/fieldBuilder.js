import React, { useEffect, useMemo } from 'react';
import { useFormikContext } from 'formik';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import debounce from 'lodash/debounce';
import { VerticalBox } from '../../general/box';
const FieldBuilder = (props) => {
    var _a;
    const formik = useFormikContext();
    const { field, errorSpacing, placeholder, secureTextEntry, placeholderTextColor, leadingIcon, trailingIcon } = props;
    const debouncedValidateField = useMemo(() => debounce((_value) => {
        formik.validateField(field);
    }, 500), [field, formik.validateField]);
    const handleFieldChange = (value) => {
        formik.setFieldValue(field, value);
        debouncedValidateField(value);
    };
    const handleBlur = () => {
        formik.validateField(field);
    };
    const { inputContainer, textInput, error, iconContainer } = styles;
    const { style } = props;
    useEffect(() => {
        return () => {
            debouncedValidateField.cancel();
        };
    }, [debouncedValidateField]);
    return (<View style={[inputContainer, style === null || style === void 0 ? void 0 : style.inputContainer]}>
      {leadingIcon && <View style={[iconContainer, styles.iconContainer]}>{leadingIcon}</View>}
      <TextInput placeholderTextColor={placeholderTextColor} placeholder={placeholder} secureTextEntry={secureTextEntry} style={[textInput, style === null || style === void 0 ? void 0 : style.textInput]} onChangeText={handleFieldChange} onBlur={handleBlur} value={formik.values[field]}/>
      {trailingIcon && <View style={styles.iconContainer}>{trailingIcon}</View>}
      <VerticalBox dimen={errorSpacing !== null && errorSpacing !== void 0 ? errorSpacing : 5}/>
      {formik.errors[field] && (<Text style={[error, style === null || style === void 0 ? void 0 : style.error]}>
          {(_a = formik.errors[field]) === null || _a === void 0 ? void 0 : _a.toString()}
        </Text>)}
    </View>);
};
const styles = StyleSheet.create({
    inputContainer: {
        margin: 20,
        height: 70,
        flexDirection: 'row',
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 12,
        paddingLeft: 20,
    },
    error: {
        color: 'red',
    },
    iconContainer: {
        marginHorizontal: 10,
    },
});
export default FieldBuilder;
