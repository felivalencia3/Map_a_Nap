import React, {
    Component
} from 'react';
import {
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Text,
    Button
} from 'react-native';
import * as Expo from "expo"
export default class SoundPlayer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            soundReady: false
        }
    }
    componentWillMount() {
        Audio.setIsEnabledAsync(true)
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: true
        })
    }
    componentDidMount() {
        this.setupAudio();
    }
    async setupAudio() {
        this.alarmAudio = new Expo.Audio.Sound();
        await this.alarmAudio.loadAsync(require("../assets/sounds/alarm.mp3"));
        await this.setState({
            soundReady: true
        })
    };
    async playAudio() {
        try {
            await this.alarmAudio.setPositionAsync(0);
            await this.alarmAudio.playAsync();
        } catch (err) {
            console.error(err)
        }
    };
    componentWillUnmount() {
        this.alarmAudio.unloadAsync();
    }
    render() {
            if (this.state.soundReady) {
                this.playAudio();
                Alert.alert('You have arrived at your destination', "",
                [
                    {text: 'Cancel', style: 'cancel', onPress: () => this.alarmAudio.stopAsync()},
                ],
                { cancelable: false }
            )
            }
            return (
            <Text>WAKE UP</Text>
        )
    }
}