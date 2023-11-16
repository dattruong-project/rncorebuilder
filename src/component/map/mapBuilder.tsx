import React from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

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

const MapBuilder: React.FC<MapComponentProps> = ({
  initialRegion,
  markers,
  containerStyle,
  mapStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <MapView style={[styles.map, mapStyle]} initialRegion={initialRegion}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapBuilder;
