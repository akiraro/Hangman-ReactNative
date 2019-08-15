export const signIn = async (email, password) => {
  console.log("SignIn");
  let response = "";

  link = "https://vast-cove-23202.herokuapp.com/auth/login";
  await fetch("http://localhost:3000/auth/login", {
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

  await fetch("http://localhost:3000/auth/signup", {
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
  await fetch("http://localhost:3000/auth/logout", {
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
  console.log(token);
  let response = "";
  await fetch("http://localhost:3000/auth/getUser", {
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
