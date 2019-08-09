import { StyleSheet } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import MainScreen from "./screens/MainScreen";
import LoginScreen from "./screens/Auth/LoginScreen";
import SignupScreen from "./screens/Auth/SignupScreen";
import GameScreen from "./screens/Hangman/GameScreen";
import TabNavigator from "./navigators/BottomTabNavigator";

const MainNavigator = createStackNavigator(
  {
    Home: { screen: MainScreen },
    Login: { screen: LoginScreen },
    Signup: { screen: SignupScreen },
    Game: { screen: GameScreen },
    User: { screen: TabNavigator }
  },
  {
    initialRouteName: "User",
    headerMode: "none"
  }
);

export default createAppContainer(MainNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
