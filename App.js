import React from 'react';
import {Button, Image, ImageBackground, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack"
import MapScreen from "./Components/MapScreen";
import OptionScreen from "./Components/OptionScreen";
import AlertScreen from "./Components/AlertScreen";

class LogoTitle extends React.Component {
    render() {
        return (
            <Image
                source={require('./assets/icon.png')}
                style={{ width: 30, height: 30 }}
            />
        );
    }
}
class HomeScreen extends React.Component {
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
    //<Button title={"Start"} onPress={() => this.props.navigation.navigate("Map")}/>
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={{uri: 'https://i.pinimg.com/originals/b7/2e/dd/b72edd732dbc4052f42660064fd462c9.jpg'}} style={{width: '100%', height: '100%'}}>
                <View style={styles.para}>
                    <Text style={styles.textBig}>Welcome to Map a Nap!</Text>
                <Text style={styles.textSmall}>A Location based Alarm!</Text>
                <Text style={styles.textSmall}>For more information tap "Info" at the top-left corner</Text>
                </View>

                <TouchableHighlight
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate("Map")}>
                    <Text> Start </Text>
                </TouchableHighlight>
                </ImageBackground>
            </View>
        );
    }
}
class ModalScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textBig}>This is a modal!</Text>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Dismiss"
                />
            </View>
        );
    }
}
const MainStack = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        Map: {
            screen: MapScreen,
        },
        config: {
            screen: OptionScreen,
        },
        Final: {
            screen: AlertScreen,
        },
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'rgb(0,0,0)',
            },
            headerTintColor: 'rgb(0,0,0)',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
);
const RootStack = createStackNavigator(
    {
        Main: {
            screen: MainStack,
        },
        MyModal: {
            screen: ModalScreen,
        },
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);
const AppContainer = createAppContainer(RootStack);
export default class App extends React.Component {
    render() {
        return <AppContainer/>;
    }
}
export const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#0B0C10',
        alignItems: 'center',
        justifyContent: 'space-between',

  },
    para: {
        paddingTop: 10,
      marginBottom: 400,
        marginLeft: 15
    },
    textBig: {
      fontSize: 32,
      color: "#C5C6C7"
    },
    textSmall: {
        marginTop: 10,
        fontSize: 20,
        color: "#C5C6C7"
    },
    button: {
        marginBottom: 400,
        width: 150,
        marginLeft: 200,
        alignItems: 'center',
        backgroundColor: '#66FCF1',
        padding: 30
    },

});
