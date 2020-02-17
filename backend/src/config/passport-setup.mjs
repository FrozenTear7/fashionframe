import dotenv from "dotenv";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import TwitchStrategy from "passport-twitch-new";
import pool from "./db-connect.mjs";

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.rows[0].id);
});

passport.deserializeUser(async (id, done) => {
  const client = await pool.connect();

  try {
    const getUser = await client.query(
      "SELECT * FROM users WHERE users.id = ($1)",
      [id]
    );

    done(null, getUser.rows[0]);
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
});

const findUserOrCreate = async profile => {
  const client = await pool.connect();
  let user = null;

  try {
    user = await client.query("SELECT * FROM users WHERE users.id = ($1)", [
      profile.id
    ]);

    if (user.rowCount == 0) {
      user = await client.query("INSERT INTO users VALUES ($1, $2)", [
        profile.id,
        profile.displayName
      ]);
    }
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
    return user;
  }
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect"
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await findUserOrCreate(profile);

      done(null, user);
    }
  )
);

passport.use(
  new TwitchStrategy.Strategy(
    {
      clientID: process.env.TWITCH_CLIENT_ID,
      clientSecret: process.env.TWITCH_CLIENT_SECRET,
      callbackURL: "/auth/twitchtv/redirect",
      scope: "user_read"
    },
    async (accessToken, refreshToken, profile, done) => {
      profile = { ...profile, displayName: profile.login };
      const user = await findUserOrCreate(profile);

      done(null, user);
    }
  )
);

export default passport;
