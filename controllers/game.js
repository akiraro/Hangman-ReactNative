import { AsyncStorage } from "react-native";

export const newGame = async (diff_id, token) => {
  console.log("New Game");
  let response = "";
  await fetch("http://localhost:3000/newgame", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: token
    },
    body: JSON.stringify({
      diff_id: diff_id
    })
  })
    .then(response => response.json())
    .then(responseJson => {
      response = responseJson;
    });
  return response;
};

export const submitKey = async (key, token, id) => {
  console.log("Submitkey");

  link = "http://localhost:3000/rngame/" + id;
  response = "";
  await fetch(link, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: token
    },
    body: JSON.stringify({
      value: key.toLowerCase()
    })
  })
    .then(response => response.json())
    .then(responseJson => {
      response = responseJson.game;
    });
  return response;
};

export const getHistory = async token => {
  console.log("Getting history list");
  response = "";
  await fetch("http://localhost:3000/rngame/", {
    method: "GET",
    headers: {
      Accept: "application/json",
      authorization: token
    }
  })
    .then(response => response.json())
    .then(responseJson => {
      response = responseJson.game;
    });
  return response;
};

export const getData = async id => {
  console.log("Getting data");
  response = "";
  link = "http://localhost:3000/rngame/data/" + id;
  await fetch(link, {
    method: "GET",
    headers: {}
  })
    .then(response => response.json())
    .then(responseJson => {
      response = responseJson;
    });
  return response;
};
