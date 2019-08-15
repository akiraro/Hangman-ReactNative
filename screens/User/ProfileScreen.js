import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { signOut, getUser } from "../../controllers/auth";
import { StackActions, NavigationActions } from "react-navigation";

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      user: ""
    };
    getToken().then(token => {
      this.setState({ token: token });
      getUser(token).then(user => {
        this.setState({ user: user.user });
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <Text style={styles.textHeader}> {this.state.user.email} </Text>
        </View>
        <View style={styles.menus}>
          <Text> ProfileScreen </Text>
        </View>
        <View style={styles.signOut}>
          <TouchableOpacity
            style={styles.list}
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
          >
            <Text> Sign Out </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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
    marginTop: 50
  },
  signOut: { flex: 1 },
  list: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f2",
    height: 35,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#cfcfcc"
  },
  profileHeader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f2",
    height: 35,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#cfcfcc"
  },
  menus: {
    flex: 9,
    marginTop: 20
  },
  textHeader: {
    fontWeight: "bold",
    fontSize: 30
  }
});

export default ProfileScreen;
