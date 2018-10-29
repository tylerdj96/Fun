import React from 'react';
import { FlatList, StyleSheet, Text, View, Button, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../App';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';

const FirstRoute = () => (
    <View style={[{ backgroundColor: '#ff4081' }]} />
);

const SecondRoute = () => (
    <View style={[{ backgroundColor: '#673ab7' }]} />
);

export default class pvpDetailsScreen extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'First' },
            { key: 'second', title: 'Second' },
        ],
    };

    _handleIndexChange = index => this.setState({ index });

    _renderTabBar = props => <TabBar {...props} />;

    _renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    render() {
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
