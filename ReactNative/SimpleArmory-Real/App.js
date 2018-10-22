import React from 'react';
import { StyleSheet, Text, View, Button, Picker, TextInput } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import mountScreen from './screens/mountScreen'
import characterDetailScreen from "./screens/characterDetailScreen";
import getCharacterInfo from "./services/getCharacterInfo";

class HomeScreen extends React.Component {

    constructor(props){
        super(props);
        //THIS SYNTAX IS INVALID AS OF ES6
        // this.characterName = null;
        // this.realm = ["null"];
        this.state={characterName:"", realmList:[], realm:""}
    }

    realmListMapper = () =>{
        return( this.state.realmList.map( (x,i) => {
            return( <Picker.Item label={x.name} key={i} value={x.name}  />)} ));
    }

    componentDidMount(){
        return fetch('https://us.api.battle.net/wow/realm/status?locale=en_US&apikey=352hb33zd7qt4skgssjz3k73vkk45egc')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    realmList: responseJson.realms
                })

            })
            .catch((error) => {
                console.error(error);
            });
    }

    onPressMe = () => {
        // console.log("HERE11")
        // console.log(this.state.characterName)
        // console.log(this.state.realm)
        this.props.navigation.navigate('CharacterDetailScreen',
            {
            characterName: this.state.characterName,
            realm: this.state.realm,
            })
    }

    render() {
        return (
            <View>
                <Text>Welcome to Simple Armory Mobile!</Text>
                <Picker
                    selectedValue={this.state.realm}
                    onValueChange={(itemValue) => this.setState({realm: itemValue})}>
                    {this.realmListMapper()}

                </Picker>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(characterName) => this.setState({characterName: characterName})}
                    value={this.state.characterName}
                />
                <Button
                    onPress={this.onPressMe}
                    title="Character Details Please!"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>

        );
    }
}

export default createStackNavigator(
    {
    Home: {
        screen: HomeScreen
    },
    CharacterDetailScreen: {
        screen: characterDetailScreen,
    }
    },
    {
        initialRouteName: 'Home'
    }
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
