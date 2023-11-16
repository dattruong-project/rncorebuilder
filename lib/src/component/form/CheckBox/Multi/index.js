import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckBoxBuilder from '../Single';
import { useFormikContext } from 'formik';
import { VerticalBox } from '../../../general/box';
const MultiCheckBoxBuilder = (props) => {
    const { field, multiCheckboxStyle, errorSpacing, customError } = props;
    const formik = useFormikContext();
    const [state, setState] = useState((Array));
    useEffect(() => {
        const value = formik.values[field];
        setState(value);
    }, []);
    const handleCheckChange = (index, newValue) => {
        const updatedCheckboxes = [...state];
        updatedCheckboxes[index].checked = newValue;
        setState(updatedCheckboxes);
        formik.setFieldValue(field, updatedCheckboxes);
        formik.validateField(field);
    };
    return (<View>
      {state.map((checkbox, index) => (<CheckBoxBuilder disabledError style={styles.error} key={index} label={checkbox.label} initialValue={checkbox.checked} onCheckChange={(newValue) => handleCheckChange(index, newValue)}/>))}
      <VerticalBox dimen={errorSpacing !== null && errorSpacing !== void 0 ? errorSpacing : 5}/>
      {formik.errors[field] && (<Text style={{ ...styles.error, ...multiCheckboxStyle === null || multiCheckboxStyle === void 0 ? void 0 : multiCheckboxStyle.error }}>
           {customError || 'Please select'}
       </Text>)}
    </View>);
};
const styles = StyleSheet.create({
    error: {
        color: 'red',
        marginLeft: 20,
    },
});
export default MultiCheckBoxBuilder;
