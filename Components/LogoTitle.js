import React, {Component} from "react";
import {Button, Image} from "react-native";

export default class LogoTitle extends Component {
    render() {
        return (
            <Image
                source={require('../assets/icon.png')}
                style={{ width: 30, height: 30 }}
            />
        );
    }
}