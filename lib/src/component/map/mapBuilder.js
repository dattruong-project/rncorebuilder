import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
const MapBuilder = ({ initialRegion, markers, containerStyle, mapStyle, }) => {
    return (<View style={[styles.container, containerStyle]}>
      <MapView style={[styles.map, mapStyle]} initialRegion={initialRegion}>
        {markers.map((marker, index) => (<Marker key={index} coordinate={marker.coordinate} title={marker.title} description={marker.description}/>))}
      </MapView>
    </View>);
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
