import React from 'react';
import { FlatList, StyleSheet, Text, View, Button, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../App';

export default class characterDetailScreen extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            isLoading: true,
            isError: false,
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

    async componentDidMount(){
        const {navigation} = this.props;
        this.state.name = navigation.getParam('characterName', '');
        this.state.realm = navigation.getParam('realm', '');
        const characterURI = 'https://us.api.battle.net/wow/character/'+this.state.realm+'/'+this.state.name+'?locale=en_US&apikey=352hb33zd7qt4skgssjz3k73vkk45egc';

        const response = await this.dataCall(characterURI);

        this.state.dataSource.thumbnail = this.state.dataSource.thumbnail.replace("avatar", "inset");

        const imageURI = 'http://render-us.worldofwarcraft.com/character/' + this.state.dataSource.thumbnail;
        console.log(imageURI);


    }

    onPressMe = () => {
        this.props.navigation.navigate('PvPDetailScreen')
    }

    dataCall = async (characterURI) => {
        let response = await fetch(characterURI);
        let responseStatus = await response.ok;
        if(responseStatus){
            let parsedJson = await response.json();
            this.setState({dataSource: parsedJson, isLoading: false, isError: false});
        }
        else{
            this.setState({dataSource: "Error! Please try again!", isLoading: false, isError: true})
        }

        console.log(this.state.dataSource);
    };


    render() {

        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <Text>Loading...</Text>
                </View>
            )
        }

        else if(this.state.isError){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <Text>Error! Please try again!</Text>
                </View>
            )
        }

        return(
            <View style={{flex: 1, paddingTop:20}}>
                <Text>{this.state.dataSource.name}, {this.state.dataSource.realm}, {this.state.dataSource.class}, {this.state.dataSource.gender}, {this.state.dataSource.faction}, {this.state.dataSource.totalHonorableKills}, {this.state.dataSource.level}</Text>}
                <Button
                    onPress={this.onPressMe}
                    title="Tabs Page"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
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
