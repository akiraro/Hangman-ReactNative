import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";

export default class MainScreen extends React.Component {
  static navigationOptions = {
    title: "Main"
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/hg0.png')}
        />
        <Text>Welcome to Hangman</Text>
        <Button 
          title="Login"
          onPress={()=> navigate("Login")}
         />
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
