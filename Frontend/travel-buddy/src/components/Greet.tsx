import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native';

const Greet = () => {
    return (
        <View>
            <Text>Greet is the new component</Text>
            <Button title='Learn More' color="red" />
            <Button title='Learn More' color="red" />
        </View>
    )
}

export default Greet;