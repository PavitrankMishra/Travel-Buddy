import { View, Animated, Easing, StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";

const Spinner = () => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateValue]);

  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={[
        styles.spinner,
        { transform: [{ rotate: spin }] },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  spinner: {
    height: 32,
    width: 32,
    borderWidth: 4,
    borderColor: "white",
    borderTopColor: "transparent",
    borderRadius: 9999,
  },
});

export default Spinner;
