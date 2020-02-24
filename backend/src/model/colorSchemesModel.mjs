export const getColorSchemeById = async (client, args) => {
  const colorScheme = await client.query(
    "SELECT * FROM color_schemes WHERE id = $1",
    args
  );

  return colorScheme.rows[0];
};

export const createColorScheme = async (client, args) => {
  const colorScheme = await client.query(
    'INSERT INTO color_schemes ("primary", secondary, tertiary, accents, emmissive1, emmissive2, energy1, energy2)\n' +
      "VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
    args
  );

  return colorScheme.rows[0];
};

export const updateColorScheme = async (client, args) => {
  const colorScheme = await client.query(
    'UPDATE color_schemes SET "primary" = $1, "secondary" = $2, tertiary = $3, accents = $4, emmissive1 = $5, emmissive2 = $6, energy1 = $7, energy2 = $8\n' +
      "WHERE id = $9 RETURNING id",
    args
  );

  return colorScheme.rows[0];
};
