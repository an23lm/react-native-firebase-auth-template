import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import AuthContext from "../../context/AuthContext";

export default function HomeScreen() {
  const { authState, authActions } = useContext(AuthContext);

  const logout = () => {
    authActions.logout();
  };

  return (
    <View>
      <Text>Home</Text>
      <Button title={"LOGOUT"} onPress={logout} />
    </View>
  );
}
