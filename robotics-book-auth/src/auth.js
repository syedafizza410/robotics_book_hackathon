const { betterAuth } = require("better-auth");
const { google } = require("better-auth/social-providers");
const { drizzleAdapter } = require("better-auth/adapters/drizzle");
const { db } = require("./db");

module.exports.auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  },
  user: {
    additionalFields: {
      softwareBackground: { type: "string", required: false },
      hardwareBackground: { type: "string", required: false },
    },
  },
});