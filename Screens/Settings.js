import React, { Component } from 'react';
import { View, Image, Text, SafeAreaView, ScrollView, StatusBar, TouchableOpacity,ToastAndroid } from 'react-native';
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/AntDesign";
import { Header, Button } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: undefined,
            language: undefined,
            setTheme:undefined,
            setLanguage:undefined
        };
    }
    async componentDidMount() {
        const value = await AsyncStorage.getItem('theme');
        this.setState({ theme: value });
        this.setState({ setTheme: value });
        console.log('theme',this.state.theme);
        const lan = await AsyncStorage.getItem('language')
        console.log(lan)
        this.setState({ language: lan })
        this.setState({ setLanguage: lan })
    }
    add = async () => {
        await AsyncStorage.setItem('theme', this.state.setTheme)
        const value = await AsyncStorage.getItem('theme')
        this.setState({ theme: value })
        await AsyncStorage.setItem('language', this.state.setLanguage);
        const lan = await AsyncStorage.getItem('language');
        this.setState({language:lan})
        ToastAndroid.show('Saved', ToastAndroid.SHORT);
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: this.state.theme == "dark" ? "rgb(20, 21, 26)" : "#ffbf00" }}>
                <StatusBar
                    barStyle={this.state.theme == "dark" ? "light-content" : "dark-content"}
                    backgroundColor={this.state.theme == "dark"?"rgb(20, 21, 26)":"#ffbf00"}
                    
                />
                <Header
                    statusBarProps={{ barStyle: this.state.color == "dark" ? 'light-content' : "dark-content", backgroundColor: this.state.color == "dark" ? "rgb(20, 21, 26)" : "#ffbf00" }}
                    leftComponent={<Icon name={"arrowleft"} size={25} color="#FFFFFF" onPress={() => this.props.navigation.goBack()} />}
                    containerStyle={{
                        backgroundColor: this.state.theme == "dark" ? "rgb(20, 21, 26)" : "#ffbf00",

                    }}
                />
                <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'center', width: '90%' }}>
                        <Text style={{ fontSize: 50, fontWeight: '900', color: this.state.theme == "dark" ? "rgb(94, 102, 115)" : "white" }}>Settings</Text>
                    </View>
                </View>
                <View style={{ height: 1, width: '90%', backgroundColor: this.state.theme == "dark" ? "rgb(94, 102, 115)" : "white", alignSelf: 'center' }} />



                <View style={{flex:0.7}}>
                <View style={{ flex: 0.1, width: "90%", flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
                    <View style={{ flex: 0.5, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 25, color: this.state.theme == "dark" ? "rgb(94, 102, 115)" : "white", fontWeight: '900' }}>language</Text>
                    </View>
                    <View style={{ flex: 0.5, flexDirection: 'row' }}>
                        <TouchableOpacity onPress={()=>this.setState({setLanguage:'Hindi'})} style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', borderWidth:this.state.setLanguage == "Hindi" ?3:1, borderColor: this.state.setLanguage == "Hindi" ? "rgb(94, 102, 115)" : "white", borderRadius: 5, marginVertical: 5 }}>
                            <Text style={{ fontSize: 18, color: this.state.setLanguage == "Hindi" ? "rgb(94, 102, 115)" : "white", fontWeight: '500' }}>Hindi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.setState({setLanguage:'English'})} style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', borderWidth:this.state.setLanguage == "English" ?3:1, borderColor: this.state.setLanguage == "English" ? "rgb(94, 102, 115)" : "white", borderRadius: 5, marginVertical: 5 }}>
                            <Text style={{ fontSize: 18, color: this.state.setLanguage == "English" ? "rgb(94, 102, 115)" : "white", fontWeight: '500' }}>English</Text>
                        </TouchableOpacity>
                    </View>
                </View>






                <View style={{ flex: 0.1, width: "90%", flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
                    <View style={{ flex: 0.5, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 25, color: this.state.theme == "dark" ? "rgb(94, 102, 115)" : "white", fontWeight: '900' }}>Theme</Text>
                    </View>
                    <View style={{ flex: 0.5, flexDirection: 'row' }}>
                        <TouchableOpacity onPress={()=>this.setState({setTheme:'dark'})} style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', borderWidth:this.state.setTheme=='dark'?3:1, borderColor: this.state.setTheme=='dark'?"rgb(94, 102, 115)" : "white", borderRadius: 5, marginVertical: 5 }}>
                            <Text style={{ fontSize: 18, color: this.state.setTheme == "dark" ? "rgb(94, 102, 115)" : "white", fontWeight: '500' }}>Dark</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.setState({setTheme:'light'})} style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', borderWidth: this.state.setTheme=='light'?3:1, borderColor: this.state.setTheme=='light'?"rgb(94, 102, 115)" : "white", borderRadius: 5, marginVertical: 5 }}>
                            <Text style={{ fontSize: 18, color: this.state.setTheme == "light" ? "rgb(94, 102, 115)" : "white", fontWeight: '500' }}>Light</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </View>
                <View style={{flex:0.1,justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>this.add()} style={{height:'70%',width:'80%',backgroundColor:this.state.theme=='dark'?"#ffbf00":'rgba(255,255,255, 0.5)',alignSelf:'center',borderRadius:15,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:34,fontWeight:'900',color:'white'}}>Save</Text>
                </TouchableOpacity>
                </View>
            </View>
        );
    }
}