import React, { Component } from "react";
import { View, StyleSheet, AsyncStorage, Text } from "react-native";
import { Button, PricingCard } from "react-native-elements";
import { newGame } from "../../controllers/game";
import { getToken } from "../../controllers/token";

class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    header: null
  };

  render() {
    const { goBack, navigate } = this.props.navigation;
    console.log("Game screen");
    return (
      <View style={styles.container}>
        <View style={styles.insider}>
          <Text
            style={{ fontSize: 35, fontWeight: "bold", alignSelf: "center" }}
          >
            Choose difficulty
          </Text>
          <PricingCard
            color="#4f9deb"
            title="Easy"
            price="8-10 letters"
            button={{ title: "GO FOR EASY !" }}
            pricingStyle={{ fontSize: 20 }}
            onButtonPress={() =>
              getToken().then(token => {
                newGame(1, token).then(res => {
                  navigate("Show", {
                    data: res
                  });
                });
              })
            }
          />

          <PricingCard
            color="#4f9deb"
            title="Intermediate"
            price="11-12 letters"
            button={{ title: "GO FOR INTERMEDIATE !" }}
            pricingStyle={{ fontSize: 20 }}
            onButtonPress={() =>
              getToken().then(token => {
                newGame(2, token).then(res => {
                  navigate("Show", {
                    data: res
                  });
                });
              })
            }
          />

          <PricingCard
            color="#4f9deb"
            title="Hard"
            price="More than 12 letters"
            button={{ title: "GO FOR HARD !" }}
            pricingStyle={{ fontSize: 20 }}
            onButtonPress={() =>
              getToken().then(token => {
                newGame(3, token).then(res => {
                  navigate("Show", {
                    data: res
                  });
                });
              })
            }
          />
          <Button
            title="Back"
            onPress={() => goBack()}
            style={styles.buttonStyle}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 48
  },
  insider: {
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24
  },
  buttonStyle: {
    width: 200,
    alignSelf: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default GameScreen;
