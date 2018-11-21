import React from "react";
import {Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import ModalFilterPicker from "react-native-modal-filter-picker";

export default class HomeScreen extends React.Component {

    constructor(props, ctx){
        super(props, ctx);
        //THIS SYNTAX IS INVALID AS OF ES6

        this.state={characterName:"", realmList:[], realm:"Select a realm!", visible: false, picked: 'Select a realm!'}
    }

    //REDUX can go here
    realmListMapper2 = () =>{
        var usable_list = [];
        for (var realm in this.state.realmList){
            var temp_object = {key: this.state.realmList[realm].name, label: this.state.realmList[realm].name};
            usable_list.push(temp_object);
        }
        return usable_list;
    };

    //REDUX
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

    //REDUX
    onPressMe = () => {
        this.props.navigation.navigate('Drawer',
            {
                characterName: this.state.characterName,
                realm: this.state.realm,
            })
    };

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

    //REDUX
    onShow = () => {
        this.setState({ visible: true });
    };


    //REDUX
    onSelect = (picked) => {
        this.setState({
            realm: picked,
            visible: false

        })
    };


    //REDUX
    onCancel = () => {
        this.setState({
            visible: false
        });
    }

}

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