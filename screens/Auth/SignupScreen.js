import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import { signUp } from "../../controllers/auth";

var width = Dimensions.get("window").width;

export class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonType: "outline",
      isButtonLoading: false,
      isButtonEnabled: false,
      isPasswordSame: false,
      userEmail: "",
      userPassword: "",
      error: {
        email: "",
        password: "",
        secondPass: ""
      }
    };
  }
  static navigationOptions = {
    title: "Register"
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
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
            errorMessage={this.state.error.email}
          />
          <Input
            placeholder="Retype password"
            autoCapitalize="none"
            shake={true}
            leftIcon={{ type: "font-awesome", name: "key" }}
            leftIconContainerStyle={styles.leftIconContainerStyle}
            onChangeText={password => this.verifyPassword(password)}
            errorStyle={{ color: "red" }}
            errorMessage={this.state.error.secondPass}
          />

          <Button
            title="Register"
            style={styles.buttonStyle}
            type={this.state.buttonType}
            disabled={this.state.isButtonEnabled}
            loading={this.state.isButtonLoading}
            onPress={() => {
              if (this.state.isPasswordSame) {
                signUp(this.state.userEmail, this.state.userPassword).then(
                  res => {
                    this.signupHandler(res);
                  }
                );
                this.setState({
                  isButtonLoading: true,
                  isButtonEnabled: true,
                  buttonType: "clear"
                });
              }
            }}
          />
        </View>
      </View>
    );
  }

  verifyPassword(password) {
    if (this.state.userPassword != password) {
      this.setState({
        error: {
          secondPass: "Password not equal!"
        }
      });
    } else {
      this.setState({
        isPasswordSame: true,
        error: {
          secondPass: ""
        }
      });
    }
  }

  signupHandler(res) {
    if (res.status == "SUCCESS") {
      this.setState({
        isButtonLoading: false,
        buttonType: "outline"
      });
      Alert.alert("Successfully registered", "Great", [
        {
          text: "Ok",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ]);
    } else {
      this.setState({
        isButtonLoading: false,
        buttonType: "outline"
      });
      Alert.alert(
        "SignUp Failed",
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
  }
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
  }
});

export default SignupScreen;
