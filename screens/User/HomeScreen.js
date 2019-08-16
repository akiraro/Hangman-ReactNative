import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions
} from "react-native";
import { Button } from "react-native-elements";
import { ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { getHistory, getData } from "../../controllers/game";
import BottomDrawer from "rn-bottom-drawer";
import { signOut, getUser } from "../../controllers/auth";
import { StackActions, NavigationActions } from "react-navigation";
import { getToken } from "../../controllers/token";

let list = [];
let height = Dimensions.get("window").height;

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    // This will refresh the list when the focus of screen changes
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.refreshList();
    });
  }
  componentWillUnmount() {
    // Remove listener
    this.focusListener.remove();
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: "",
      refreshList: true,
      user: ""
    };

    getToken().then(token => {
      this.setState({
        token: token,
        isLoading: false
      });
      // Get user data based on token
      getUser(token).then(user => {
        this.setState({ user: user.user });
      });
      // Get game history of a user
      getHistory(token).then(res => {
        list = [];
        res.reverse().map((data, i) => {
          let status = data.chances == 0 || !data.pinpoint.includes("*");
          list.push({
            name: data.pinpoint,
            avatar_url: <Icon name="gamepad" size={30} color="#84868a" />,
            badge: {
              value: status ? "Done" : "On Going",
              status: status ? "success" : "error"
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

  refreshList() {
    console.log("Reupdate List");
    getHistory(this.state.token).then(res => {
      list = [];
      res.reverse().map((data, i) => {
        let status = data.chances == 0 || !data.pinpoint.includes("*");
        list.push({
          name: data.pinpoint,
          avatar_url: <Icon name="gamepad" size={30} color="#84868a" />,
          badge: {
            value: status ? "Done" : "On Going",
            status: status ? "success" : "error"
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
                      }
                    });
                  });
                }}
              />
            ))}
          </ScrollView>

          {/* Bottom Drawer Component */}
          <BottomDrawer
            containerHeight={height * 0.25}
            downDisplay={(height * 0.25) / 1.5}
            startUp={false}
          >
            <Text style={styles.textBottomDrawerTitle}>Swipe Here</Text>
            <Text style={styles.textBottomDrawer}>{this.state.user.email}</Text>
            <Button
              style={styles.buttonStyle}
              title="New Game"
              type="outline"
              onPress={() => navigate("Game")}
            />
            <Button
              style={styles.buttonStyle}
              title="Logout"
              type="outline"
              onPress={() =>
                signOut(this.state.token).then(res => {
                  if (res.status == "SUCCESS") {
                    const resetAction = StackActions.reset({
                      index: 0,
                      actions: [
                        NavigationActions.navigate({ routeName: "Login" })
                      ]
                    });
                    this.props.navigation.dispatch(resetAction);
                  }
                })
              }
            />
          </BottomDrawer>
        </View>
      );
    }
  }
}

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
  },
  textBottomDrawerTitle: {
    alignSelf: "center",
    marginBottom: 40,
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "#d4d4d4"
  },
  textBottomDrawer: {
    alignSelf: "center",
    marginBottom: 5,
    fontSize: 20,
    fontStyle: "italic"
  }
});

export default HomeScreen;
