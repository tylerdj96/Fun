import React from 'react';
import { FlatList, StyleSheet, Text, View, Button } from 'react-native';

export default class mountScreen extends React.Component {

    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

    onPressMe = () => {
        console.log("Pressed!!!")
    }

    componentDidMount(){
        return fetch('https://us.api.battle.net/wow/mount/?locale=en_US&apikey=352hb33zd7qt4skgssjz3k73vkk45egc')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.mountScreen
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {

        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <Text>Updating...</Text>
                </View>
            )
        }

        return(
            <View style={{flex: 1, paddingTop:20}}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) => <Text>{item.name}</Text>}

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
