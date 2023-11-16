import { useFormikContext } from 'formik';
import React from 'react';
import { ColorValue, ImageStyle, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

interface DropdownBuilderProps {
    data: Array<{ label: string; value: string }>;
    field: any;
    placeholder: string;
    searchPlaceholder: string;
    maxHeight: number;
    labelField: string;
    valueField: string;
    style?: ViewStyle;
    isFocus: boolean;
    setIsFocus?: (isFocus: boolean) => void;
    setValue?: (value: any) => void;
    borderColor?: ColorValue;
    customStyles?: {
        container?: ViewStyle;
        dropdown?: ViewStyle;
        label?: StyleProp<TextStyle>;
        placeholderStyle?: StyleProp<TextStyle>;
        selectedTextStyle?: StyleProp<TextStyle>;
        iconStyle?: StyleProp<ImageStyle>;
        inputSearchStyle?: StyleProp<TextStyle>;
    };
    search?: boolean
}

const DropdownBuilder: React.FC<DropdownBuilderProps> = (props: DropdownBuilderProps) => {
    const {
        data,
        field,
        placeholder,
        searchPlaceholder,
        maxHeight,
        labelField,
        valueField,
        style,
        isFocus,
        customStyles,
        borderColor,
        search
    } = props;
    const formik = useFormikContext<any>();

    return (
        <View style={[styles.container, style, customStyles?.container]}>
            <Dropdown
                style={[styles.dropdown, customStyles?.dropdown, isFocus && { borderColor: borderColor }]}
                placeholderStyle={[styles.placeholderStyle, customStyles?.placeholderStyle]}
                selectedTextStyle={[styles.selectedTextStyle, customStyles?.selectedTextStyle]}
                inputSearchStyle={[styles.inputSearchStyle, customStyles?.inputSearchStyle]}
                iconStyle={[styles.iconStyle, customStyles?.iconStyle]}
                data={data}
                search={search}
                maxHeight={maxHeight}
                labelField={labelField}
                valueField={valueField}
                placeholder={!isFocus ? placeholder : 'Please select'}
                searchPlaceholder={searchPlaceholder}
                value={formik.values[field]}
                onChange={(item) => {
                   formik.setFieldValue(field, item);
                   formik.validateField(field);
                }}
            />
        </View>
    );
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
