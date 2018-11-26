import React from 'react';
import { StyleSheet, Text, View, Button, Image, Picker } from 'react-native';
import {Drawer} from "../services/navigators.js"
import {DrawerActions} from "react-native"
import {connect} from 'react-redux';
import {updateCharacter, updateRealm, updatePVP, updateVisible, updateRealmList, updateIsLoading, updateIsError, updateThumbnail, updateImages} from '../services/redux/actionCreators';
import {mapStateToProps} from '../services/redux/primary';

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

class characterDetailScreen extends React.Component {

    constructor(props){
        super(props);
        this.state ={
        //     isLoading: true,
        //     isError: false,
        //     name : "",
        //     realm : "",
             class : "",
             race : "",
        //     gender : "",
             level : "",
        //     thumbnail : "",
        //     faction : "",
             totalHonorableKills : "",
        //     photos : "",
        //     screen : "",
        //     pvp: {},
       }
    }

    async componentDidMount(){

        const characterURI = 'https://us.api.battle.net/wow/character/'+this.props.realm+'/'+this.props.character.name+'?fields=pvp&locale=en_US&apikey=352hb33zd7qt4skgssjz3k73vkk45egc';

        const response = await this.dataCall(characterURI);


    }

    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         title: 'Character',
    //     };
    // };

    onPressMe = () => {
        console.log(this.state.screen);
        this.props.navigation.navigate('PvP',
            {
            pvp: this.state.dataSource.pvp,
            })
    };

    dataCall = async (characterURI) => {
        let response = await fetch(characterURI);
        let responseStatus = await response.ok;
        if(responseStatus){
            let parsedJson = await response.json();

            var thumbnail_replacer = parsedJson.thumbnail;
            thumbnail_replacer = thumbnail_replacer.replace("avatar", "main");
            updateThumbnail(thumbnail_replacer);

            updateCharacter(parsedJson);
            updatePVP(parsedJson);
            

            var images = [];
            var image1 = require('../assets/UI_RankedPvP_01.png');
            var image2 = require('../assets/UI_RankedPvP_02.png');
            var image3 = require('../assets/UI_RankedPvP_03.png');
            var image4 = require('../assets/UI_RankedPvP_04.png');
            var image5 = require('../assets/UI_RankedPvP_05.png');
            var image6 = require('../assets/UI_RankedPvP_06.png');
            var image7 = require('../assets/UI_RankedPvP_07.png');

            images.push(image1);
            images.push(image2);
            images.push(image3);
            images.push(image4);
            images.push(image5);
            images.push(image6);
            images.push(image7);

            updateImages(images);

            updateIsLoading(false);
            updateIsError(false);
        }
        else{
            
            updateIsLoading(false);
            updateIsError(true);
        }

        //Change ID's to human readable text

        this.setState({race:raceDict[this.props.character.race]});
        this.setState({class:classDict[this.props.character.class]});

        //TOGGLE THIS LINE TO CHANGE AVATAR IMAGE TO INSET or BIG PHOTO FROM AVATAR (tiny square)

        //this.state.dataSource.thumbnail = this.state.dataSource.thumbnail.replace("avatar", "inset");
        // this.state.dataSource.thumbnail = this.state.dataSource.thumbnail.replace("avatar", "main");
        
        // var imageURI = 'http://render-us.worldofwarcraft.com/character/' + this.props.thumbnail;
        // updateThumbnail(imageURI);
        
        // this.setState({thumbnail: imageURI});
    };


    render() {

        <Drawer/>

        if(this.props.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <Text>Loading...</Text>
                </View>
            )
        }

        else if(this.props.isError){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <Text>Error! Please try again!</Text>
                </View>
            )
        }

        return(
            <View style={[styles.page, {backgroundColor: '#000000'}]}>
                <Text style={{fontWeight: 'bold', color: '#FFFFFF'}}>{this.props.character.name} </Text>
                <Text style={{color: '#FFFFFF'}}>Level {this.props.character.level} {this.state.race} {this.state.class}</Text>
                <Text style={{color: '#FFFFFF'}}>{this.props.realm}</Text>
                <Image
                    style={{width: 400, height: 600}}
                    source={{uri: 'http://render-us.worldofwarcraft.com/character/' + this.props.thumbnail}}
                />
            </View>
        );

    }

}

export default connect(mapStateToProps)(characterDetailScreen)

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


