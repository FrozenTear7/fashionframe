import frames from "../../public/warframe_data/frames.json";

export const getSetupList = async (client, args, frame, orderBy, order) => {
  let setupsQueryString =
    "SELECT u.username, s.id, s.name, s.screenshot, s.frame, s.created_at, (SELECT COUNT(*) FROM setups_users WHERE setup_id = s.id) AS liked FROM setups s\n" +
    "JOIN users u ON u.id = s.user_id";

  if (frame && frames.frames.includes(frame))
    setupsQueryString += ` WHERE s.frame = '${frame}'`;

  setupsQueryString += ` ORDER BY ${orderBy} ${order} LIMIT $1 OFFSET $2`;

  console.log(setupsQueryString);
  console.log(args);

  const setupListInfo = await client.query(setupsQueryString, args);

  console.log(setupListInfo.rows);

  return setupListInfo.rows;
};

export const getSetupByUserAndSetupId = async (client, args) => {
  const setup = await client.query(
    "SELECT u.username, s.*, (SELECT COUNT(*) FROM setups_users WHERE setup_id = $2) AS liked,\n" +
      "EXISTS(SELECT 1 FROM setups_users WHERE user_id = $1 AND setup_id = $2) AS likedbyyou FROM setups s JOIN users u ON u.id = s.user_id WHERE s.id = $2",
    args
  );

  return setup.rows[0];
};

export const getSetupsCount = async (client, args) => {
  const setupsCount = await client.query(
    "SELECT COUNT(s.id) FROM setups s JOIN users u ON u.id = s.user_id WHERE s.frame = $1",
    args
  );

  return setupsCount.rows[0].count;
};

export const getSetupAuthor = async (client, args) => {
  const author = await client.query(
    "SELECT user_id FROM setups WHERE id = $1",
    args
  );

  return author.rows[0];
};

export const createSetup = async (client, args) => {
  const setup = await client.query(
    "INSERT INTO setups (name, frame, description, screenshot, helmet, skin, user_id)\n" +
      "VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
    args
  );

  return setup.rows[0];
};

export const deleteSetupBySetupAndUserId = async (client, args) => {
  await client.query("DELETE FROM setups WHERE id = $1 AND user_id = $2", args);
};

export const updateSetup = async (client, args) => {
  const setup = await client.query(
    "UPDATE setups SET name = $1, frame = $2, description = $3, screenshot = $4, helmet = $5, skin = $6\n" +
      "WHERE id = $7 RETURNING id",
    args
  );

  return setup.rows[0];
};
