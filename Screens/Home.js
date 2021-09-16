import React, { Component } from 'react';
import Icons from "react-native-vector-icons/Feather";
import { Header, Card, Button, Icon } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from "react-native-animatable";
import Share from 'react-native-share';
import admob, { MaxAdContentRating, InterstitialAd, AdEventType, RewardedAd, RewardedAdEventType, BannerAd, TestIds, BannerAdSize, AdMobRewarded } from '@react-native-firebase/admob';
import { View, RefreshControl, Modal, Text, StyleSheet, TouchableOpacity, BackHandler, FlatList, ActivityIndicator, ToastAndroid, } from 'react-native';
let backHandlerClickCount = 0
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: undefined,
            isSelected: 1,
            theme: "light",
            color: undefined,
            refreshing: false,
            modalVisible: false,
            modal: undefined,
            language: undefined,
            tabData: undefined,
            Selected: '59',
        };
    }
    disableBackButton = () => {
        backHandlerClickCount += 1;
        if ((backHandlerClickCount < 2)) {
            ToastAndroid.show('Press again to exit the app', ToastAndroid.SHORT);
            setTimeout(function () {
                backHandlerClickCount = 0;
            }.bind(this), 2000);
            return true;
        } else {
            BackHandler.exitApp();
        }
    }
    myCustomShare = async (item) => {
        const shareOptions = {
            message: item.title,
            urls: [item.url, item.urlToImage]
            // urls: [files.image1, files.image2]
        }

        try {
            const ShareResponse = await Share.open(shareOptions);
            console.log(JSON.stringify(ShareResponse));
        } catch (error) {
            console.log('Error => ', error);
        }
    };
    async componentDidMount() {
        const value = await AsyncStorage.getItem('theme')
        this.setState({ color: value })
        const lan = await AsyncStorage.getItem('language')
        console.log(lan)
        this.setState({ language: lan })
        if (this.state.language == 'Hindi') {
            let Response = await fetch('https://newsapi.in/newsapi/category.php?lang=hindi');
            let resp = await Response.json();
            this.setState({ tabData: resp });
            console.log('Tab data     ====', this.state.tabData)

            if (this.state.Selected == '59') {
                let Response = await fetch('https://newsapi.in/newsapi/news.php?key=GzXLOELBz2IyTGaVPiFAwGSDg1xyjl&category=hindi');
                let resp = await Response.json();
                console.log("actual response   ====   ", resp)
                this.setState({ Data: resp });
            }
        }
        else {
            let Response = await fetch('https://newsapi.org/v2/top-headlines?country=in&apiKey=9f8546bfafa844cdacd65284a96654e4');
            let resp = await Response.json();
            this.setState({ Data: resp });
        }
        // Create a new instance
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
        ToastAndroid.show('Welcome', ToastAndroid.SHORT);
        BackHandler.addEventListener('hardwareBackPress', this.disableBackButton);

        this.onModal()
    }
    onModal = async () => {
        const modalValue = await AsyncStorage.getItem('modal')
        this.setState({ modal: modalValue })
        if (this.state.modal == undefined) {
            this.setState({ modalVisible: true });
            await AsyncStorage.setItem('modal', "true")
        }
    }
    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.get();
        if (this.state.Data.articles.length == 0) {
            ToastAndroid.show('No Data Available', ToastAndroid.SHORT);
        }
        else if (this.state.Data.articles.length >= 1) {
            console.log("length    ", this.state.Data.articles.length)
            ToastAndroid.show('Updated', ToastAndroid.SHORT);
        }
        this.setState({ refreshing: false });

    }

    getHindi = async (item) => {
        this.setState({ Selected: item.id })
        if (item.id == '59') {
            let Response = await fetch('https://newsapi.in/newsapi/news.php?key=GzXLOELBz2IyTGaVPiFAwGSDg1xyjl&category=hindi');
            let resp = await Response.json();
            console.log("actual response   ====   ", resp)
            this.setState({ Data: resp });
        }
        else if (item.id == '60') {
            let Response = await fetch('https://newsapi.in/newsapi/news.php?key=GzXLOELBz2IyTGaVPiFAwGSDg1xyjl&category=hindi_state');
            let resp = await Response.json();
            console.log("actual response   ====   ", resp)
            this.setState({ Data: resp });
        }
        else if (item.id == '61') {
            let Response = await fetch('https://newsapi.in/newsapi/news.php?key=GzXLOELBz2IyTGaVPiFAwGSDg1xyjl&category=hindi_world');
            let resp = await Response.json();
            console.log("actual response   ====   ", resp)
            this.setState({ Data: resp });
        }
        else if (item.id == '62') {
            let Response = await fetch('https://newsapi.in/newsapi/news.php?key=GzXLOELBz2IyTGaVPiFAwGSDg1xyjl&category=hindi_cricket');
            let resp = await Response.json();
            console.log("actual response   ====   ", resp)
            this.setState({ Data: resp });
        }
        else if (item.id == '64') {
            let Response = await fetch('https://newsapi.in/newsapi/news.php?key=GzXLOELBz2IyTGaVPiFAwGSDg1xyjl&category=hindi_national');
            let resp = await Response.json();
            console.log("actual response   ====   ", resp)
            this.setState({ Data: resp });
        }
        else if (item.id == '66') {
            let Response = await fetch('https://newsapi.in/newsapi/news.php?key=GzXLOELBz2IyTGaVPiFAwGSDg1xyjl&category=hindi_entertainment');
            let resp = await Response.json();
            console.log("actual response   ====   ", resp)
            this.setState({ Data: resp });
        }
        else if (item.id == '251') {
            let Response = await fetch('https://newsapi.in/newsapi/news.php?key=GzXLOELBz2IyTGaVPiFAwGSDg1xyjl&category=hindi_career');
            let resp = await Response.json();
            console.log("actual response   ====   ", resp)
            this.setState({ Data: resp });
        }
    }

    get = async (item) => {
        this.setState({ isSelected: item.key })
        if (item.key == 1) {
            let Response = await fetch('https://newsapi.org/v2/top-headlines?country=in&apiKey=9f8546bfafa844cdacd65284a96654e4');
            let resp = await Response.json();
            console.log("actual response   ====   ", resp)
            this.setState({ Data: resp });
        }
        else if (item.key == 2) {
            let Response = await fetch('https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=9f8546bfafa844cdacd65284a96654e4');
            let resp = await Response.json();
            console.log("actual response   ====   ", resp)
            this.setState({ Data: resp });
        }
        else if (item.key == 3) {
            let Response = await fetch('https://newsapi.org/v2/everything?q=bitcoin&apiKey=9f8546bfafa844cdacd65284a96654e4');
            let resp = await Response.json();
            console.log("actual response   ====   ", resp)
            this.setState({ Data: resp });
        }
        else if (item.key == 4) {
            let Response = await fetch('https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=9f8546bfafa844cdacd65284a96654e4');
            let resp = await Response.json();
            console.log("actual response   ====   ", resp)
            this.setState({ Data: resp });
        }
        else if (item.key == 5) {
            let Response = await fetch('https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=9f8546bfafa844cdacd65284a96654e4');
            let resp = await Response.json();
            console.log("actual response   ====   ", resp)
            this.setState({ Data: resp });
        }
        else if (item.key == 6) {
            let Response = await fetch('https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=9f8546bfafa844cdacd65284a96654e4');
            let resp = await Response.json();
            console.log("actual response   ====   ", resp)
            this.setState({ Data: resp });
        }
        else if (item.key == 7) {
            let Response = await fetch('https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=9f8546bfafa844cdacd65284a96654e4');
            let resp = await Response.json();
            console.log("actual response   ====   ", resp)
            this.setState({ Data: resp });
        }
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.disableBackButton);
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: this.state.color == "dark" ? "rgb(20, 21, 26)" : "#FFFFFF", flexDirection: 'column' }}>
                <Header
                    statusBarProps={{ barStyle: this.state.color == "dark" ? 'light-content' : "dark-content", backgroundColor: this.state.color == "dark" ? "rgb(20, 21, 26)" : "#ffbf00" }}
                    leftComponent={<Text style={{ color: this.state.color == "dark" ? "#ffbf00" : "#FFFFFF", fontSize: 20, fontWeight: '900' }}>Indinews</Text>}
                    rightComponent={<Icons name='settings' size={25} color={this.state.color == "dark" ? "#ffbf00" : "white"} onPress={() => this.props.navigation.navigate('Settings')} />}
                    containerStyle={{
                        backgroundColor: this.state.color == "dark" ? "rgb(20, 21, 26)" : "#ffbf00",

                    }}
                />
                <View style={{ height: 35, width: '100%' }}>
                    {this.state.language == 'Hindi' ?
                        <View style={{ flex: 1 }}>
                            {this.state.tabData != undefined &&
                                <FlatList
                                    data={this.state.tabData.Categories}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={true}
                                    renderItem={({ item }) =>
                                        <TouchableOpacity onPress={() => this.getHindi(item)}>
                                            <Animatable.View animation={"lightSpeedIn"} style={{ height: 40, width: "100%", justifyContent: 'center', marginHorizontal: 10 }}>
                                                <Text style={{ color: this.state.Selected == item.id ? "#ffbf00" : 'rgb(94, 102, 115)', fontWeight: this.state.Selected == item.id ? "bold" : '400', alignSelf: 'center' }}>{item.label_name}</Text>
                                                {
                                                    this.state.Selected == item.id && <View style={{ height: 3, width: "100%", backgroundColor: '#ffbf00', marginTop: 2, alignSelf: 'center' }} />
                                                }
                                            </Animatable.View>
                                        </TouchableOpacity>
                                    }

                                />
                            }
                        </View>
                        :
                        <FlatList
                            data={[
                                { key: 1, name: 'Top News' },
                                { key: 2, name: 'Buisness' },
                                { key: 3, name: 'Crypto' },
                                { key: 4, name: 'Entertainment' },
                                { key: 5, name: 'Health' },
                                { key: 6, name: 'Science' },
                                { key: 7, name: 'Sport' },
                            ]}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            renderItem={({ item }) =>
                                <TouchableOpacity onPress={() => this.get(item)}>
                                    <Animatable.View animation={"lightSpeedIn"} style={{ height: 40, width: "100%", justifyContent: 'center', marginHorizontal: 10 }}>
                                        <Text style={{ color: this.state.isSelected == item.key ? "#ffbf00" : 'rgb(94, 102, 115)', fontWeight: this.state.isSelected == item.key ? "bold" : '400', alignSelf: 'center' }}>{item.name}</Text>
                                        {
                                            this.state.isSelected == item.key && <View style={{ height: 3, width: "100%", backgroundColor: '#ffbf00', marginTop: 2, alignSelf: 'center' }} />
                                        }
                                    </Animatable.View>
                                </TouchableOpacity>
                            }

                        />}

                </View>
                {this.state.Data != undefined ?
                    <View>
                        {this.state.language == 'Hindi' ?
                            <FlatList
                                data={this.state.Data.News}
                                refreshControl={
                                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
                                }
                                renderItem={({ item }) =>
                                    <Card containerStyle={{ backgroundColor: this.state.color == "dark" ? "rgb(20, 21, 26)" : "#FFFFFF", borderColor: this.state.color == "dark" ? "rgb(94, 102, 115)" : "#E0E0E0" }}>
                                        {/* <Card.Title>HELLO WORLD</Card.Title>
                                <Card.Divider /> */}
                                        <Card.Image source={{ uri: item.image == null ? "https://media.istockphoto.com/vectors/vector-icon-world-news-colored-sticker-image-inscription-news-on-the-vector-id985191474?k=6&m=985191474&s=170667a&w=0&h=LRwLA3X1Ghpgw0G7qhVKmH5ggdX9MDwbRaMLkH1Nfqw=" : item.image }} style={{ justifyContent: 'flex-end' }}>
                                            <View style={{ backgroundColor: 'rgba(255,255,255, 0.5)', alignSelf: 'center', height: 30, width: "100%" }}>
                                                <Text numberOfLines={2} style={{ alignSelf: 'center', fontWeight: "900" }}>{item.title}</Text>
                                            </View>
                                        </Card.Image>
                                        <Card.Divider />
                                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}>
                                            <Button
                                                onPress={() => this.props.navigation.navigate('Detail', item)}
                                                buttonStyle={{ borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0, width: "90%", backgroundColor: '#ffbf00' }}
                                                title={this.state.language=="Hindi"?'पुरा पढ़े':'Read'} />
                                            <Button
                                                onPress={() => this.myCustomShare(item)}
                                                icon={<Icons name='share-2' color='white' size={20} />}
                                                buttonStyle={{ borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#ffbf00' }} />
                                        </View>

                                    </Card>
                                }
                            />
                            :
                            <FlatList
                                data={this.state.Data.articles}
                                refreshControl={
                                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
                                }
                                renderItem={({ item }) =>
                                    <Card containerStyle={{ backgroundColor: this.state.color == "dark" ? "rgb(20, 21, 26)" : "#FFFFFF", borderColor: this.state.color == "dark" ? "rgb(94, 102, 115)" : "#E0E0E0" }}>
                                        {/* <Card.Title>HELLO WORLD</Card.Title>
                                <Card.Divider /> */}
                                        <Card.Image source={{ uri: item.urlToImage == null ? "https://media.istockphoto.com/vectors/vector-icon-world-news-colored-sticker-image-inscription-news-on-the-vector-id985191474?k=6&m=985191474&s=170667a&w=0&h=LRwLA3X1Ghpgw0G7qhVKmH5ggdX9MDwbRaMLkH1Nfqw=" : item.urlToImage }} style={{ justifyContent: 'flex-end' }}>
                                            <View style={{ backgroundColor: 'rgba(255,255,255, 0.5)', alignSelf: 'center', height: 30, width: "100%" }}>
                                                <Text numberOfLines={2} style={{ alignSelf: 'center', fontWeight: "900" }}>{item.title}</Text>
                                            </View>
                                        </Card.Image>
                                        <Card.Divider />
                                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}>
                                            <Button
                                                onPress={() => this.props.navigation.navigate('Detail', item)}
                                                buttonStyle={{ borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0, width: "90%", backgroundColor: '#ffbf00' }}
                                                title='Read' />
                                            <Button
                                                onPress={() => this.myCustomShare(item)}
                                                icon={<Icons name='share-2' color='white' size={20} />}
                                                buttonStyle={{ borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#ffbf00' }} />
                                        </View>

                                    </Card>
                                }
                            />
                        }
                    </View>
                    :
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}><ActivityIndicator size="large" color="#ffbf00" /></View>
                }

                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                    <View style={[styles.centeredView, { backgroundColor: 'rgba(255,255,255, 0.5)' }]}>
                        <View style={styles.modalView}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Notice</Text>
                                <TouchableOpacity
                                    style={{ paddingHorizontal: 4 }}
                                    onPress={() => this.setState({ modalVisible: false })}>
                                    <Icon name='close' />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={{ marginTop: 10 }}>News Will Update Every Hour. </Text>
                                <Text style={{ marginTop: 5 }}>For New News Come Back After an Hour </Text>
                                <Text style={{ marginTop: 5 }}>Keep Enjoying Hourly News</Text>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>




        );
    }
}
const styles = StyleSheet.create({

    input: {
        width: 350,
        height: 55,
        padding: 10,
        marginTop: 40,
        fontSize: 18,
        fontFamily: 'sans-serif-condensed',
        fontWeight: 'bold',
        borderColor: '#363636',
        borderWidth: 2,
        borderRadius: 30
    },
    roundButton: {
        alignItems: "center",
        marginTop: 40,
        paddingVertical: 15,
        paddingHorizontal: 120,
        backgroundColor: "#363636",
        borderRadius: 1000,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5

    }

});
