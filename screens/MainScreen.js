import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default class MainScreen extends React.Component {
  static navigationOptions = {
    title: "Welcome"
  };
  render() {
    const { navigate } = this.props.navigation;
    console.log("Hello");
    return (
      <View style={styles.container}>
        <Text>Welcome to Hangman</Text>
        <Button title="Login" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
