import { handleResponse } from "../helpers/auth-headers";

const config = {
  apiUrl: "http://127.0.0.1:8000",
};
const login = (username, password) => {
  console.log("requestiong");
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  return fetch(`${config.apiUrl}/api/login/`, requestOptions).then((res) => {
    if (res.ok) {
      return Promise.resolve(res);
    } else {
      return Promise.reject();
    }
  });

  //     .then((res) => {
  //       console.log(res);
  //       // return res.text().then((text) => {
  //       //   const data = text && JSON.parse(text);
  //       //   if (!res.ok) {
  //       //   }
  //       //   const error = (data && data.message) || res.statusText;
  //       // });
  //       // const data = res.json();
  //       // if (res.ok) {
  //       //   return data;
  //       // } else {
  //       //   console.log(data, "data");
  //       //   return data;
  //       // }
  //     })
  //     // .then(handleResponse)
  //     .then(
  //       (response) => {
  //         console.log(response);
  //         return response;
  //       }
  //       // (user) => {
  //       //   // store user details and jwt token in local storage to keep user logged in between page refreshes
  //       //   localStorage.setItem("user", JSON.stringify(user));
  //       //   console.log(user);
  //       //   return user;
  //       // },
  //       // (error) => {
  //       //   //   if(error.ok)
  //       //   console.log(error.json(), "dcsddddd");
  //       // }
  //     ).catch
};

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`${config.apiUrl}/users/register`, requestOptions).then(
    handleResponse
  );
}

export const authentication = {
  login,
  logout,
  register,
};
