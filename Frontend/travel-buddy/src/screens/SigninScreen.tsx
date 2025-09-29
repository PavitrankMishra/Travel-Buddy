import { View, Text, Image, TextInput, Button } from 'react-native'
import React from 'react'

const SigninScreen = () => {
    return (
        <View className='bg-white h-full w-full'>
            <View className='h-[100%] w-full bg-dark-1 justify-start items-center gap-y-12 border-2 border-red-400 pt-20'>
                <View className='flex justify-center items-center gap-y-10 py-12'>
                    <Image className='h-[100] w-[105] ' source={require('../assets/Logo.png')}></Image>
                    <Text className='text-white text-3xl text-semibold  '>Travel. Note. Remember</Text>
                </View>
                <Text className='text-white text-3xl border-b-4 border-green-600 w-[80%]  rounded-2xl text-center'>LOGIN</Text>
                <View className='w-[80%] flex gap-y-8'>
                    <TextInput placeholder="Enter your email" className='border border-gray-400 w-full px-2 rounded-lg text-white h-14 tracking-wide' placeholderTextColor="#999"></TextInput>
                    <TextInput placeholder="Enter your email" className='border border-gray-400 w-full px-2 rounded-lg text-white h-14 tracking-wide' placeholderTextColor="#999"></TextInput>
                    <Button title="Submit" color="green"></Button>
                </View>
            </View>
        </View>
    )
}

export default SigninScreen;