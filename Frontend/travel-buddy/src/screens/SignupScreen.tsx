import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Spinner from '../components/Spinner';

const SignupScreen = ({ navigation }) => {
  const [pressed, setPressed] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [customMessage, setCustomMessage] = useState("");
  function handleNavigation() {
    navigation.navigate("SignIn");
  }

  function handleUserNameInput(text) {
    setUserName(text);
  }
  function handleEmailInput(text) {
    setEmail(text)
  }

  function handlePasswordInput(text) {
    setPassword(text);
  }

  function handlePhoneInput(text) {
    setPhone(text);
  }

  async function handleSubmit() {
    try {
      setLoading(true);
      if (userName.length === 0 || email.length === 0 || password.length === 0 || phone.length === 0) {
        setLoading(false);
        throw new Error("All fields are required");
      }
      const res = await fetch("https://travel-buddy-r69f.onrender.com/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "userName": userName,
          "email": email,
          "password": password,
          "phone": phone
        })
      });

      const data = await res.json();
      if (data.success === true) {
        setTimeout(() => {
          navigation.navigate("SignIn");
          setCustomMessage("");
        }, 5000);
        setTimeout(() => {
          setLoading(false);
          setCustomMessage("User Registered successfully");
        }, 2000);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setLoading(false);
      setCustomMessage(err.message);
      setTimeout(() => {
        setCustomMessage("");
      }, 2000);
      console.log("The error is: ", err);
    }
  }

  return (
    <View className='h-full w-full -bg--color-dark--1 flex items-center pt-20'>
      <View className='flex justify-center items-center gap-y-8'>
        <Image className='h-[100] w-[105]' source={require('../assets/Logo.png')}></Image>
        <Text className='text-white text-2xl text-semibold tracking-widest'>Travel. Note. Remember</Text>
      </View>
      <View className='w-[80%] flex gap-y-8 items-center justify-center pt-8'>
        <Text className='text-white text-2xl border-b-4 border-green-600 w-full text-center rounded-2xl pb-2'>REGISTER</Text>
        <TextInput placeholder="Username" className='border border-gray-400 w-full px-2 rounded-lg text-white h-14 tracking-widest text-xl' placeholderTextColor="#999" value={userName} onChangeText={(text) => handleUserNameInput(text)}></TextInput>
        <TextInput placeholder="Email" className='border border-gray-400 w-full px-2 rounded-lg text-white h-14 tracking-widest text-xl' placeholderTextColor="#999" value={email} onChangeText={(text) => handleEmailInput(text)}></TextInput>
        <TextInput placeholder="Password" className='border border-gray-400 w-full px-2 rounded-lg text-white h-14 tracking-widest text-xl' placeholderTextColor="#999" value={password} onChangeText={(text) => handlePasswordInput(text)}></TextInput>
        <TextInput placeholder="Phone " className='border border-gray-400 w-full px-2 rounded-lg text-white h-14 tracking-widest text-xl' placeholderTextColor="#999" value={phone} onChangeText={(text) => setPhone(text)}></TextInput>
        <View className='w-full flex items-center gap-y-6'>
          <TouchableOpacity className={`w-full py-3 rounded-xl items-center ${pressed ? "bg-green-500" : "bg-green-600"}`} onPressIn={() => setPressed(true)} onPressOut={() => setPressed(false)} activeOpacity={0.8} onPress={() => handleSubmit()}>
            {loading ? (<Text><Spinner /></Text>) : (<Text className='text-white text-2xl font-medium tracking-wider'>Submit</Text>)}
          </TouchableOpacity>
          <View>
            <Text className='text-white tracking-wider text-xl'>Alreay a User ? <Text className='text-green-600 tracking-widest' onPress={() => handleNavigation()}>SignIn</Text></Text>
          </View>
          {customMessage ? (<View><Text className='text-white text-xl'>{customMessage}</Text></View>) : (<Text></Text>)}
        </View>
      </View>
    </View>
  )
}

export default SignupScreen;