import React, {Component} from "react";
import {Button, View, Text, StyleSheet,Alert,Vibration,VibrationIOS} from "react-native";
import {KeepAwake, Audio} from "expo";
import LogoTitle from "./LogoTitle";
import geolib from "geolib";
import SoundPlayer from "./SoundPlayer";

export default class AlertScreen extends Component {
    soundPlayer = <SoundPlayer />
    constructor(props) {
        super(props);
        this.updateCoords = this.updateCoords.bind(this);
        this.updateDistance = this.updateDistance.bind(this);
        this.checkDistance = this.checkDistance.bind(this);
        this.state = {
            playSound: false,
            meters: this.props.navigation.getParam("meters",0),
            distance: this.props.navigation.getParam("distanceFrom",0),
            pickedCoords: this.props.navigation.getParam("pickedCoords",null),
            userCoords: this.props.navigation.getParam("userCoords",null),
            arrived: false
        }
    }
    componentDidMount() {
        this.interval = setInterval(() => {this.updateCoords();this.updateDistance();this.checkDistance()}, 100);
    }
    checkDistance() {
        const DURATION = 1000;
        if (this.state.meters > this.state.distance) {
            clearInterval(this.interval);
            Vibration.vibrate();
            this.setState({playSound: true});

        }

    }
    updateCoords() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({userCoords: {latitude: position.coords.latitude, longitude: position.coords.longitude}})
        })
    }
    updateDistance() {
        const newDistance = geolib.getDistance(
            {latitude: this.state.userCoords.latitude, longitude: this.state.userCoords.longitude},
            {latitude: this.state.pickedCoords.latitude, longitude: this.state.pickedCoords.longitude}
        );
        this.setState({distance:newDistance})
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.checkDistance =! this.checkDistance.bind(this);
        this.updateCoords =! this.updateCoords.bind(this)
    }
    static navigationOptions = ({navigation}) => ({

        title: 'Map_a_Nap',
        headerTintColor: "45A29E",
        headerStyle: {
            backgroundColor: '#66FCF1'
        },
        headerTitle: <LogoTitle />,
        headerLeft: (
            <Button
                onPress={() => navigation.navigate('MyModal')}
                title="Info"
                color="rgb(0,0,0)"
            />
        )
    });
    render() {
        const {navigation} = this.props;
        const meters = navigation.getParam("meters",0),
            pickedCoords = navigation.getParam("pickedCoords",null),
            userCoords = navigation.getParam("userCoords",null);
        let soundPlayer = null;
        if (this.state.playSound) {
            soundPlayer = <SoundPlayer/>
        }
        return(
            <View style={{alignItems:"center",justifyContent: "center",flex:1}}>
                <KeepAwake/>
                {soundPlayer}
                <Text style={{fontSize:16}}>Meters: {this.state.meters};{"\n"} pickedLat: {pickedCoords.latitude}; pickedLong: {pickedCoords.longitude}</Text>
                <Text style={{fontSize:16}}>UserLat: {this.state.userCoords.latitude} UserLong: {this.state.userCoords.longitude}</Text>
                <Text style={{fontSize:16}}>Distance: {this.state.distance}</Text>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0B0C10',
        alignItems: 'center',
        justifyContent: 'center',

    }
});
