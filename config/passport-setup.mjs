import dotenv from "dotenv";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import TwitchStrategy from "passport-twitch-new";
import FacebookStrategy from "passport-facebook";
import pool from "./db-connect.mjs";
import {
  getUserById,
  getUserBySocialId,
  createUserSocial
} from "../model/usersModel.mjs";

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const client = await pool.connect();

  try {
    const user = await getUserById(client, [id]);

    done(null, user);
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
});

const findUserOrCreate = async profile => {
  console.log(profile);

  const client = await pool.connect();
  let user = null;

  try {
    user = await getUserBySocialId(client, [profile.provider + profile.id]);

    if (!user) {
      user = await createUserSocial(client, [
        profile.displayName,
        profile.provider + profile.id
      ]);
      user = { ...user, redirectSettings: true };
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

passport.use(
  new FacebookStrategy.Strategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "/auth/facebook/redirect",
      scope: "user_read"
    },
    async (accessToken, refreshToken, profile, done) => {
      profile = { ...profile, displayName: profile.login };
      console.log(profile);

      const user = await findUserOrCreate(profile);

      done(null, user);
    }
  )
);

export default passport;
