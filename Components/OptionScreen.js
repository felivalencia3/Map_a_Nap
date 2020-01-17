import React from "react";
import {KeepAwake} from "expo";
import {getDistance} from "geolib";
import LogoTitle from "./LogoTitle";
import {View,Text,Button, StyleSheet,TextInput} from "react-native"
export default class OptionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {meters: 0}
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
        let distanceFrom = 0;
        const userLat = navigation.getParam("userLat", 0),
            userLong = navigation.getParam("userLong", 0);
        const pickedLat = navigation.getParam("lat", 0);
        const pickedLong = navigation.getParam("long",0);
        if (!pickedLat && !pickedLong) {
            navigation.goBack()
        }
        distanceFrom = getDistance(
            {latitude: userLat, longitude: userLong},
            {latitude: pickedLat, longitude: pickedLong}
        );
        return(
            <View style={{alignItems:"center",justifyContent: "center",flex:1}}>
                <KeepAwake/>
                <Text style={{fontSize:16}}>Just one last thing!</Text>
                <Text style={{fontSize:16}}>You are currently, {distanceFrom} meters away from your selected point</Text>
                <Text style={{fontSize:16}}>How far away in meters would you like to be alerted?</Text>
                <TextInput
                    keyboardType={"number-pad"}
                    autoCorrect={false}
                    style={styles.input}
                    placeholder="Distance in meters"
                    onChangeText={(meters) => this.setState({meters})}
                />
                <Button title={"Ready?"} onPress={() =>  {
                    if (this.state.meters !== 0) {
                        navigation.navigate("Final", {
                            distance: distanceFrom,
                            meters: this.state.meters,
                            pickedCoords: {latitude: pickedLat, longitude: pickedLong},
                            userCoords: {latitude: userLat, longitude: userLong}
                        })
                    }
                }}/>
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

    },
    input: {width:"75%",height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: "white"}
});