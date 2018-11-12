import React from 'react';
import { FlatList, StyleSheet, Text, View, Button, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../App';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';

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

export default class pvpDetailsScreen extends React.Component {

  constructor(props){
      super(props);
      this.state ={
        pvp : {},
        twos : {},
        rbgs : {},
        threes : {},
        index : 0,
          routes: [
              { key: 'first', title: 'First' },
              { key: 'second', title: 'Second' },
          ],
          isLoading : true,
      }
  }

  async componentDidMount(){
        const {navigation} = this.props;
        this.state.pvp = navigation.getParam('pvp', '');
        // console.log(this.state.pvp);
        this.state.twos = this.state.pvp.brackets.ARENA_BRACKET_2v2;
        // console.log(this.state.twos.rating);
        this.state.threes = this.state.pvp.brackets.ARENA_BRACKET_3v3;
        this.state.rbgs = this.state.pvp.brackets.ARENA_BRACKET_RBG;
        this.setState({isLoading: false});

    };




    _handleIndexChange = index => this.setState({ index });

    _renderTabBar = props => <TabBar {...props} />;

    // _renderScene = SceneMap({
    //     first: FirstRoute,
    //     second: SecondRoute,
    // });

    _renderScene = ({ route }) => {
        console.log(route);
        return (
            <View style={[ styles.page, { backgroundColor: '#FFFFFF' } ]}>
                <Text>{route.rating}</Text>
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



const FirstRoute = () => (
    <View style={[{ backgroundColor: '#ff4081' }]} >
        <Text>{this.state.dataSource.twos.rating}</Text>
    </View>
);

const SecondRoute = () => (
    <View style={[{ backgroundColor: '#673ab7' }]} />
);
