import React, { Component } from 'react';
import { View, Image, Text, SafeAreaView, ScrollView, StatusBar, TouchableOpacity ,ToastAndroid} from 'react-native';
import * as Animatable from "react-native-animatable";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Language extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Selected:'Hindi',
        }
    }
    add = async () => {
        await AsyncStorage.setItem('language', this.state.Selected);
        const value = await AsyncStorage.getItem('language')
        ToastAndroid.show('Saved', ToastAndroid.SHORT);
        if(value!=undefined){
            this.props.navigation.navigate("Home");
        }
        else{
            ToastAndroid.show('Error', ToastAndroid.SHORT);
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:"#ffbf00" }}>
                <StatusBar
                    barStyle="dark-content"
                    // dark-content, light-content and default
                    hidden={false}
                    //To hide statusBar
                    backgroundColor="#ffbf00"
                    //Background color of statusBar only works for Android
                    translucent={false}
                    //allowing light, but not detailed shapes
                    networkActivityIndicatorVisible={true}
                />
                <View style={{flex:0.8,width:"85%",alignSelf:'center',justifyContent:'space-evenly'}}>
                <View style={{height:'20%',width:'100%',backgroundColor:'rgba(255,255,255, 0.5)',alignSelf:'center',borderRadius:15,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:34,fontWeight:'900',color:'white'}}>Select Language</Text>
                </View>
                <View style={{height:'50%',width:'100%',backgroundColor:'rgba(255,255,255, 0.5)',alignSelf:'center',borderRadius:15,alignItems:'center',justifyContent:'center'}}>
                       <TouchableOpacity style={{flexDirection:'row',width:'90%',height:'30%',borderRadius:15,borderWidth:this.state.Selected=='Hindi'? 3:1,borderColor:this.state.Selected=='Hindi'?'blue':'white',marginVertical:10,}} onPress={()=>this.setState({Selected:'Hindi'})}>
                        
                            <View style={{flex:0.5,justifyContent:'center',alignItems:'center'}}>
                            <Image style={{height:30,width:30}} source={require('../Assets/india.png')}/>
                            </View>
                            <View style={{flex:0.5,justifyContent:'center'}}>
                            <Text style={{fontSize:30,fontWeight:'900',color:this.state.Selected=='Hindi'?'blue':'white'}}>Hindi</Text>
                            </View>
                       
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection:'row',width:'90%',height:'30%',borderRadius:15,borderWidth:this.state.Selected=='English'? 3:1,borderColor:this.state.Selected=='English'?'blue':'white',marginVertical:10,}} onPress={()=>this.setState({Selected:'English'})}>
                        
                        <View style={{flex:0.5,justifyContent:'center',alignItems:'center'}}>
                            <Image style={{height:30,width:30}} source={require('../Assets/united-states.png')}/>
                            </View>
                            <View style={{flex:0.5,justifyContent:'center'}}>
                            <Text style={{fontSize:30,fontWeight:'900',color:this.state.Selected=='English'?'blue':'white'}}>English</Text>
                            </View>
                        </TouchableOpacity>
                </View>
                </View>
                <View style={{flex:0.2,width:"85%",alignSelf:'center',justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>this.add()} style={{height:'40%',width:'80%',backgroundColor:'rgba(255,255,255, 0.5)',alignSelf:'center',borderRadius:15,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:34,fontWeight:'900',color:'white'}}>Save</Text>
                </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}