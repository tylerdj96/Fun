import {createDrawerNavigator, createStackNavigator, DrawerActions, createMaterialTopTabNavigator} from 'react-navigation'

import HomeScreen from '../screens/homeScreen.js'
import characterDetailScreen from '../screens/characterDetailScreen.js'

//Drawers for Char->Other
import mountScreen from '../screens/mountScreen.js'

//Tab navigators
import {twosTabC, threesTabC, rbgTabC} from '../screens/pvpDetailsTabs.js'

export const pvpTabs = createMaterialTopTabNavigator({
    '2v2': {
        screen: twosTabC
    },  
    '3v3': {
        screen: threesTabC
    },
    RBG: {
        screen: rbgTabC
    }},
    {
        initialRouteName: '2v2'
    }
);

export const Drawer = createDrawerNavigator({
    Character: {
        screen: characterDetailScreen
    },
    PvP: {
        screen: pvpTabs
    },
    Mounts: {
        screen: mountScreen
    },
    },
{ drawerPosition: 'right'}

);

export const Stack = createStackNavigator({
        Home: {
            screen: HomeScreen
        },
        Drawer: {
            screen : Drawer
        },
    },
    {
        initialRouteName: 'Home'
    });


