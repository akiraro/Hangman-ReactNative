export const signIn = async (email, password) => {
  console.log("SignIn");
  let response = "";

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
