const herokuLink = "https://vast-cove-23202.herokuapp.com/";

export const signIn = async (email, password) => {
  console.log("SignIn");
  let response = "";

  await fetch(herokuLink + "auth/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
    .then(response => response.json())
    .then(responseJson => {
      response = responseJson;
    });

  return response;
};

export const signUp = async (email, password) => {
  console.log("SignUp");

  let response = "";

  await fetch(herokuLink + "auth/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
    .then(response => response.json())
    .then(responseJson => {
      response = responseJson;
      console.log(response);
    });

  return response;
};

export const signOut = async token => {
  console.log("Sign Out");

  let response = "";
  await fetch(herokuLink + "auth/logout", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: token
    }
  })
    .then(response => response.json())
    .then(responseJson => {
      response = responseJson;
    });

  return response;
};

export const getUser = async token => {
  console.log("Get User");
  let response = "";
  await fetch(herokuLink + "auth/getUser", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: token
    }
  })
    .then(response => response.json())
    .then(responseJson => {
      response = responseJson;
    });

  return response;
};
