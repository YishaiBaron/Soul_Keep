import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";



const MemoryMain = (props) => {
    return (
        <View style={{alignItems: 'center', marginTop:40}}>
        <Text>Hello kjhh {props.name}
        </Text>
      </View>
    );
};

export default MemoryMain;