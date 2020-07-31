//import liraries
import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Fire from "../Fire";
// create a component


const MyMemories = () => {

    

    return (
        <View style={styles.container}>
            <Text>MyMemories</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default MyMemories;
