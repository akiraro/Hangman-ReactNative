import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator,
  ScrollView,
  Dimensions
} from "react-native";
import { Button } from "react-native-elements";
import { ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { getHistory, getData } from "../../controllers/game";

let list = [];

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: "",
      refreshList: true
    };

    getToken().then(token => {
      this.setState({
        token: token,
        isLoading: false
      });
      getHistory(token).then(res => {
        list = [];
        res.reverse().map((data, i) => {
          list.push({
            name: data.pinpoint,
            avatar_url: <Icon name="gamepad" size={30} color="#84868a" />,
            badge: {
              value: data.chances == 0 ? "Done" : "On Going",
              status: data.chances == 0 ? "success" : "error"
            },
            session: data,
            subtitle:
              "Chances: " +
              data.chances.toString() +
              "\t Guesses: " +
              data.guesses
          });
        });
        this.setState({
          refreshList: !this.state.refreshList
        });
      });
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.isLoading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.viewTitle}>
            <Text style={styles.textTitle}> Hangman </Text>
          </View>

          <ScrollView>
            {list.map((l, i) => (
              <ListItem
                key={i}
                leftAvatar={l.avatar_url}
                title={l.name}
                titleStyle={{ fontWeight: "bold" }}
                badge={l.badge}
                subtitle={l.subtitle}
                extraData={this.state.refreshList}
                onPress={() => {
                  getData(l.session.data_id).then(res => {
                    navigate("Show", {
                      data: {
                        game: l.session,
                        data: res
                      },
                      returnData: this.refreshList.bind(this)
                    });
                    console.log(res);
                  });
                }}
              />
            ))}
          </ScrollView>

          <Button
            style={styles.buttonStyle}
            title="New Game"
            onPress={() =>
              navigate("Game", { returnData: this.refreshList.bind(this) })
            }
          />
        </View>
      );
    }
  }
  refreshList() {
    console.log("Reupdate List");
    getHistory(this.state.token).then(res => {
      list = [];
      res.reverse().map((data, i) => {
        list.push({
          name: data.pinpoint,
          avatar_url: <Icon name="gamepad" size={30} color="#84868a" />,
          badge: {
            value: data.chances == 0 ? "Done" : "On Going",
            status: data.chances == 0 ? "success" : "error"
          },
          session: data,
          subtitle:
            "Chances: " +
            data.chances.toString() +
            "\t Guesses: " +
            data.guesses
        });
      });
      this.setState({
        refreshList: !this.state.refreshList
      });
    });
  }
}

const getToken = async () => {
  let token = "";
  try {
    token = await AsyncStorage.getItem("token");
  } catch (error) {
    console.log(error);
  }
  return token;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  viewTitle: {
    marginTop: 50
  },
  textTitle: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center"
  },
  buttonStyle: {
    width: Dimensions.get("window").width / 3,
    alignSelf: "center",
    margin: 5
  }
});

export default HomeScreen;
