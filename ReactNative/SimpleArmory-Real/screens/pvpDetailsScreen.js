import React from 'react';
import { FlatList, StyleSheet, Text, View, Button, Image } from 'react-native';
import {connect} from 'react-redux';
import { navigationOp } from 'react-navigation';
import {updateCharacter, updateRealm, updatePVP, updateVisible, updateRealmList, mapStateToProps} from '../App';

import {TabView, TabBar} from 'react-native-tab-view';

const determine_icon = (rating) => {
    if(rating==0){
        return 1;
    }
    else if(rating>=1 && rating <=1400){
        return 2;
    }
    else if(rating>1375 && rating <=1600){
        return 3;
    }
    else if(rating>1575 && rating <=1800){
        return 4;
    }
    else if(rating>1775 && rating <=2100){
        return 5;
    }
    else if(rating>2075 && rating <=2400){
        return 6;
    }
    else if(rating>2375){
        return 7;
    }
};

class pvpDetailsScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'PvP',
    };

  constructor(props){
      super(props);
      this.state ={
        // pvp : {},
        // twos : {},
        // rbgs : {},
        // threes : {},
        // images: [],
        index : 0,
          routes: [

          ],
          isLoading : true,
          isLoadingImages: true,
      }
  }

  async componentDidMount(){
        const {navigation} = this.props;

        this.state.pvp = navigation.getParam('pvp', '');
        console.log(this.state.pvp);

        this.state.twos = this.state.pvp.brackets.ARENA_BRACKET_2v2;
        this.state.threes = this.state.pvp.brackets.ARENA_BRACKET_3v3;
        this.state.rbgs = this.state.pvp.brackets.ARENA_BRACKET_RBG;

        this.state.routes.push({key: this.state.twos, title: '2v2'});
        this.state.routes.push({key: this.state.threes, title: '3v3'});
        this.state.routes.push({key: this.state.rbgs, title: 'RBG'});

        this.setState({isLoading: false});

        var image1 = require('../assets/UI_RankedPvP_01.png');
        var image2 = require('../assets/UI_RankedPvP_02.png');
        var image3 = require('../assets/UI_RankedPvP_03.png');
        var image4 = require('../assets/UI_RankedPvP_04.png');
        var image5 = require('../assets/UI_RankedPvP_05.png');
        var image6 = require('../assets/UI_RankedPvP_06.png');
        var image7 = require('../assets/UI_RankedPvP_07.png');

        this.state.images.push(image1);
        this.state.images.push(image2);
        this.state.images.push(image3);
        this.state.images.push(image4);
        this.state.images.push(image5);
        this.state.images.push(image6);
        this.state.images.push(image7);

        this.setState({isLoadingImages: false})

    };


    _handleIndexChange = index => this.setState({ index });

    _renderTabBar = props => <TabBar {...props} />;

    _renderScene = ({ route }) => {
        switch(determine_icon(route.key.rating)){
            case 1:
                var pvpimage = this.state.images[0];
                var icon_text = "No Data.";
                break;
            case 2:
                var pvpimage = this.state.images[1];
                var icon_text = "Unranked";
                break;
            case 3:
                var pvpimage = this.state.images[2];
                var icon_text = "Combatant";
                break;
            case 4:
                var pvpimage = this.state.images[3];
                var icon_text = "Challenger";
                break;
            case 5:
                var pvpimage = this.state.images[4];
                var icon_text = "Rival";
                break;
            case 6:
                var pvpimage = this.state.images[5];
                var icon_text = "Duelist";
                break;
            case 7:
                var pvpimage = this.state.images[6];
                var icon_text = "Gladiator";
                break;
        }
        return (
            <View style={[styles.page, {backgroundColor: '#000000'}]}>
                <Image source={pvpimage} style={{width: 250, height: 250}}></Image>
                <Text style ={{color: '#FFFFFF', fontWeight: 'bold'}}>{icon_text}</Text>
                <Text style ={{color: '#FFFFFF'}}>Rating: {route.key.rating}</Text>
            </View>
        );
    };

    render() {

        if(this.state.isLoading){
            return(
                <View>
                <Text>Loading...</Text>
                </View>

            );
        }


        return (
                <TabView
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderTabBar={this._renderTabBar}
                    onIndexChange={this._handleIndexChange}
                    initialLayout={{
                        width: 30,
                    }}
                />
            );
    }

}

export default connect(mapStateToProps)(pvpDetailsScreen)

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