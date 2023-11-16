import React from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import { Region } from 'react-native-maps';
interface MarkerInfo {
    coordinate: {
        latitude: number;
        longitude: number;
    };
    title: string;
    description: string;
}
interface MapComponentProps {
    initialRegion: Region;
    markers: MarkerInfo[];
    containerStyle?: StyleProp<ViewStyle>;
    mapStyle?: StyleProp<ViewStyle>;
}
declare const MapBuilder: React.FC<MapComponentProps>;
export default MapBuilder;
