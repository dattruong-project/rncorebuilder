import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
const ChartBuilder = ({ data, chartType, accessor, backgroundColor, paddingLeft, center, absolute, chartConfig, }) => {
    const defaultChartConfig = {
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16,
        },
        propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
        },
    };
    const mergedChartConfig = { ...defaultChartConfig, ...chartConfig };
    const chartProps = {
        width: Dimensions.get('window').width,
        height: 220,
        chartConfig: mergedChartConfig,
        accessor: accessor || 'population',
        backgroundColor: backgroundColor || 'transparent',
        paddingLeft: paddingLeft || '15',
        center: center || [10, 50],
        absolute: absolute || false,
    };
    const ChartComponent = chartType === 'line'
        ? LineChart
        : chartType === 'bar'
            ? BarChart
            : PieChart;
    return <ChartComponent data={data} {...chartProps}/>;
};
export default ChartBuilder;
