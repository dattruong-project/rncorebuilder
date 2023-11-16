import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';
import { VerticalBox } from '../../../general/box';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import { formatDate, setUpLocale } from '../../../util';
export var PickerMode;
(function (PickerMode) {
    PickerMode["Date"] = "date";
    PickerMode["Time"] = "time";
})(PickerMode || (PickerMode = {}));
const DateTimePickerBuilder = (props) => {
    const { field, dateTimePickerStyle, mode, locale, dateFormat, timeFormat, errorSpacing } = props;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [pickerMode, setPickerMode] = useState(mode);
    const formik = useFormikContext();
    const defaultDateFormat = dateFormat ? dateFormat : 'MMMM-DD';
    const defaultTimeFormat = timeFormat ? timeFormat : 'MMMM do, yyyy H:mma';
    useEffect(() => {
        const date = formik.values[field];
        if (locale) {
            setUpLocale(locale);
        }
        if (date) {
            if (pickerMode === PickerMode.Date) {
                setSelectedDate(date);
            }
            else {
                setSelectedTime(date);
            }
        }
    }, []);
    const handlePickerChange = (_event, date) => {
        setShowPicker(false);
        if (date) {
            if (pickerMode === PickerMode.Date) {
                setSelectedDate(date);
            }
            else if (pickerMode === PickerMode.Time) {
                setSelectedTime(date);
            }
            formik.setFieldValue(field, date).then(() => {
                formik.validateField(field);
            });
        }
    };
    const showPickerHandler = (mode) => {
        setShowPicker(true);
        setPickerMode(mode);
    };
    const closePickerModal = () => {
        setShowPicker(false);
    };
    const getFormattedLabel = () => {
        if (pickerMode === PickerMode.Date) {
            return formatDate(selectedDate, defaultDateFormat);
        }
        return formatDate(selectedTime, defaultTimeFormat);
    };
    const renderPicker = () => {
        return (<Modal isVisible={showPicker} onBackdropPress={closePickerModal} style={{ justifyContent: 'flex-end', margin: 0 }}>
                <View style={[dateTimePickerStyle === null || dateTimePickerStyle === void 0 ? void 0 : dateTimePickerStyle.calendarStyle, styles.calendarStyle]}>
                    <RNDateTimePicker value={pickerMode === PickerMode.Date ? selectedDate : selectedTime} mode={pickerMode} display="spinner" onChange={handlePickerChange} locale={locale}/>
                </View>
            </Modal>);
    };
    const renderPickerButton = () => {
        var _a;
        return (<TouchableOpacity onPress={() => showPickerHandler(mode)}>
            <View style={[styles.pickerContainer, dateTimePickerStyle === null || dateTimePickerStyle === void 0 ? void 0 : dateTimePickerStyle.pickerContainer]}>
                <Text style={[styles.pickerText, dateTimePickerStyle === null || dateTimePickerStyle === void 0 ? void 0 : dateTimePickerStyle.pickerText]}>{getFormattedLabel()}</Text>
            </View>
            <VerticalBox dimen={errorSpacing !== null && errorSpacing !== void 0 ? errorSpacing : 5}/>
            {formik.errors[field] && (<Text style={{ ...styles.error, ...dateTimePickerStyle === null || dateTimePickerStyle === void 0 ? void 0 : dateTimePickerStyle.error }}>
                    {(_a = formik.errors[field]) === null || _a === void 0 ? void 0 : _a.toString()}
                </Text>)}
        </TouchableOpacity>);
    };
    return (<View>
            {renderPickerButton()}
            {renderPicker()}
        </View>);
};
const styles = StyleSheet.create({
    pickerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        height: 50,
        margin: 20,
        borderRadius: 20,
    },
    pickerText: {
        fontSize: 16,
    },
    error: {
        color: 'red',
        paddingLeft: 20
    },
    calendarStyle: {
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    }
});
export default DateTimePickerBuilder;
