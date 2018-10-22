import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import firstPage from './screens/firstPage'

class HomeScreen extends React.Component {

    onPressMe = () => {
        this.props.navigation.navigate('FirstPage')
    }

    render() {
        return (
            <View style={styles.container}>
                <Picker></Picker>
                <Text>Open up App.js to start working on your app!</Text>
                <Button
                    onPress={this.onPressMe}
                    title="Learn More"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>

        );
    }
}
class FirstPage extends React.Component{
    render(){
        return(
            <Text>Butt</Text>
        );
    }
}

export default createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    FirstPage: {
        screen: firstPage
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
