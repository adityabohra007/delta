import { handleResponse } from "../helpers/auth-headers";

const config = {
  apiUrl: "http://127.0.0.1:8000",
};
const login = (username, password) => {
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
