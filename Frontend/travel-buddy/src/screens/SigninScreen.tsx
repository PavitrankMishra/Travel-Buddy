import { View, Text, Image, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner';
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetState } from '../store/slice/UserLoginSlice';

const SigninScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    // Toggles the value if the button is pressed 
    const [pressed, setPressed] = useState<boolean>(false);

    // Contains the input email value
    const [emailValue, setEmailValue] = useState<string>("");

    // Contains the input password value
    const [passwordValue, setPasswordValue] = useState<string>("");

    // Navigates to Signup screen
    function handleNavigation() {
        navigation.navigate("SignUp");
    };

    // Stores the updated value of email
    function handleEmailInput(text) {
        const emailPattern = /^[a-zA-Z0-9.]*@?[a-zA-Z0-9.]*$/;
        if (emailPattern.test(text)) {
            setEmailValue(text);
        } else {
            return;
        }
    }

    // Stores the updated value of password
    function handlePasswordInput(text) {
        if (text.length <= 8) {
            setPasswordValue(text);
        }
    }

    // Stores the loading state to display spinner if value is true
    const loginLoading = useSelector((state: any) => state.userLogin.loading);

    // Display success message if value is true
    const loginSuccess = useSelector((state: any) => state.userLogin.success);

    // Display error message if value is true
    const loginError = useSelector((state: any) => state.userLogin.error);

    // Display message if login is successfull or failed
    const loginMessage = useSelector((state: any) => state.userLogin.message);

    // Function to handle user sign in process
    function handleSignIn() {
        // Data to be sent as argument
        const loginData = {
            email: emailValue,
            password: passwordValue,
        }

        // Dispatches action to make a login request
        dispatch(loginUser(loginData));
    }

    // Runs if the value of loginSuccess or loginError changes
    // If error in login than reset state 
    // If login is successfull than navigate to homepage and reset state
    useEffect(() => {
        if (loginError === true) {
            setTimeout(() => {
                dispatch(resetState());
            }, 2000);
        } else if (loginSuccess === true) {
            setTimeout(() => {
                navigation.navigate("Home");
                dispatch(resetState());
            }, 2000);
        }
    }, [loginSuccess, loginError]);

    return (
        <View className='bg-white h-full w-full '>
            <View className='h-[100%] w-full -bg--color-dark--1 justify-start items-center pt-20'>
                <View className='flex justify-center items-center gap-y-8  '>
                    <Image className='h-[100] w-[105] ' source={require('../assets/Logo.png')}></Image>
                    <Text className='text-white text-2xl text-semibold tracking-widest'>Travel. Note. Remember</Text>
                </View>
                <View className='w-[80%] flex items-center justify-center gap-y-8 pt-8 '>
                    <Text className='text-white text-2xl border-b-4 border-green-600 w-full  rounded-2xl text-center pb-2'>LOGIN</Text>
                    <TextInput placeholder="Enter your email" className='border border-gray-400 w-full px-2 rounded-lg text-white h-14 tracking-widest text-xl' placeholderTextColor="#999" value={emailValue} onChangeText={(text) => handleEmailInput(text)}></TextInput>
                    <TextInput secureTextEntry={true} placeholder="Enter your Password" className='border border-gray-400 w-full px-2 rounded-lg text-white h-14 tracking-widest text-xl' placeholderTextColor="#999" value={passwordValue} onChangeText={(text) => handlePasswordInput(text)}></TextInput>
                    <View className='w-full flex items-center gap-y-6'>
                        <TouchableOpacity className={`w-full py-3 rounded-xl items-center ${pressed ? "bg-green-500" : "bg-green-600"}`} onPressIn={() => {
                            setPressed(true)
                        }
                        } onPressOut={() => setPressed(false)} activeOpacity={0.8} onPress={() => handleSignIn()}>
                            {!loginLoading ? (
                                <Text className='text-white text-2xl font-medium tracking-wider' >Submit</Text>
                            ) : (<Spinner />)
                            }
                        </TouchableOpacity>
                        <View>
                            <Text className='text-white tracking-wider text-xl'>New User ? <Text className='text-green-600 tracking-widest' onPress={() => handleNavigation()}>Register</Text></Text>
                        </View>

                        {loginError && (<View><Text className='text-white tracking-wider text-xl text-center'>{loginMessage}</Text></View>)}
                        {loginSuccess && (<View><Text className='text-white tracking-wider text-xl text-center'>{loginMessage}</Text></View>)}
                    </View>
                </View>
            </View>
        </View>
    )
}

export default SigninScreen;