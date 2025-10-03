import { View, Text, Image, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Spinner from '../components/Spinner';

const SigninScreen = ({ navigation }) => {
    const [pressed, setPressed] = useState(false);
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [customerErroMessage, setCustomErrorMessage] = useState("");
    console.log(pressed);
    function handleNavigation() {
        navigation.navigate("SignUp");
    };

    function handleEmailInput(text) {
        setEmailValue(text);
    }

    function handlePasswordInput(text) {
        setPasswordValue(text);
    }

    async function handleSignIn() {
        try {
            setLoading(true);
            if (emailValue.length === 0 || passwordValue.length === 0) {
                throw new Error("Enter some value");
            }
            const res = await fetch("https://travel-buddy-r69f.onrender.com/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "email": emailValue,
                    "password": passwordValue
                }),
            });

            if (!res.ok) {
                throw new Error("Response was not ok");
            }

            setTimeout(() => {
                setLoading(false);
            }, 1000);

            const data = await res.json();
            console.log("Response: ", data);
            navigation.navigate("Home", { userData: data });
        } catch (e) {
            console.log("The error is: ", e);
            setError(true);
            setCustomErrorMessage("Invalid Email Id or Password")
            setTimeout(() => {
                setError(false);
            }, 3000);
            setLoading(false);
        }
    }

    console.log(emailValue);
    console.log(passwordValue);
    return (
        <View className='bg-white h-full w-full '>
            <View className='h-[100%] w-full -bg--color-dark--1 justify-start items-center pt-20 '>
                <View className='flex justify-center items-center gap-y-10 py-12 '>
                    <Image className='h-[100] w-[105] ' source={require('../assets/Logo.png')}></Image>
                    <Text className='text-white text-3xl text-semibold tracking-widest'>Travel. Note. Remember</Text>
                </View>
                {/* {true && <Spinner />} */}
                <View className='w-[80%] flex gap-y-10 items-center justify-center'>
                    <Text className='text-white text-3xl border-b-4 border-green-600 w-full  rounded-2xl text-center pb-2'>LOGIN</Text>
                    <TextInput placeholder="Enter your email" className='border border-gray-400 w-full px-2 rounded-lg text-white h-14 tracking-widest text-2xl' placeholderTextColor="#999" value={emailValue} onChangeText={(text) => handleEmailInput(text)}></TextInput>
                    <TextInput placeholder="Enter your Password" className='border border-gray-400 w-full px-2 rounded-lg text-white h-14 tracking-widest text-2xl' placeholderTextColor="#999" value={passwordValue} onChangeText={(text) => handlePasswordInput(text)}></TextInput>
                    <View className='w-full flex items-center gap-y-6'>
                        <TouchableOpacity className={`w-full py-4 rounded-xl items-center ${pressed ? "bg-green-500" : "bg-green-600"}`} onPressIn={() => {
                            setPressed(true)
                        }
                        } onPressOut={() => setPressed(false)} activeOpacity={0.8} onPress={() => handleSignIn()}>
                            {!loading ? (
                                <Text className='text-white text-2xl font-medium tracking-wider' >Submit</Text>
                            ) : (<Spinner />)
                            }
                        </TouchableOpacity>
                        <View>
                            <Text className='text-white tracking-wider text-xl'>New User ? <Text className='text-green-600 tracking-widest' onPress={() => handleNavigation()}>Register</Text></Text>
                        </View>
                        {error ? (<View><Text className='text-white tracking-wider text-xl'>{customerErroMessage}</Text></View>) : (<Text></Text>)}
                    </View>
                </View>
            </View>
        </View>
    )
}

export default SigninScreen;