import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';
import { VerticalBox } from '../../../general/box';

import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import { formatDate, setUpLocale } from '../../../util';

export enum PickerMode {
    Date = 'date',
    Time = 'time',
}

type DateTimePickerProps = {
    field: string;
    dateTimePickerStyle?: {
        pickerContainer?: ViewStyle;
        pickerText?: TextStyle;
        error?: TextStyle;
        calendarStyle?: ViewStyle;
    };
    mode: PickerMode;
    locale?: string;
    dateFormat?: string;
    timeFormat?: string;
    errorSpacing?: number;
};

const DateTimePickerBuilder: React.FC<DateTimePickerProps> = (props: DateTimePickerProps) => {
    const { field, dateTimePickerStyle, mode, locale, dateFormat, timeFormat, errorSpacing } = props;
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedTime, setSelectedTime] = useState<Date>(new Date());
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [pickerMode, setPickerMode] = useState<PickerMode>(mode);
    const formik = useFormikContext<any>();
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
            } else {
                setSelectedTime(date);
            }
        }
    }, []);

    const handlePickerChange = (
        _event: DateTimePickerEvent,
        date?: Date
    ) => {
        setShowPicker(false);
        if (date) {
            if (pickerMode === PickerMode.Date) {
                setSelectedDate(date);
            } else if (pickerMode === PickerMode.Time) {
                setSelectedTime(date);
            }
            formik.setFieldValue(field, date).then(() => {
                formik.validateField(field);
            });
        }
    };

    const showPickerHandler = (mode: PickerMode) => {
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
        return (
            <Modal
                isVisible={showPicker}
                onBackdropPress={closePickerModal}
                style={{ justifyContent: 'flex-end', margin: 0 }}>
                <View style={[dateTimePickerStyle?.calendarStyle, styles.calendarStyle]}>
                    <RNDateTimePicker
                        value={pickerMode === PickerMode.Date ? selectedDate : selectedTime}
                        mode={pickerMode}
                        display="spinner"
                        onChange={handlePickerChange}
                        locale={locale}
                    />
                </View>
            </Modal>
        );
    };

    const renderPickerButton = () => (
        <TouchableOpacity onPress={() => showPickerHandler(mode)}>
            <View style={[styles.pickerContainer, dateTimePickerStyle?.pickerContainer]}>
                <Text style={[styles.pickerText, dateTimePickerStyle?.pickerText]}>{getFormattedLabel()}</Text>
            </View>
            <VerticalBox dimen={errorSpacing ?? 5} />
            {formik.errors[field] && (
                <Text style={{ ...styles.error, ...dateTimePickerStyle?.error }}>
                    {formik.errors[field]?.toString()}
                </Text>)}
        </TouchableOpacity>
    );

    return (
        <View>
            {renderPickerButton()}
            {renderPicker()}
        </View>
    );
}

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
