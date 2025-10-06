import { View, Text } from 'react-native'
import React from 'react'
import "../../global.css";
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { Provider } from 'react-redux';
import store from '../store/store';

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