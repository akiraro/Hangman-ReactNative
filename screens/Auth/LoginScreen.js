import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  AsyncStorage,
  Image
} from "react-native";
import { Input, Button } from "react-native-elements";
import { signIn } from "../../controllers/auth";

var width = Dimensions.get("window").width;

export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonType: "outline",
      isButtonLoading: false,
      isButtonEnabled: false,
      userEmail: "test@gmail.com",
      userPassword: "test",
      error: {
        email: "",
        password: ""
      }
    };
  }
  static navigationOptions = {
    header: null
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}> HANGMAN </Text>
        <Image
          source={require("../../assets/images/Hangman-6.png")}
          style={{ marginBottom: 15, width: 100, height: 155 }}
        />
        <View style={styles.loginContainer}>
          <Input
            placeholder="E-mail"
            autoCapitalize="none"
            shake={true}
            leftIcon={{ type: "font-awesome", name: "envelope" }}
            leftIconContainerStyle={styles.leftIconContainerStyle}
            errorStyle={{ color: "red" }}
            errorMessage={this.state.error.email}
            onChangeText={email => this.setState({ userEmail: email })}
          />
          <Input
            placeholder="Password"
            autoCapitalize="none"
            shake={true}
            leftIcon={{ type: "font-awesome", name: "key" }}
            leftIconContainerStyle={styles.leftIconContainerStyle}
            onChangeText={password => this.setState({ userPassword: password })}
            errorStyle={{ color: "red" }}
            errorMessage={this.state.error.password}
          />

          <Button
            title="Sign In"
            style={styles.buttonStyle}
            disabled={this.state.isButtonEnabled}
            type={this.state.buttonType}
            loading={this.state.isButtonLoading}
            onPress={() => {
              signIn(this.state.userEmail, this.state.userPassword).then(
                res => {
                  this.loginHandler(res);
                }
              );
              this.setState({
                isButtonLoading: true,
                isButtonEnabled: true,
                buttonType: "clear"
              });
            }}
          />
        </View>
        <Text style={styles.signupText} onPress={() => navigate("Signup")}>
          Not a member ?
        </Text>
      </View>
    );
  }

  loginHandler = async res => {
    const { navigate } = this.props.navigation;

    if (res.status == "SUCCESS") {
      try {
        await AsyncStorage.setItem("token", res.data.remember_token);
      } catch (error) {
        console.log(error.message);
      }
      this.setState({
        isButtonLoading: false,
        buttonType: "outline"
      });
      navigate("Home");
    } else {
      this.setState({
        isButtonLoading: false,
        isButtonEnabled: false,
        buttonType: "outline"
      });
      Alert.alert(
        "Login Failed",
        "Your email or password is incorrect. Please try again.",
        [
          {
            text: "Ok",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          }
        ]
      );
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  leftIconContainerStyle: {
    paddingRight: 10
  },
  loginContainer: {
    width: width * 0.7
  },
  buttonStyle: {
    paddingTop: 10
  },
  signupText: {
    paddingTop: 5
  },
  textTitle: {
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 30
  }
});

export default LoginScreen;
