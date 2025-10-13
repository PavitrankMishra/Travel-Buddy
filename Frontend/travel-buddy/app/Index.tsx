import React from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import SigninScreen from "./SigninScreen";
import { Stack } from "expo-router";

const Home = () => {
    const router = useRouter();
    return (
        <>
        <Stack.Screen options={{ headerShown: false }} />
        <SigninScreen />
        </>
    )
};

export default Home;