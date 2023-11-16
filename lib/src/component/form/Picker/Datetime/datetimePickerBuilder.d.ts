import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
export declare enum PickerMode {
    Date = "date",
    Time = "time"
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
declare const DateTimePickerBuilder: React.FC<DateTimePickerProps>;
export default DateTimePickerBuilder;
