import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text> GameScreen </Text>
        <Button title="Back" onPress={() => goBack()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default GameScreen;
