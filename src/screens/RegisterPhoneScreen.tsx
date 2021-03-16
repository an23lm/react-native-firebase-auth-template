import { FirebaseRecaptchaBanner, FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import firebase from 'firebase'
import React, { useRef, useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { IFirebaseOptions } from 'expo-firebase-core';

export default function RegisterPhoneScreen() {

  const firebaseRecaptchaVerifier = useRef(null)
  const firebaseConfig = firebase.apps.length ? firebase.app().options as IFirebaseOptions : undefined
  const attemptInvisibleVerification = true;

  const [phoneNumber, setPhoneNumber] = useState<string>("+")
  const [otp, setOtp] = useState<string>("")
  const [message, setMessage] = useState(!firebaseConfig ? "Invalid firebase config" : "")
  const [verificationId, setVerificationId] = useState<null | string>(null)

  const sendOtp = async () => {
    if (phoneNumber && phoneNumber.length == 13) {
      try {
        const phoneAuthProvider = new firebase.auth.PhoneAuthProvider()
        const verificationId = await phoneAuthProvider.verifyPhoneNumber(
          phoneNumber,
          firebaseRecaptchaVerifier.current!
        )
        setVerificationId(verificationId)
        setMessage("OTP has been sent")
      } catch (err) {
        setMessage("Error: " + err.message)
      }
    } else {
      setMessage("Invalid Phone Number")
    }
  }

  const verifyOtp = async () => {
    if (verificationId) {
      try {
        const credential = firebase.auth.PhoneAuthProvider.credential(verificationId!, otp)
        await firebase.auth().signInWithCredential(credential)
        setMessage("Login Success")
      } catch (err) {
        console.log("login failed", err.message)
        setMessage("Error: " + err.message)
      }
    } else {
      setMessage("Send OTP first")
    }
  }

  return (
    <View>
      <FirebaseRecaptchaVerifierModal
        ref={firebaseRecaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={attemptInvisibleVerification}
      />

      <Text>{message}</Text>

      <Text>Enter Phone Number</Text>

      <TextInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={{ borderWidth: 1, borderColor: "#333", padding: 5 }}
      />
      <Button title="SEND OTP" onPress={sendOtp} />

      <Text>Enter OTP</Text>
      <TextInput
        onChangeText={setOtp}
        style={{ borderWidth: 1, borderColor: "#333", padding: 5 }}
      />
      <Button title="LOGIN" onPress={verifyOtp} />

      {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
    </View>
  )
}
