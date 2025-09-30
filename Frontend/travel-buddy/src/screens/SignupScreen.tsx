import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const SignupScreen = ({ navigation }) => {
  const [pressed, setPressed] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  function handleNavigation() {
    navigation.navigate("SignIn");
  }

  // function handleEmailInput() {
  //   setEmail()
  // }

  function handleSubmit() {

  }


  return (
    <View className='h-full w-full -bg--color-dark--1 flex items-center pt-12'>
      <View className='flex justify-center items-center gap-y-10 py-12 pt-20'>
        <Image className='h-[100] w-[105] ' source={require('../assets/Logo.png')}></Image>
        <Text className='text-white text-3xl text-semibold tracking-widest'>Travel. Note. Remember</Text>
      </View>
      <View className='w-[80%] flex gap-y-10 items-center justify-center'>
        <Text className='text-white text-3xl border-b-4 border-green-600 w-full text-center rounded-2xl pb-2'>REGISTER</Text>
        <TextInput placeholder="Username" className='border border-gray-400 w-full px-2 rounded-lg text-white h-14 tracking-widest text-2xl' placeholderTextColor="#999" value={userName}></TextInput>
        <TextInput placeholder="Email" className='border border-gray-400 w-full px-2 rounded-lg text-white h-14 tracking-widest text-2xl' placeholderTextColor="#999" value={email}></TextInput>
        <TextInput placeholder="Password" className='border border-gray-400 w-full px-2 rounded-lg text-white h-14 tracking-widest text-2xl' placeholderTextColor="#999" value={password}></TextInput>
        <TextInput placeholder="Phone " className='border border-gray-400 w-full px-2 rounded-lg text-white h-14 tracking-widest text-2xl' placeholderTextColor="#999" value={phone}></TextInput>
        <View className='w-full flex items-center gap-y-6'>
          <TouchableOpacity className={`w-full py-4 rounded-xl items-center ${pressed ? "bg-green-500" : "bg-green-600"}`} onPressIn={() => setPressed(true)} onPressOut={() => setPressed(false)} activeOpacity={0.8}>
            <Text className='text-white text-2xl font-medium tracking-wider'>Submit</Text>
          </TouchableOpacity>
          <View>
            <Text className='text-white tracking-wider text-xl'>Alreay a User ? <Text className='text-green-600 tracking-widest' onPress={() => handleNavigation()}>SignIn</Text></Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default SignupScreen;