export const getUserById = async (client, args) => {
  const user = await client.query(
    "SELECT id, username FROM users WHERE id = $1",
    args
  );

  return user.rows[0];
};

export const createUser = async (client, args) => {
  const user = await client.query(
    "INSERT INTO users VALUES ($1, $2) RETURNING id, username",
    args
  );

  return user.rows[0];
};

export const updateUserUsername = async (client, args) => {
  await client.query("UPDATE users SET username = $1 WHERE id = $2", args);
};
