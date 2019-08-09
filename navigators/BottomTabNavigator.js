import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import React from "react";
import { Platform } from "react-native";
import HomeScreen from "../screens/User/HomeScreen";
import ProfileScreen from "../screens/User/ProfileScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import TabBarIcon from "../components/TabBarIcon";

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "Home") {
          iconName =
            Platform.OS === "ios"
              ? `ios-information-circle${focused ? "" : "-outline"}`
              : "md-information-circle";
        } else if (routeName === "Profile") {
          iconName = Platform.OS === "ios" ? "ios-options" : "md-options";
        }

        // You can return any component that you like here!
        return <TabBarIcon focused={focused} name={iconName} />;
      },
      tabBarOptions: {
        labelStyle: {
          fontSize: 12
        }
      }
    }),
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    }
  }
);

export default createAppContainer(TabNavigator);
