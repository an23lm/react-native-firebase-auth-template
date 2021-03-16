import React from 'react'
import { View, Text } from 'react-native'
import AuthStore from '../store/AuthStore'
import AuthContext from './AuthContext'

export default function({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider value={AuthStore()}>
      { children }
    </AuthContext.Provider>
  )
}
