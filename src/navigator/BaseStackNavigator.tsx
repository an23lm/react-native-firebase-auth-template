import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { View, Text } from 'react-native'
import { BaseStackParamList } from '../../types/NavigatorTypes'
import HomeScreen from '../screens/HomeScreen'

const BaseStack = createStackNavigator<BaseStackParamList>()
export default function BaseStackNavigator() {
  return (
    <BaseStack.Navigator>
      <BaseStack.Screen name="home" component={HomeScreen} />
    </BaseStack.Navigator>
  )
}
