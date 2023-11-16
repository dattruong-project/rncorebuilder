import React from 'react';
interface ChartConfig {
    backgroundColor?: string;
    backgroundGradientFrom?: string;
    backgroundGradientTo?: string;
    decimalPlaces?: number;
    color?: (opacity: number) => string;
    labelColor?: (opacity: number) => string;
    style?: {
        borderRadius?: number;
    };
    propsForDots?: {
        r: string;
        strokeWidth: string;
        stroke: string;
    };
}
interface ChartBuilderProps {
    data: any;
    chartType: 'line' | 'bar' | 'pie';
    accessor?: string;
    backgroundColor?: string;
    paddingLeft?: string;
    center?: [number, number];
    absolute?: boolean;
    chartConfig?: ChartConfig;
}
declare const ChartBuilder: React.FC<ChartBuilderProps>;
export default ChartBuilder;
