export const isUsernameValid = username => username.length > 0;

export const isPasswordValid = password => password.length >= 6;

export const arePasswordsMatching = (password, password2) =>
  password === password2;

export const isSetupNameValid = name => name.length > 0;
