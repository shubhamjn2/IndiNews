import React, { Component } from 'react';
import { View, Image, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import * as Animatable from "react-native-animatable";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme:undefined,
            language:undefined
        };
        setTimeout(() => {
            if(this.state.language!=undefined){
                this.props.navigation.navigate("Home");
            }
            else{
            this.props.navigation.navigate("Language");
            }
        }, 3000);
    }
    async componentDidMount() {
        const value = await AsyncStorage.getItem('theme');
        console.log(value);
        this.setState({theme:value});
        const lan= await AsyncStorage.getItem('language')
        console.log(lan)
        this.setState({language:lan})
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:this.state.theme == "dark" ? "rgb(20, 21, 26)" : "#ffbf00" }}>
                <StatusBar
                    barStyle={this.state.theme=="dark"?"light-content":"dark-content"}
                    // dark-content, light-content and default
                    hidden={false}
                    //To hide statusBar
                    backgroundColor={this.state.theme == "dark" ? "rgb(20, 21, 26)" : "#ffbf00"}
                    //Background color of statusBar only works for Android
                    translucent={false}
                    //allowing light, but not detailed shapes
                    networkActivityIndicatorVisible={true}
                />
                <Animatable.Text animation={"bounceInDown"} style={{ fontSize: 50, fontWeight: "bold", paddingBottom: 100, color:this.state.theme == "dark" ? "rgb(94, 102, 115)" : "#FFFFFF" , fontFamily: 'sans-serif-condensed' }}>IndiNews</Animatable.Text>

            </SafeAreaView>
        );
    }
}