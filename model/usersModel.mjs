export const getUserById = async (client, args) => {
  const user = await client.query(
    "SELECT id, username FROM users WHERE id = $1",
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
