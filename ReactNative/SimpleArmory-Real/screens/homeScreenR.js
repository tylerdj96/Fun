import React from "react";
import {Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import ModalFilterPicker from "react-native-modal-filter-picker";
import {connect} from 'react-redux';
import {updateCharacter, updateRealm, updatePVP, updateVisible, updateRealmList} from '../services/redux/actionCreators';
import {mapStateToProps} from '../services/redux/primary';

class HomeScreenR extends React.Component {

    // update = (newName) => {
    //     this.props.dispatch({type: 'UPDATE'}, newName);
    // }

    constructor(props, ctx){
        super(props, ctx);
        //THIS SYNTAX IS INVALID AS OF ES6

        this.state={characterName:"", realmList:[], realm:"Select a realm!", visible: false, picked: 'Select a realm!'}
    }

    //REDUX can go here
    realmListMapper2 = () =>{
        var usable_list = [];

        for (var realm in this.props.realmList){
            var temp_object = {key: this.props.realmList[realm].name, label: this.props.realmList[realm].name};
            usable_list.push(temp_object);
        }
        return usable_list;
    };

    //REDUX
    async componentDidMount(){
        return await fetch('https://us.api.battle.net/wow/realm/status?locale=en_US&apikey=352hb33zd7qt4skgssjz3k73vkk45egc')
            .then((response) => response.json())
            .then((responseJson) => {
                // this.setState({
                //     realmList: responseJson.realms
                // })
                updateRealmList(responseJson.realms)

            })
            .catch((error) => {
                console.error(error);
            });
    }

    //REDUX
    onPressMe = () => {
        this.props.navigation.navigate('Drawer',
            {
                // characterName: this.state.characterName,
                // realm: this.state.realm,
            })
    };

    render() {
        const { visible} = this.props.visible;
        //console.log(this.props.visible);

        return (
            <View>
                <Text style={{alignSelf: 'center', fontWeight: 'italics'}}>Welcome to Simple Armory Mobile!</Text>
                <TouchableOpacity style={styles.button} onPress={this.onShow}>
                    <Text>{this.props.realm}</Text>
                </TouchableOpacity>
                <ModalFilterPicker
                    visible={this.props.visible}
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
                <TextInput
                    style={{height: 40, borderColor: 'blue', borderWidth: 1}}
                    onChangeText={(characterName) => updateCharacter(characterName)}/>
                <Button
                    
                    title="REDUX"
                    />
                <Text>{this.props.realm}+{this.props.charName}</Text>
            </View>
        );
    }

    //REDUX
    onShow = () => {
        //this.setState({ visible: true });
        updateVisible(true);
    };


    //REDUX
    onSelect = (realm) => {
        // this.setState({
        //     realm: picked,
        //     visible: false

        // })
        updateRealm(realm);
        updateVisible(false);
    };


    //REDUX
    onCancel = () => {
        // this.setState({
        //     visible: false
        // });
        updateVisible(false);
    }

}


export default connect(mapStateToProps)(HomeScreenR)

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