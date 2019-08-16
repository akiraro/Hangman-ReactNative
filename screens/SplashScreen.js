import React, { Component } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
// import Video from "react-native-video";
import { Video } from "expo-av";

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.animated = new Animated.Value(0);
  }
  static navigationOptions = {
    header: null
  };

  animate() {
    Animated.timing(this.animated, {
      toValue: 1,
      duration: 1000
    }).start();
    setTimeout(() => {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Login" })]
      });
      this.props.navigation.dispatch(resetAction);
    }, 2000);
  }

  render() {
    const opacity = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    _onPlaybackStatusUpdate = playbackStatus => {
      if (playbackStatus.didJustFinish) {
        console.log("Finished");
        this.animate();
      }
    };

    return (
      <View style={styles.container}>
        <Video
          source={require("../assets/images/hangman.mp4")}
          rate={2.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping={false}
          onPlaybackStatusUpdate={playbackStatus =>
            _onPlaybackStatusUpdate(playbackStatus)
          }
          style={{ width: 143, height: 192 }}
        />
        <Animated.Text style={[styles.textStyle, { opacity }]}>
          HANGMAN
        </Animated.Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  textStyle: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 30
  }
});

export default SplashScreen;
