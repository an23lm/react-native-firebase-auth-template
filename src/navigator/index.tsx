import React, { useContext, useEffect } from 'react'
import { View, Text } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import AuthStackNavigator from './AuthStackNavigator';
import BaseStackNavigator from './BaseStackNavigator';
import { RootStackParamList } from '../../types/NavigatorTypes';
import NotFoundScreen from '../screens/NotFoundScreen';
import AuthContext from '../../context/AuthContext';

const RootStack = createStackNavigator<RootStackParamList>()


const splashScreen = SplashScreen
const authNavigator = AuthStackNavigator
const baseNavigator = BaseStackNavigator

export default function() {

  const { authState } = useContext(AuthContext)

  const screens = () => {
    let selectedScreen = splashScreen;

    switch (authState.state) {
      case "unauthenticated": selectedScreen = authNavigator; break;
      case "authenticated": selectedScreen = baseNavigator; break;
      default: selectedScreen = splashScreen;
    }

    return <RootStack.Screen name="found" component={selectedScreen} />
  }

  return (
    <RootStack.Navigator headerMode="none">
      { screens() }
      <RootStack.Screen name="notFound" component={NotFoundScreen} />
    </RootStack.Navigator>
  )
}
