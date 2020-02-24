export const createSetupUserLike = async (client, args) => {
  await client.query(
    "INSERT INTO setups_users (setup_id, user_id) VALUES ($1, $2)",
    args
  );
};

export const deleteSetupUserLike = async (client, args) => {
  await client.query(
    "DELETE FROM setups_users WHERE setup_id = $1 AND user_id = $2",
    args
  );
};
