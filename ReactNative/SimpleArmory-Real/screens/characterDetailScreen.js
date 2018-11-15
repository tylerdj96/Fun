import React from 'react';
import { FlatList, StyleSheet, Text, View, Button, Image } from 'react-native';

import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../App';


var raceDict = {

    1: "Human",
    2: "Orc",
    3: "Dwarf",
    4: "Night Elf",
    5: "Undead",
    6: "Tauren",
    7: "Gnome",
    8: "Troll",
    9: "Goblin",
    10: "Blood Elf",
    11: "Draenei",
    12: "Fel Orc",
    13: "Naga",
    14: "Broken",
    15: "Skeleton",
    16: "Vrykul",
    17: "Tuskarr",
    18: "Forest Troll",
    19: "Taunka",
    20: "Northrend Skeleton",
    21: "Ice Troll",
    22: "Worgen",
    23: "Gilnean",
    24: "Pandaren",
    25: "Pandaren",
    26: "Pandaren",
    27: "Nightborne",
    28: "Highmountain Tauren",
    29: "Void Elf",
    30: "Lightforged Draenei",
    31: "Zandalari Troll",
    32: "Kul Tiran",
    33: "Human",
    34: "Dark Iron Dwarf",
    35: "Vulpera",
    36: "Mag'har Orc",
};

var classDict = {
    1: "Warrior",
    2: "Paladin",
    3: "Hunter",
    4: "Rogue",
    5: "Priest",
    6: "Death Knight",
    7: "Shaman",
    8: "Mage",
    9: "Warlock",
    10: "Monk",
    11: "Druid",
    12: "Demon Hunter",
};

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
            pvp: {},
        }
    }

    async componentDidMount(){
        const {navigation} = this.props;
        this.state.name = navigation.getParam('characterName', '');
        this.state.realm = navigation.getParam('realm', '');
        const characterURI = 'https://us.api.battle.net/wow/character/'+this.state.realm+'/'+this.state.name+'?fields=pvp&locale=en_US&apikey=352hb33zd7qt4skgssjz3k73vkk45egc';

        const response = await this.dataCall(characterURI);

        //TOGGLE THIS LINE TO CHANGE AVATAR IMAGE TO INSET or BIG PHOTO FROM AVATAR (tiny square)

        // this.state.dataSource.thumbnail = this.state.dataSource.thumbnail.replace("avatar", "inset");
        //this.state.dataSource.thumbnail = this.state.dataSource.thumbnail.replace("avatar", "main");

        const imageURI = 'http://render-us.worldofwarcraft.com/character/' + this.state.dataSource.thumbnail;
        console.log(imageURI);


    }

    onPressMe = () => {
        this.props.navigation.navigate('PvPDetailScreen',
            {
            pvp: this.state.dataSource.pvp,
            })
    };

    dataCall = async (characterURI) => {
        let response = await fetch(characterURI);
        let responseStatus = await response.ok;
        if(responseStatus){
            let parsedJson = await response.json();
            //console.log(parsedJson);
            this.setState({dataSource: parsedJson, isLoading: false, isError: false});
        }
        else{
            this.setState({dataSource: "Error!!! Please try again!", isLoading: false, isError: true})
        }

        //Change ID's to human readable text

        this.setState({race:raceDict[this.state.dataSource.race]});
        this.setState({class:classDict[this.state.dataSource.class]});
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
            <View style={[styles.page, {backgroundColor: '#000000'}]}>
                <Button
                    onPress={this.onPressMe}
                    title="Player VS Player"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
                <Text style={{fontWeight: 'bold', color: '#FFFFFF'}}>{this.state.dataSource.name} </Text>
                <Text style={{color: '#FFFFFF'}}>{this.state.dataSource.realm}</Text>
                <Text style={{fontWeight: 'italics', color: '#FFFFFF'}}> Level {this.state.dataSource.level} {this.state.race} {this.state.class}</Text>
                <Image
                    style={{width: 200, height: 200}}
                    source={{uri: 'http://render-us.worldofwarcraft.com/character/' + this.state.dataSource.thumbnail}}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    tabbar: {
        backgroundColor: '#222',
    },
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicator: {
        backgroundColor: '#ffeb3b',
    },
    label: {
        color: '#fff',
        fontWeight: '400',
    },
});
