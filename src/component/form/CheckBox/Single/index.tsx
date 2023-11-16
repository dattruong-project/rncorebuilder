import React, { useState } from 'react';
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { VerticalBox } from '../../../general/box';
import { useFormikContext } from 'formik';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';

export type CheckboxType = { label: string; checked: boolean };

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
  theme?: ThemeProp | undefined,
  testID?: string | undefined,
  mode?: 'android' | 'ios' | undefined,
  position?: 'leading' | 'trailing',
  accessibilityLabel?: string,
  disabled?: boolean,
  labelVariant?: 'displayLarge' | 'displayMedium' | 'displaySmall' | 'headlineLarge'
  | 'headlineMedium' | 'headlineSmall' | 'titleLarge' | 'titleMedium' |
  'titleSmall' | 'labelLarge' | 'labelMedium' | 'labelSmall' | 'bodyLarge' | 'bodyMedium' | 'bodySmall',
  labelMaxFontSizeMultiplier?: number,
};

const CheckBoxBuilder: React.FC<CheckBoxProps> = (props) => {
  const { label, initialValue, onCheckChange, field, style, disabledError,
    errorSpacing, customError,
    labelStyle,
    theme,
    testID,
    mode,
    position,
    accessibilityLabel,
    disabled,
    labelVariant,
    labelMaxFontSizeMultiplier
  } = props;
  const [isChecked, setChecked] = useState(initialValue);
  const formik = useFormikContext<any>();

  const handleCheckboxPress = () => {
    const newCheckedValue = !isChecked;
    onCheckChange(newCheckedValue);
    setChecked(newCheckedValue);
    if (field) {
      formik.validateField(field);
    }
  };

  return (
    <View style={styles.container}>
      <Checkbox.Item
        labelStyle={labelStyle}
        theme={theme}
        testID={testID}
        mode={mode}
        position={position}
        accessibilityLabel={accessibilityLabel}
        disabled={disabled}
        labelVariant={labelVariant}
        labelMaxFontSizeMultiplier={labelMaxFontSizeMultiplier}
        style={style}
        label={label}
        status={isChecked ? 'checked' : 'unchecked'}
        onPress={handleCheckboxPress}
      />

      <VerticalBox dimen={errorSpacing ?? 15} />

      {!disabledError && field && formik.errors[field] && (
        <Text style={styles.errorText}>{customError || 'Please select'}</Text>
      )}
    </View>
  );
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
