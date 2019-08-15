import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class TextTile extends Component {
  render() {
    return this.renderBoxes(this.props.text);
  }

  renderBoxes(data) {
    var Tiles = [];
    for (var i = 0; i < data.length; i++) {
      Tiles.push(
        <View style={styles.container} key={i}>
          <Text style={styles.textStyle}>{data[i]}</Text>
        </View>
      );
    }
    return Tiles;
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    height: 30,
    width: 30,
    textAlign: "center",
    alignItems: "center"
  },
  textStyle: {
    fontSize: 25
  }
});
