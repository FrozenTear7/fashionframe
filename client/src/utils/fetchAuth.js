export const fetchAuth = (path, options) => {
  // eslint-disable-next-line no-unused-vars
  const serverUrl = "https://fashionframe.herokuapp.com";
  // eslint-disable-next-line no-unused-vars
  const localUrl = "http://localhost:3001";

  // eslint-disable-next-line no-unused-vars
  const frontendDeployUrl = "https://fashionframe.herokuapp.com/fashionframe";
  // eslint-disable-next-line no-unused-vars
  const frontendLocalUrl = "http://localhost:3001/fashionframe";

  let requestURL = new URL(serverUrl + path);

  return fetch(requestURL, {
    ...options,
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": frontendDeployUrl,
      "Access-Control-Allow-Credentials": true
    }
  });
};
