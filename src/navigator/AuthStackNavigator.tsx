import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { View, Text } from 'react-native'
import { AuthStackParamList } from '../../types/NavigatorTypes'
import RegisterPhoneScreen from '../screens/RegisterPhoneScreen'

const AuthStack = createStackNavigator<AuthStackParamList>()

export default function AuthStackNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="login" component={RegisterPhoneScreen} />
    </AuthStack.Navigator>
  )
}
