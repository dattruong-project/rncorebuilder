import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { VerticalBox } from '../../../general/box';
import { useFormikContext } from 'formik';
const CheckBoxBuilder = (props) => {
    const { label, initialValue, onCheckChange, field, style, disabledError, errorSpacing, customError, labelStyle, theme, testID, mode, position, accessibilityLabel, disabled, labelVariant, labelMaxFontSizeMultiplier } = props;
    const [isChecked, setChecked] = useState(initialValue);
    const formik = useFormikContext();
    const handleCheckboxPress = () => {
        const newCheckedValue = !isChecked;
        onCheckChange(newCheckedValue);
        setChecked(newCheckedValue);
        if (field) {
            formik.validateField(field);
        }
    };
    return (<View style={styles.container}>
      <Checkbox.Item labelStyle={labelStyle} theme={theme} testID={testID} mode={mode} position={position} accessibilityLabel={accessibilityLabel} disabled={disabled} labelVariant={labelVariant} labelMaxFontSizeMultiplier={labelMaxFontSizeMultiplier} style={style} label={label} status={isChecked ? 'checked' : 'unchecked'} onPress={handleCheckboxPress}/>

      <VerticalBox dimen={errorSpacing !== null && errorSpacing !== void 0 ? errorSpacing : 15}/>

      {!disabledError && field && formik.errors[field] && (<Text style={styles.errorText}>{customError || 'Please select'}</Text>)}
    </View>);
};
const styles = {
    container: {
        paddingLeft: 12,
    },
    errorText: {
        color: 'red',
        marginLeft: 20,
    },
};
export default CheckBoxBuilder;
