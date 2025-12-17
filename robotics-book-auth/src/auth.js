import { betterAuth } from "better-auth";
import { db } from "./db.js";

export const auth = betterAuth({
  database: db,

  emailAndPassword: {
    enabled: true
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
  }
});
