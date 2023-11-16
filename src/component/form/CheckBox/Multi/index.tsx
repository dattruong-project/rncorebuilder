import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextStyle, StyleProp, ViewStyle } from 'react-native';
import CheckBoxBuilder, { CheckboxType } from '../Single';
import { useFormikContext } from 'formik';
import { VerticalBox } from '../../../general/box';

type MultiCheckBoxBuilderProps = {
  field: string;
  multiCheckboxStyle?: {
    error?: TextStyle;
    checkBoxStyle?: StyleProp<ViewStyle>
  };
  customError?: string;
  errorSpacing?: number;
};

const MultiCheckBoxBuilder: React.FC<MultiCheckBoxBuilderProps> = (props) => {
  const { field, multiCheckboxStyle, errorSpacing, customError } = props;
  const formik = useFormikContext<any>();
  const [state, setState] = useState(Array<CheckboxType>);

  useEffect(() => {
   const value = formik.values[field]
   setState(value)
  },[])

  const handleCheckChange = (index: number, newValue: boolean) => {
    const updatedCheckboxes: Array<CheckboxType> = [...state];
    updatedCheckboxes[index].checked = newValue;
    setState(updatedCheckboxes);
    formik.setFieldValue(field, updatedCheckboxes);
    formik.validateField(field);
  };

  return (
    <View>
      {state.map((checkbox, index) => (
        <CheckBoxBuilder
          disabledError
          style={styles.error}
          key={index}
          label={checkbox.label}
          initialValue={checkbox.checked}
          onCheckChange={(newValue) => handleCheckChange(index, newValue)}
        />
      ))}
      <VerticalBox dimen={errorSpacing ?? 5} />
      {formik.errors[field] && (
         <Text style={{ ...styles.error, ...multiCheckboxStyle?.error }}>
           {customError || 'Please select'}
       </Text>)}
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    marginLeft: 20,
  },
});

export default MultiCheckBoxBuilder;
