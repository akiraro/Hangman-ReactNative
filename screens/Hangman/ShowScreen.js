import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";
import TextTile from "../../components/TextTile";
import { submitKey } from "../../controllers/game";
import { Button } from "react-native-elements";
import { getToken } from "../../controllers/token";

export class ShowScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboard: this._generateKeyboard(),
      refreshKeyboard: true,
      token: "",
      data: this.props.navigation.getParam("data", null)
    };

    getToken().then(token => {
      this.setState({
        token: token
      });
    });
  }

  static navigationOptions = {
    header: null
  };

  _renderItem = ({ item, _ }) => {
    if (
      this.state.data.game.chances == 0 ||
      !this.state.data.game.pinpoint.includes("*")
    ) {
      return; // Return empty components when the game ended
    }
    if (this.state.data.game.guesses.includes(item.key.toLowerCase())) {
      return (
        <TouchableOpacity
          style={[styles.item, { backgroundColor: "#b5babd" }]}
          disabled={true}
          onPress={() => {
            submitKey(item.key, this.state.token, this.state.data.game.id).then(
              res => {
                this.setState({
                  data: { ...this.state.data, game: res },
                  refreshKeyboard: !this.state.refreshKeyboard
                });
              }
            );
          }}
        >
          <Text style={styles.itemText}>{item.key}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            submitKey(item.key, this.state.token, this.state.data.game.id).then(
              res => {
                this.setState({
                  data: { ...this.state.data, game: res },
                  refreshKeyboard: !this.state.refreshKeyboard
                });
              }
            );
          }}
        >
          <Text style={styles.itemText}>{item.key}</Text>
        </TouchableOpacity>
      );
    }
  };

  _renderFlatList() {
    if (
      this.state.data.game.chances == 0 ||
      !this.state.data.game.pinpoint.includes("*")
    ) {
      return (
        <View>
          <Text style={styles.textTitleStyle}>Game Ended</Text>
        </View>
      );
    } else {
      return (
        <View>
          <FlatList
            data={this.state.keyboard}
            numColumns={5}
            style={styles.containerFlatList}
            renderItem={this._renderItem}
            extraData={this.state.refreshKeyboard}
          />
        </View>
      );
    }
  }

  _generateKeyboard() {
    data = [];
    for (let i = 0; i < 26; i++) {
      data.push({
        key: String.fromCharCode("A".charCodeAt(0) + i)
      });
    }
    return data;
  }

  _determineImage() {
    switch (this.state.data.game.chances) {
      case 8:
        return require("../../assets/images/hg0.png");
      case 7:
        return require("../../assets/images/hg1.png");
      case 6:
        return require("../../assets/images/hg2.png");
      case 5:
        return require("../../assets/images/hg3.png");
      case 4:
        return require("../../assets/images/hg4.png");
      case 3:
        return require("../../assets/images/hg5.png");
      case 2:
        return require("../../assets/images/hg6.png");
      case 1:
        return require("../../assets/images/hg7.png");
      case 0:
        return require("../../assets/images/hg8.png");
    }
  }

  _generateTextTiles() {
    let screenWidth = Dimensions.get("window").width;
    if (this.state.data.game.pinpoint.length * 30 > screenWidth) {
      let lengthCanFit = screenWidth / 30 - 1;
      return (
        <View>
          <View style={styles.TileStyle}>
            <TextTile
              text={this.state.data.game.pinpoint.substring(0, lengthCanFit)}
            />
          </View>
          <View style={[styles.TileStyle, { marginTop: 0 }]}>
            <TextTile
              text={this.state.data.game.pinpoint.substring(
                lengthCanFit,
                this.state.data.game.pinpoint.length
              )}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.TileStyle}>
          <TextTile text={this.state.data.game.pinpoint} />
        </View>
      );
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View
        style={
          this.state.data.game.chances == 0
            ? styles.containerDone
            : styles.containerNormal
        }
      >
        <Image
          source={this._determineImage()}
          style={{
            width: 120,
            height: 120,
            marginTop: 50,
            alignSelf: "center",
            marginRight: 30
          }}
        />

        <Text style={styles.textTitleStyle}>WORD</Text>
        {this._generateTextTiles()}

        <Text style={[styles.textTitleStyle, { marginTop: 10 }]}>Type</Text>
        <Text style={styles.textStyle}>
          {this.state.data.data.data.data_type}
        </Text>

        <Text style={[styles.textTitleStyle, { marginTop: 10 }]}>Guesses</Text>
        <Text style={styles.textStyle}>{this.state.data.game.guesses}</Text>

        <Text style={[styles.textTitleStyle, { marginTop: 10 }]}>
          Chances Left
        </Text>
        <Text style={styles.textStyle}>{this.state.data.game.chances}</Text>
        {/* Generate the keyboard */}
        {this._renderFlatList()}
        <Button
          style={{
            width: Dimensions.get("window").width / 3,
            alignSelf: "center",
            color: "#13a8ed"
          }}
          title="Back"
          onPress={() => {
            navigate("Home");
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerNormal: {
    flex: 1
  },
  containerDone: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  containerFlatList: {
    marginVertical: 20
  },
  TileStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  item: {
    backgroundColor: "#13a8ed",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    height: (Dimensions.get("window").width - 160) / 5 // approximate a square
  },
  itemInvisible: {
    backgroundColor: "transparent"
  },
  itemText: {
    color: "#fff"
  },
  textTitleStyle: {
    alignSelf: "center",
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 25
  },
  textStyle: {
    alignSelf: "center",
    fontSize: 20
  }
});

export default ShowScreen;
