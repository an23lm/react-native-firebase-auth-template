import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'

export default function RegisterPhoneScreen() {

  const [phoneNumber, setPhoneNumber] = useState<string | null>(null)


  const login = () => {
    if (phoneNumber && phoneNumber.length == 10) {
      
    } else {
      console.log("Invalid Phone Number")
    }
  }

  return (
    <View>
      <Text>Enter Phone Number</Text>
      <TextInput
        onChangeText={setPhoneNumber}
        style={{ borderWidth: 1, borderColor: "#333", padding: 5 }}
      />
      <Button title="login" onPress={login} />
    </View>
  )
}
