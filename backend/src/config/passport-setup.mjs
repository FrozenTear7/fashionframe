import dotenv from "dotenv";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import pool from "./db-connect.mjs";

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  const getUser = await client.query(
    "SELECT * FROM users WHERE users.id = ($1)",
    [user.id]
  );

  done(null, getUser);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect"
    },
    async (accessToken, refreshToken, profile, done) => {
      const client = await pool.connect();

      try {
        const user = await client.query(
          "SELECT * FROM users WHERE users.id = ($1)",
          [profile.id]
        );

        if (user.rowCount > 0) {
          done(null, user);
        } else {
          const newUser = await client.query(
            "INSERT INTO users VALUES ($1, $2)",
            [profile.id, profile.displayName]
          );

          done(null, newUser);
        }
      } catch (err) {
        console.error(err);
      } finally {
        client.release();
      }
    }
  )
);

export default passport;
