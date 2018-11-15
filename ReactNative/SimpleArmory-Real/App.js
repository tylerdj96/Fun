import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import characterDetailScreen from "./screens/characterDetailScreen";
import pvpDetailsScreen from "./screens/pvpDetailsScreen";
import ModalFilterPicker from 'react-native-modal-filter-picker'

class HomeScreen extends React.Component {

    constructor(props, ctx){
        super(props, ctx);
        //THIS SYNTAX IS INVALID AS OF ES6

        this.state={characterName:"", realmList:[], realm:"Select a realm!", visible: false, picked: 'Select a realm!'}
    }

    // realmListMapper = () =>{
    //     return( this.state.realmList.map( (x,i) => {
    //         return( <Picker.Item label={x.name} key={i} value={x.name}  />)} ));
    // };

    realmListMapper2 = () =>{
        var usable_list = [];
        for (var realm in this.state.realmList){
            var temp_object = {key: this.state.realmList[realm].name, label: this.state.realmList[realm].name};
            usable_list.push(temp_object);
        }
        return usable_list;
    };

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
        this.props.navigation.navigate('CharacterDetailScreen',
            {
            characterName: this.state.characterName,
            realm: this.state.realm,
            })
    }

    render() {
        const { visible} = this.state;

        return (
            <View>
                <Text style={{alignSelf: 'center', fontWeight: 'italics'}}>Welcome to Simple Armory Mobile!</Text>
                <TouchableOpacity style={styles.button} onPress={this.onShow}>
                    <Text>{this.state.realm}</Text>
                </TouchableOpacity>
                <ModalFilterPicker
                    visible={visible}
                    onSelect={this.onSelect}
                    onCancel={this.onCancel}
                    options={this.realmListMapper2()}
                />
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(characterName) => this.setState({characterName: characterName})}
                    value={this.state.characterName}
                />
                <Button
                    onPress={this.onPressMe}
                    title="Go!"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        );
    }
    onShow = () => {
        this.setState({ visible: true });
    }

    onSelect = (picked) => {
        this.setState({
            realm: picked,
            visible: false

        })
    }

    onCancel = () => {
        this.setState({
            visible: false
        });
    }

}

export default createStackNavigator(
    {
    Home: {
        screen: HomeScreen
    },
    CharacterDetailScreen: {
        screen: characterDetailScreen
    },
    PvPDetailScreen: {
        screen: pvpDetailsScreen
    },
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

    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    },
});
