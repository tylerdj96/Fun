import React from 'react';
import { FlatList, StyleSheet, Text, View, Button, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../App';

export default class characterDetailScreen extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            isLoading: true,
            name : "",
            realm : "",
            class : "",
            race : "",
            gender : "",
            level : "",
            thumbnail : "",
            faction : "",
            totalHonorableKills : "",
            photos : "",
        }
    }

    onPressMe = () => {
        console.log("Pressed!!!")
    };



    async componentDidMount(){
        const {navigation} = this.props;
        this.state.name = navigation.getParam('characterName', '');
        this.state.realm = navigation.getParam('realm', '');
        const characterURI = 'https://us.api.battle.net/wow/character/'+this.state.realm+'/'+this.state.name+'?locale=en_US&apikey=352hb33zd7qt4skgssjz3k73vkk45egc';


        // fetch(characterURI)
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //         this.setState({
        //             dataSource: responseJson
        //         })
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });

        const response = await this.dataCall(characterURI);

        this.state.dataSource.thumbnail = this.state.dataSource.thumbnail.replace("avatar", "inset");

        const imageURI = 'http://render-us.worldofwarcraft.com/character/' + this.state.dataSource.thumbnail;
        console.log(imageURI);

        // return fetch(imageURI)
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //         this.setState({
        //             isLoading: false,
        //             photos: responseJson
        //         })
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });

        const imageresponse = await this.imageCall(imageURI);

    }

    dataCall = async (characterURI) => {
        let response = await fetch(characterURI);
        let json = await response.json();
        this.setState({dataSource: json, isLoading: false});

        console.log(this.state.dataSource);
    };

    imageCall = async (imageURI) => {
        let response = await fetch(imageURI);
        let image = await response;
        this.setState({photos: image});
        console.log(this.state.photos);
    };

    render() {

        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <Text>Loading...</Text>
                </View>
            )
        }

        return(
            <View style={{flex: 1, paddingTop:20}}>
                <Text>{this.state.dataSource.name}, {this.state.dataSource.realm}, {this.state.dataSource.class}, {this.state.dataSource.gender}, {this.state.dataSource.thumbnail}, {this.state.dataSource.faction}, {this.state.dataSource.totalHonorableKills}, {this.state.dataSource.level}</Text>}
                <Image
                    style={{width: 430, height: 200}}
                    source={{uri: 'http://render-us.worldofwarcraft.com/character/' + this.state.dataSource.thumbnail}}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
