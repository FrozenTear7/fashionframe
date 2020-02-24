export const getAttachmentsById = async (client, args) => {
  const attachments = await client.query(
    "SELECT * FROM attachments WHERE setup_id = $1",
    args
  );

  return attachments.rows[0];
};

export const createAttachments = async (client, args) => {
  const attachments = await client.query(
    "INSERT INTO attachments (chest, left_arm, right_arm, left_leg, right_leg, ephemera, setup_id)\n" +
      "VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
    args
  );

  return attachments.rows[0];
};

export const updateAttachments = async (client, args) => {
  const attachments = await client.query(
    "UPDATE attachments SET chest = $1, left_arm = $2, right_arm = $3, left_leg = $4, right_leg = $5, ephemera = $6\n" +
      "WHERE setup_id = $7 RETURNING id",
    args
  );

  return attachments.rows[0];
};
