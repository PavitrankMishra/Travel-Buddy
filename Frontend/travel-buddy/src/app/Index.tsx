import { View, Text } from 'react-native'
import React from 'react'
import "../../global.css";
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const Index = () => {
    return (
        <Stack.Navigator initialRouteName='SignIn'>
            <Stack.Screen name='SignIn' component={SigninScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignupScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default Index;