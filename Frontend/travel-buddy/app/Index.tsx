import { View, Text } from 'react-native'
import React from 'react'
import "../global.css"
import SigninScreen from '@/src/screens/SigninScreen';
import SignupScreen from '@/src/screens/SignupScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/src/screens/HomeScreen';
import { Provider } from 'react-redux';
import store from '../src/store/store';

const Stack = createNativeStackNavigator();
const Index = () => {
    return (
        <Provider store={store}>
            <Stack.Navigator initialRouteName='SignIn'>
                <Stack.Screen name='SignIn' component={SigninScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignupScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </Provider>
    )
}

export default Index;