import React, { Component } from 'react';
import { View, Image, Text, SafeAreaView, ScrollView, TextInput, StyleSheet, TouchableOpacity, BackHandler, Linking, StatusBar } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import Icons from "react-native-vector-icons/Feather";
import Share from 'react-native-share';
import { Header, Button } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from "react-native-animatable";
import admob, { MaxAdContentRating, InterstitialAd, AdEventType, RewardedAd, RewardedAdEventType, BannerAd, TestIds, BannerAdSize, AdMobRewarded } from '@react-native-firebase/admob';
export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      color: undefined,
      Data: this.props,
      language: undefined
    };
  }
  async componentDidMount() {
    const value = await AsyncStorage.getItem('theme')
    console.log(value)
    this.setState({ color: value })
    const lan = await AsyncStorage.getItem('language')
    console.log(lan)
    this.setState({ language: lan })
    const interstitialAd = InterstitialAd.createForAdRequest('ca-app-pub-1007228081785797/8359609937');
    // Add event handlers
    interstitialAd.onAdEvent((type, error) => {
      if (type === AdEventType.LOADED) {
        interstitialAd.show();
      }
    });
    // Load a new advert
    interstitialAd.load();

    admob()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,
      })
      .then(() => {
        // Request config successfully set!
      });
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }
  myCustomShare = async () => {
    const shareOptions = {
      message: this.props.route.params.title,
      urls: this.state.language=='Hindi'? [this.props.route.params.url,this.props.route.params.image]: [this.props.route.params.url, this.props.route.params.urlToImage]
      // urls: [files.image1, files.image2]
    }

    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log(JSON.stringify(ShareResponse));
    } catch (error) {
      console.log('Error => ', error);
    }
  };
  hindi=()=>{
    return(
<View style={{flex:1}}>
        <Image source={{ uri: this.props.route.params.image == null ? "https://media.istockphoto.com/vectors/vector-icon-world-news-colored-sticker-image-inscription-news-on-the-vector-id985191474?k=6&m=985191474&s=170667a&w=0&h=LRwLA3X1Ghpgw0G7qhVKmH5ggdX9MDwbRaMLkH1Nfqw=" : this.props.route.params.image }} style={{ width: '100%', flex: 0.25 }} />
        <View style={{ flex: 0.5, marginHorizontal: 10 }}>
          <Text style={{ alignSelf: 'center', marginTop: 10, fontSize: 25, color: 'rgb(94, 102, 115)' }}>{this.props.route.params.title}</Text>
          <Text style={{ marginTop: 5, fontSize: 15, color: 'rgb(94, 102, 115)' }}>Published on : <Text style={{ alignSelf: 'center', color: 'grey', fontSize: 15, fontWeight: 'bold' }}>{this.props.route.params.published_date}</Text></Text>
          <Text style={{ marginTop: 2, fontSize: 25, color: '#ffbf00' }}>--------------</Text>
          {this.props.route.params.description == null ? <BannerAd size={BannerAdSize.MEDIUM_RECTANGLE}
            unitId='ca-app-pub-1007228081785797/3970946392' /> :
            <Text animation={"fadeInRight"} style={{ alignSelf: 'center', fontSize: 20, marginBottom: 20, color: 'rgb(94, 102, 115)' }}>{this.props.route.params.description}</Text>
          }
        </View>
        <View style={{ flex: 0.25, flexDirection: 'column' }}>
          <View style={{ flex: 0.7, justifyContent: 'space-between' }} >
            <BannerAd size={BannerAdSize.ADAPTIVE_BANNER}
              unitId='ca-app-pub-1007228081785797/3970946392' />
            <BannerAd size={BannerAdSize.ADAPTIVE_BANNER}
              unitId='ca-app-pub-1007228081785797/6870789510' />
          </View>
          <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.shareBtn}>
              <Button
                onPress={() => Linking.openURL(this.props.route.params.url)}
                buttonStyle={{ borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#ffbf00', alignSelf: 'center', width: "80%" }}
                title='पुरा पढ़े' />
            </View>
            <View style={styles.shareBtn}>
              <Button
                onPress={() => this.myCustomShare()}
                icon={<Icons name='share-2' color='white' size={20} />}
                buttonStyle={{ borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#ffbf00', alignSelf: 'center', width: '80%' }} />
            </View>
          </View>
        </View>
        </View>
    )
  }
  english=()=>{
    return(
      <View style={{flex:1}}>
      <Image source={{ uri: this.props.route.params.urlToImage == null ? "https://media.istockphoto.com/vectors/vector-icon-world-news-colored-sticker-image-inscription-news-on-the-vector-id985191474?k=6&m=985191474&s=170667a&w=0&h=LRwLA3X1Ghpgw0G7qhVKmH5ggdX9MDwbRaMLkH1Nfqw=" : this.props.route.params.urlToImage }} style={{ width: '100%', flex: 0.25 }} />
      <View style={{ flex: 0.5, marginHorizontal: 10 }}>
        <Text style={{ alignSelf: 'center', marginTop: 10, fontSize: 25, color: 'rgb(94, 102, 115)' }}>{this.props.route.params.title}</Text>
        {
          this.props.route.params.author == null ? <View></View> : <Text style={{ marginTop: 10, fontSize: 15, color: 'rgb(94, 102, 115)' }}>By <Text style={{ alignSelf: 'center', marginTop: 10, fontSize: 15, fontWeight: 'bold', color: 'grey' }}>{this.props.route.params.author}</Text></Text>}
        <Text style={{ marginTop: 5, fontSize: 15, color: 'rgb(94, 102, 115)' }}>Source : <Text style={{ alignSelf: 'center', color: 'grey', fontSize: 15, fontWeight: 'bold' }}>{this.props.route.params.source.name}</Text></Text>
        <Text style={{ marginTop: 5, fontSize: 15, color: 'rgb(94, 102, 115)' }}>Published on : <Text style={{ alignSelf: 'center', color: 'grey', fontSize: 15, fontWeight: 'bold' }}>{this.props.route.params.publishedAt}</Text></Text>
        <Text style={{ marginTop: 2, fontSize: 25, color: '#ffbf00' }}>--------------</Text>
        {this.props.route.params.description == null ? <BannerAd size={BannerAdSize.MEDIUM_RECTANGLE}
          unitId='ca-app-pub-1007228081785797/3970946392' /> :
          <Text  style={{ alignSelf: 'center', fontSize: 20, marginBottom: 20, color: 'rgb(94, 102, 115)' }}>{this.props.route.params.description}</Text>
        }
      </View>
      <View style={{ flex: 0.25, flexDirection: 'column' }}>
        <View style={{ flex: 0.7, justifyContent: 'space-between' }} >
          <BannerAd size={BannerAdSize.ADAPTIVE_BANNER}
            unitId='ca-app-pub-1007228081785797/3970946392' />
          <BannerAd size={BannerAdSize.ADAPTIVE_BANNER}
            unitId='ca-app-pub-1007228081785797/6870789510' />
        </View>
        <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.shareBtn}>
            <Button
              onPress={() => Linking.openURL(this.props.route.params.url)}
              buttonStyle={{ borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#ffbf00', alignSelf: 'center', width: "80%" }}
              title='Read Full' />
          </View>
          <View style={styles.shareBtn}>
            <Button
              onPress={() => this.myCustomShare()}
              icon={<Icons name='share-2' color='white' size={20} />}
              buttonStyle={{ borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#ffbf00', alignSelf: 'center', width: '80%' }} />
          </View>
        </View>
      </View>
      </View>
    )
  }
  render() {
    console.log('Props        ',this.props)
    return (
      <View style={{ flex: 1, backgroundColor: this.state.color == "dark" ? "rgb(20, 21, 26)" : "#FFFFFF" }}>
        <Header
          statusBarProps={{ barStyle: this.state.color == "dark" ? 'light-content' : "dark-content", backgroundColor: this.state.color == "dark" ? "rgb(20, 21, 26)" : "#ffbf00" }}
          leftComponent={<Icon name={"arrowleft"} size={25} color="#FFFFFF" onPress={() => this.props.navigation.goBack()} />}
          containerStyle={{
            backgroundColor: this.state.color == "dark" ? "rgb(20, 21, 26)" : "#ffbf00",

          }}
        />
        {this.state.language =='Hindi' && this.hindi()}
        {this.state.language =='English' && this.english()}
      </View>
    );
  }
};
const styles = StyleSheet.create({
  shareBtn: {
    flex: 0.5,
    justifyContent: 'center',
  },
  shareTxt: {
    fontSize: 20,
    color: "#fff",
    alignSelf: "center"
  }
});
