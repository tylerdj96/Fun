import React from 'react';
import { FlatList, StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class getCharacterInfo extends React.Component {

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
        return fetch('https://us.api.battle.net/wow/character/+'+this.state.realm+'/'+this.state.characterName+'?locale=en_US&apikey=352hb33zd7qt4skgssjz3k73vkk45egc')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    name: responseJson.name,
                    realm : responseJson.realm,
                    class : responseJson.class,
                    race : responseJson.race,
                    gender : responseJson.gender,
                    level : responseJson.level,
                    thumbnail : responseJson.thumbnail,
                    faction : responseJson.faction,
                    totalHonorableKills : responseJson.totalHonorableKills
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {

        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <Text>Updating...</Text>
                </View>
            )
        }

        return(
            <View style={{flex: 1, paddingTop:20}}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) => <Text>{item.name}, {item.realm}, {item.class}, {item.race}, {item.gender}, {item.thumbnail}, {item.faction}, {item.totalHonorableKills}, {item.level}</Text>}

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
