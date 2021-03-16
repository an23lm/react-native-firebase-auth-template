import React from "react";

import firebase from "firebase";
import "firebase/auth";
import { firebaseConfig } from "../config/FirebaseConfig";

import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigator";
import Contexts from "../context";

export default function App() {
  return (
    <NavigationContainer>
      <Contexts>
        <RootNavigator />
      </Contexts>
    </NavigationContainer>
  );
}

/// Initial firebase "default" if not already initalized
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
