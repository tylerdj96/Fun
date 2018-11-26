import React from "react";
import {Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import ModalFilterPicker from "react-native-modal-filter-picker";
import {connect} from 'react-redux';
import {updateCharacter, updateRealm, updateVisible, updateRealmList} from '../services/redux/actionCreators';
import {mapStateToProps} from '../services/redux/primary';

class HomeScreen extends React.Component {

    constructor(props, ctx){
        super(props, ctx);
    }

    realmListMapper = () =>{
        var usable_list = [];

        for (var realm in this.props.realmList){
            var temp_object = {key: this.props.realmList[realm].name, label: this.props.realmList[realm].name};
            usable_list.push(temp_object);
        }
        return usable_list;
    };

    async componentDidMount(){
            return await fetch('https://us.api.battle.net/wow/realm/status?locale=en_US&apikey=352hb33zd7qt4skgssjz3k73vkk45egc')
            .then((response) => response.json())
            .then((responseJson) => {
                updateRealmList(responseJson.realms)

            })
            .catch((error) => {
                console.error(error);
            });
    }

    //REDUX
    onPressMe = () => {
        this.props.navigation.navigate('Drawer')
    };

    render() {
        const { visible} = this.props.visible;

        return (
            <View>
                <Text style={{alignSelf: 'center', fontStyle: 'italic'}}>Welcome to Simple Armory Mobile!</Text>
                <TouchableOpacity style={styles.button} onPress={this.onShow}>
                    <Text>{this.props.realm}</Text>
                </TouchableOpacity>
                <ModalFilterPicker
                    visible={this.props.visible}
                    onSelect={this.onSelect}
                    onCancel={this.onCancel}
                    options={this.realmListMapper()}
                    />
                <TextInput
                    style={{height: 40, borderColor: 'blue', borderWidth: 1}}
                    onChangeText={(characterName) => updateCharacter({name:characterName, race: "", level: "", class: "", totalHonorableKills: ""})}/>
                />
                <Button
                    onPress={this.onPressMe}
                    title="Go!"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"/>
                
                <Text>{this.props.realm}+{this.props.character.name}</Text>
            </View>
        );
    }

    onShow = () => {
        updateVisible(true);
    };

    onSelect = (realm) => {
        updateRealm(realm);
        updateVisible(false);
    };


    onCancel = () => {
        updateVisible(false);
    }

}


export default connect(mapStateToProps)(HomeScreen)

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