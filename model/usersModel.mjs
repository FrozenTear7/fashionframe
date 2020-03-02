export const getUserById = async (client, args) => {
  const user = await client.query(
    "SELECT id, username FROM users WHERE id = $1",
    args
  );

  return user.rows[0];
};

export const getUserByUsername = async (client, args) => {
  const user = await client.query(
    "SELECT id, username, password FROM users WHERE username = $1",
    args
  );

  return user.rows[0];
};

export const getUserBySocialId = async (client, args) => {
  const user = await client.query(
    "SELECT id, username FROM users WHERE social_id = $1",
    args
  );

  return user.rows[0];
};

export const createUser = async (client, args) => {
  const user = await client.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
    args
  );

  return user.rows[0];
};

export const createUserSocial = async (client, args) => {
  const user = await client.query(
    "INSERT INTO users (username, social_id) VALUES ($1, $2) RETURNING id, username",
    args
  );

  return user.rows[0];
};

export const updateUserUsername = async (client, args) => {
  await client.query("UPDATE users SET username = $1 WHERE id = $2", args);
};

export const getUserProfileInfoById = async (client, args) => {
  const userInfo = await client.query(
    "SELECT u.username, (SELECT COUNT(*) FROM setups_users su JOIN setups s ON su.setup_id = s.id WHERE s.user_id = $1) AS likes FROM users u WHERE u.id = $1",
    args
  );

  return userInfo.rows[0];
};
