import React from 'react';
import { FlatList, StyleSheet, Text, View, Button } from 'react-native';
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
            totalHonorableKills : ""}
    }

    onPressMe = () => {
        console.log("Pressed!!!")
    }

    componentDidMount(){
        const {navigation} = this.props;
        this.state.name = navigation.getParam('characterName', '');
        this.state.realm = navigation.getParam('realm', '');
        console.log(this.state.realm);
        console.log(this.state.name)
        const characterURI = 'https://us.api.battle.net/wow/character/'+this.state.realm+'/'+this.state.name+'?locale=en_US&apikey=352hb33zd7qt4skgssjz3k73vkk45egc'
        console.log(characterURI)
        return fetch('https://us.api.battle.net/wow/character/'+this.state.realm+'/'+this.state.name+'?locale=en_US&apikey=352hb33zd7qt4skgssjz3k73vkk45egc')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson
                    // name: responseJson.name,
                    // realm : responseJson.realm,
                    // class : responseJson.class,
                    // race : responseJson.race,
                    // gender : responseJson.gender,
                    // level : responseJson.level,
                    // thumbnail : responseJson.thumbnail,
                    // faction : responseJson.faction,
                    // totalHonorableKills : responseJson.totalHonorableKills
                })
                console.log(this.state.dataSource);
                console.log(this.state.dataSource.name);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {

        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <Text>{this.state.name}</Text>
                </View>
            )
        }

        return(
            <View style={{flex: 1, paddingTop:20}}>
                <Text>{this.state.dataSource.name}, {this.state.dataSource.realm}, {this.state.dataSource.class}, {this.state.dataSource.gender}, {this.state.dataSource.thumbnail}, {this.state.dataSource.faction}, {this.state.dataSource.totalHonorableKills}, {this.state.dataSource.level}</Text>}

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
