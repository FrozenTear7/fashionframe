export const getSetupColorSchemeById = async (client, args) => {
  const colorScheme = await client.query(
    "SELECT * FROM setups_color_schemes WHERE setup_id = $1",
    args
  );

  return colorScheme.rows[0];
};

export const getAttachmentsColorSchemeById = async (client, args) => {
  const colorScheme = await client.query(
    "SELECT * FROM attachments_color_schemes WHERE attachments_id = $1",
    args
  );

  return colorScheme.rows[0];
};

export const getSyandanaColorSchemeById = async (client, args) => {
  const colorScheme = await client.query(
    "SELECT * FROM syandanas_color_schemes WHERE syandana_id = $1",
    args
  );

  return colorScheme.rows[0];
};

export const createSetupColorScheme = async (client, args) => {
  await client.query(
    'INSERT INTO setups_color_schemes ("primary", secondary, tertiary, accents, emmissive1, emmissive2, energy1, energy2, setup_id)\n' +
      "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
    args
  );
};

export const createAttachmentsColorScheme = async (client, args) => {
  await client.query(
    'INSERT INTO attachments_color_schemes ("primary", secondary, tertiary, accents, emmissive1, emmissive2, energy1, energy2, attachments_id)\n' +
      "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
    args
  );
};

export const createSyandanaColorScheme = async (client, args) => {
  await client.query(
    'INSERT INTO syandanas_color_schemes ("primary", secondary, tertiary, accents, emmissive1, emmissive2, energy1, energy2, syandana_id)\n' +
      "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
    args
  );
};

export const updateSetupColorScheme = async (client, args) => {
  await client.query(
    'UPDATE setups_color_schemes SET "primary" = $1, "secondary" = $2, tertiary = $3, accents = $4, emmissive1 = $5, emmissive2 = $6, energy1 = $7, energy2 = $8\n' +
      "WHERE setup_id = $9",
    args
  );
};

export const updateAttachmentsColorScheme = async (client, args) => {
  await client.query(
    'UPDATE attachments_color_schemes SET "primary" = $1, "secondary" = $2, tertiary = $3, accents = $4, emmissive1 = $5, emmissive2 = $6, energy1 = $7, energy2 = $8\n' +
      "WHERE attachments_id = $9",
    args
  );
};

export const updateSyandanaColorScheme = async (client, args) => {
  await client.query(
    'UPDATE syandanas_color_schemes SET "primary" = $1, "secondary" = $2, tertiary = $3, accents = $4, emmissive1 = $5, emmissive2 = $6, energy1 = $7, energy2 = $8\n' +
      "WHERE syandana_id = $9",
    args
  );
};
