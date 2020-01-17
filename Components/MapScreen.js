import React from "react";
import LogoTitle from "./LogoTitle";
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {View,Button,StyleSheet} from "react-native"

export default class MapScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({

        title: 'Map_a_Nap',
        headerTintColor: "45A29E",
        headerStyle: {
            backgroundColor: '#66FCF1'
        },
        headerTitle: <LogoTitle />,
        headerLeft: (
            <Button title={"Back"} onPress={()=>navigation.navigate("Home")} />
        )
    });
    constructor(props) {
        super(props)
        this.state = {
            userLat: null,
            userLong: null,
            mapRegion: null,
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            };
            this.setState({
                userLat: region.latitude,
                userLong: region.longitude,
                mapRegion: region,
                lastLat: region.latitude,
                lastLong: region.longitude
            });
        });
    }
    onRegionChange(region) {
        this.setState({
            mapRegion: region,
        });
    }
    onMapPress(e) {
        this.setState({
            marker: true
        });
        let region = {
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
            latitudeDelta: 0.00922 * 1.5,
            longitudeDelta: 0.00421 * 1.5
        };
        this.onRegionChange(region, region.latitude, region.longitude);
    }
    render() {
        let mapview = null
        if(this.state.mapRegion) {
            mapview = <MapView
            showsUserLocation
            ref={ map => { this.map = map }}
            provider={PROVIDER_GOOGLE}
            customMapStyle={mapStyle}
            style={styles.map}
            initialRegion={this.state.mapRegion}
            onRegionChange={this.onRegionChange.bind(this)}
            onPress={this.onMapPress.bind(this)}>
                <MapView.Marker
                        coordinate={{
                            latitude: (this.state.mapRegion.latitude) || 40.730610,
                            longitude: (this.state.mapRegion.longitude) || -73.935242
                        }}
                        >

                    </MapView.Marker>
        </MapView>
        }
        return (
            <View style={styles.container}>
                {mapview}
                <View style={styles.buttonContainer}>
                    <View style={styles.bubble}>
                        <Button title={"Next"} onPress={() => {
                                this.props.navigation.navigate("config", {
                                    userLat: this.state.userLat,
                                    userLong: this.state.userLong,
                                    lat: this.state.mapRegion.latitude,
                                    long: this.state.mapRegion.longitude
                                });
                            
                            
                        }}/>
                    </View>
                </View>
            </View>
        );
    }
}
const mapStyle = [{
    "elementType": "geometry",
    "stylers": [{
        "color": "#1d2c4d"
    }]
},
{
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#8ec3b9"
    }]
},
{
    "elementType": "labels.text.stroke",
    "stylers": [{
        "color": "#1a3646"
    }]
},
{
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#4b6878"
    }]
},
{
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#64779e"
    }]
},
{
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#4b6878"
    }]
},
{
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#334e87"
    }]
},
{
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [{
        "color": "#023e58"
    }]
},
{
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{
        "color": "#283d6a"
    }]
},
{
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#6f9ba5"
    }]
},
{
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [{
        "color": "#1d2c4d"
    }]
},
{
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#023e58"
    }]
},
{
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#3C7680"
    }]
},
{
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{
        "color": "#304a7d"
    }]
},
{
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#98a5be"
    }]
},
{
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [{
        "color": "#1d2c4d"
    }]
},
{
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{
        "color": "#2c6675"
    }]
},
{
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#255763"
    }]
},
{
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#b0d5ce"
    }]
},
{
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [{
        "color": "#023e58"
    }]
},
{
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#98a5be"
    }]
},
{
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [{
        "color": "#1d2c4d"
    }]
},
{
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#283d6a"
    }]
},
{
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [{
        "color": "#3a4762"
    }]
},
{
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{
        "color": "#0e1626"
    }]
},
{
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#4e6d70"
    }]
}
];
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bubble: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
});
