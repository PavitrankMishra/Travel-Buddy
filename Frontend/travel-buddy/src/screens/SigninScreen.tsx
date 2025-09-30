import { View, Text, Image, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const SigninScreen = ({navigation}) => {
    const [pressed, setPressed] = useState(false);
    console.log(pressed);
    function handleNavigation() {
        navigation.navigate("SignUp");
    };
    return (
        <View className='bg-white h-full w-full '>
            <View className='h-[100%] w-full -bg--color-dark--1 justify-start items-center pt-20 '>
                <View className='flex justify-center items-center gap-y-10 py-12 '>
                    <Image className='h-[100] w-[105] ' source={require('../assets/Logo.png')}></Image>
                    <Text className='text-white text-3xl text-semibold tracking-widest'>Travel. Note. Remember</Text>
                </View>

                <View className='w-[80%] flex gap-y-10 items-center justify-center'>
                    <Text className='text-white text-3xl border-b-4 border-green-600 w-full  rounded-2xl text-center pb-2'>LOGIN</Text>

                    <TextInput placeholder="Enter your email" className='border border-gray-400 w-full px-2 rounded-lg text-white h-14 tracking-widest text-xl' placeholderTextColor="#999"></TextInput>
                    <TextInput placeholder="Enter your Password" className='border border-gray-400 w-full px-2 rounded-lg text-white h-14 tracking-widest text-xl' placeholderTextColor="#999"></TextInput>
                    <View className='w-full flex items-center gap-y-6'>
                        <TouchableOpacity className={`w-full py-4 rounded-xl items-center ${pressed ? "bg-green-500" : "bg-green-600"}`} onPressIn={() => setPressed(true)} onPressOut={() => setPressed(false)} activeOpacity={0.8}>
                            <Text className='text-white text-2xl font-medium tracking-wider'>Submit</Text>
                        </TouchableOpacity>
                        <View>
                            <Text className='text-white tracking-wider text-xl'>New User ? <Text className='text-green-600' onPress={() => handleNavigation()}>Signup</Text></Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default SigninScreen;