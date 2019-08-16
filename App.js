import { StyleSheet } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import LoginScreen from "./screens/Auth/LoginScreen";
import SignupScreen from "./screens/Auth/SignupScreen";
import GameScreen from "./screens/Hangman/GameScreen";
import ShowScreen from "./screens/Hangman/ShowScreen";
import HomeScreen from "./screens/User/HomeScreen";
import SplashScreen from "./screens/SplashScreen";

const MainNavigator = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    Signup: { screen: SignupScreen },
    Game: { screen: GameScreen },
    Show: { screen: ShowScreen },
    Home: { screen: HomeScreen },
    Splash: { screen: SplashScreen }
  },
  {
    initialRouteName: "Splash",
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
