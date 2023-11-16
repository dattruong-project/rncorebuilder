import React, { useEffect, useMemo } from 'react';
import { useFormikContext } from 'formik';
import { StyleSheet, TextInput, View, Text, ViewStyle, TextStyle } from 'react-native';
import debounce from 'lodash/debounce';
import { VerticalBox } from '../../general/box';

type FieldProps = {
  field: string;
  placeholder?: string;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  style?: {
    inputContainer?: ViewStyle;
    iconContainer?: ViewStyle;
    textInput?: TextStyle;
    error?: TextStyle;
  };
  errorSpacing?: number;
  leadingIcon?: React.ReactNode; 
  trailingIcon?: React.ReactNode;
};

const FieldBuilder: React.FC<FieldProps> = (props) => {
  const formik = useFormikContext<any>();
  const { field, errorSpacing, placeholder, secureTextEntry, placeholderTextColor, leadingIcon, trailingIcon } = props;

  const debouncedValidateField = useMemo(
    () =>
      debounce((_value: string) => {
        formik.validateField(field);
      }, 500),
    [field, formik.validateField]
  );

  const handleFieldChange = (value: string) => {
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

  return (
    <View style={[inputContainer, style?.inputContainer]}>
      {leadingIcon && <View style={[iconContainer,styles.iconContainer]}>{leadingIcon}</View>}
      <TextInput
        placeholderTextColor={placeholderTextColor}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={[textInput, style?.textInput]}
        onChangeText={handleFieldChange}
        onBlur={handleBlur}
        value={formik.values[field]}
      />
      {trailingIcon && <View style={styles.iconContainer}>{trailingIcon}</View>}
      <VerticalBox dimen={errorSpacing ?? 5} />
      {formik.errors[field] && (
        <Text style={[error, style?.error]}>
          {formik.errors[field]?.toString()}
        </Text>
      )}
    </View>
  );
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
