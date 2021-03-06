export const getSyandanaById = async (client, args) => {
  const syandana = await client.query(
    "SELECT * FROM syandanas WHERE setup_id = $1",
    args
  );

  return syandana.rows[0];
};

export const createSyandana = async (client, args) => {
  const syandana = await client.query(
    "INSERT INTO syandanas (name, setup_id) VALUES ($1, $2) RETURNING id",
    args
  );

  return syandana.rows[0];
};

export const updateSyandana = async (client, args) => {
  const syandana = await client.query(
    "UPDATE syandanas SET name = $1 WHERE setup_id = $2 RETURNING id",
    args
  );

  return syandana.rows[0];
};
