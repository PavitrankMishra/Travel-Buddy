import { View, Text } from 'react-native'
import React from 'react'

const HomeScreen = ({ navigation }) => {
    return (
        <View>
            <Text>HomeScreen</Text>
            <Text> Go to <Text onPress={() => navigation.navigate("SignIn")}>Login Page</Text></Text>
            <Text> Go to <Text onPress={() => navigation.navigate("SignIn")}>Login Page</Text></Text>
        </View>
    )
}

export default HomeScreen;