import { AsyncStorage } from "react-native";

export const getToken = async () => {
  let token = "";
  try {
    token = await AsyncStorage.getItem("token");
  } catch (error) {
    console.log(error);
  }
  return token;
};
