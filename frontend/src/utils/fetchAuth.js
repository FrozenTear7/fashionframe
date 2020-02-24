export const fetchAuth = (path, options) => {
  const serverUrl = "https://fashionframe.herokuapp.com";
  // eslint-disable-next-line no-unused-vars
  const localUrl = "http://localhost:3001";

  let requestURL = new URL(serverUrl + path);

  return fetch(requestURL, {
    ...options,
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Credentials": true
    }
  });
};
