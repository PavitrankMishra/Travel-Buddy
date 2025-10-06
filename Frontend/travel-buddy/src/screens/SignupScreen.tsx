import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetState } from '../store/slice/UserRegistrationSlice';

const SignupScreen = ({ navigation }) => {
  // State the toggles if button is pressed
  const [pressed, setPressed] = useState<boolean>(false);

  // Stores the userName of the user
  const [userName, setUserName] = useState<string>("");

  // Stores the email of the user
  const [email, setEmail] = useState<string>("");

  // Stores the password of the user
  const [password, setPassword] = useState<string>("");

  // Stores the phone number of the user
  const [phone, setPhone] = useState<string>("");

  // Function that navigates to SignIn page
  function handleNavigation() {
    navigation.navigate("SignIn");
  }

  // Function that updates the userName state
  function handleUserNameInput(text) {
    setUserName(text);
  }

  // Function that updates the email state
  function handleEmailInput(text) {
    setEmail(text)
  }

  // Function that updates the password state
  function handlePasswordInput(text) {
    setPassword(text);
  }

  // Function that updates the phone state
  function handlePhoneInput(text) {
    setPhone(text);
  }

  const dispatch = useDispatch();

  const registerSuccess = useSelector((state: any) => state.userRegistration.success);
  const registerLoading = useSelector((state: any) => state.userRegistration.loading);
  const registerError = useSelector((state: any) => state.userRegistration.error);
  const registerMessage = useSelector((state: any) => state.userRegistration.message);

  // Function that handles user registration process
  // Function that does a POST request to register user
  // Throws error if either of userName, email, password and phone are empty
  async function handleSubmit() {
    const registerData = {
      userName: userName,
      email: email,
      password: password,
      phone: phone,
    }
    dispatch(registerUser(registerData));
  }

  useEffect(() => {
    if (registerError === true) {
      setTimeout(() => {
        dispatch(resetState());
      }, 2000);
    } else if(registerSuccess === true) {
      setTimeout(() => {
        navigation.navigate("SignIn");
        dispatch(resetState());
      }, 2000);
    }
  }, [registerSuccess, registerError]);

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
            {registerLoading ? (<Text><Spinner /></Text>) : (<Text className='text-white text-2xl font-medium tracking-wider'>Submit</Text>)}
          </TouchableOpacity>
          <View>
            <Text className='text-white tracking-wider text-xl'>Alreay a User ? <Text className='text-green-600 tracking-widest' onPress={() => handleNavigation()}>SignIn</Text></Text>
          </View>
          {registerError === true && (<View><Text className='text-white text-xl tracking-widest'>{registerMessage}</Text></View>)}
          {registerSuccess === true && (<View><Text className='text-white text-xl tracking-widest'>{registerMessage}</Text></View>)}
        </View>
      </View>
    </View>
  )
}

export default SignupScreen;