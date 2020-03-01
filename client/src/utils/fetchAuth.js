// eslint-disable-next-line no-unused-vars
const serverUrl = "https://fashionframe.herokuapp.com";
// eslint-disable-next-line no-unused-vars
const localUrl = "http://localhost:3001";
const myUrl = serverUrl;

// eslint-disable-next-line no-unused-vars
const frontendDeployUrl = "https://fashionframe.herokuapp.com/fashionframe";
// eslint-disable-next-line no-unused-vars
const frontendLocalUrl = "http://localhost:3000/fashionframe";

export const fetchAuth = (path, options) => {
  let requestURL = new URL(myUrl + path);

  return fetch(requestURL, {
    ...options,
    credentials: "include"
  });
};

export const fetchAuthPostJson = (path, options) => {
  let requestURL = new URL(myUrl + path);

  return fetch(requestURL, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });
};
