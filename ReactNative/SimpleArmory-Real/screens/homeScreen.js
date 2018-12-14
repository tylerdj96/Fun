import React from "react";
import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import ModalFilterPicker from "react-native-modal-filter-picker";
import {connect} from 'react-redux';
import {
    updateCharacter,
    updateRealm,
    updateVisible,
    updateRealmList,
    updateIsError,
    updateIsLoading
} from '../services/redux/actionCreators';
import {mapStateToProps} from '../services/redux/primary';
import {Root, Button, Icon, Text, Item, Input, Content, Header, Container, Spinner} from 'native-base'
import { Font, AppLoading } from "expo";

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
            return await fetch('https://us.api.battle.net/wow/realm/status?locale=en_US&apikey=352hb33zd7qt4skgssjz3k73vkk45egc', {method: 'GET', body: null})
            .then((response) => response.json())
            .then((responseJson) => {
                updateRealmList(responseJson.realms)

            })
            .catch((error) => {
                console.error(error);
            });
    }

    async componentWillMount() {
        updateIsLoading(true);
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
        updateIsLoading(false);
    }

    //REDUX
    onPressMe = () => {
        updateIsError(false);
        this.props.navigation.navigate('Drawer')
    };

    render() {
        const { visible} = this.props.visible;


        if(this.props.isLoading){
            return(
                <Container style={{backgroundColor: '#000000'}}>
                    <Header />
                    <Content contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
                        <Spinner color = 'white'/>
                    </Content>
                </Container>
            )
        }

        return (
            <Content style={{backgroundColor: '#000000'}}>
                <Header/>
                <Text style={{alignSelf: 'center', fontStyle: 'italic', color: 'white', padding: 50}}>Welcome to Simple Armory Mobile!</Text>

                <Button iconRight info onPress={this.onShow} style = {{padding: 10, alignSelf:'center'}}>
                    <Text>{this.props.realm}</Text>
                    <Icon name='globe'/>
                </Button>
                <ModalFilterPicker
                    visible={this.props.visible}
                    onSelect={this.onSelect}
                    onCancel={this.onCancel}
                    options={this.realmListMapper()}
                    />
                <Item rounded>
                    <Input placeholder="Character Name" placeholderTextColor = '#ffffff66' clearTextOnFocus={true} onChangeText={(characterName) => updateCharacter({name:characterName, race: "", level: "", class: "", totalHonorableKills: ""})} style = {{alignSelf:'center', textAlign: 'center', padding: 10, color: 'white'}}/>
                </Item>
                <Button iconRight success onPress={this.onPressMe} style = {{padding: 10, alignSelf:'center'}}>
                    <Text>Go</Text>
                    <Icon name='ios-search'/>
                </Button>
                <Text style = {[styles.noError, this.props.isError && styles.error]}>Invalid Search. Please Try Again.</Text>

                <Text>{this.props.realm}+{this.props.character.name}</Text>
            </Content>
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
    noError: {
        color: '#000000',
    },
    error:{
        color: 'red',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontStyle: 'italic',
        padding: 25

    }
});