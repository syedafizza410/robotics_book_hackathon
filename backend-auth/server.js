import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { betterAuth } from "better-auth";
import { expressAuth } from "@better-auth/express";

const app = express();
app.use(cors({ origin: "https://robotics-book-hackathon-5zn2.vercel.app", credentials: true }));
app.use(cookieParser());
app.use(express.json());

const auth = betterAuth({
  database: {
    type: "sqlite",
    url: "./auth.db",
  },
  emailAndPassword: { enabled: true },
  oauth: {
    google: {
      clientId: "YOUR_GOOGLE_CLIENT_ID",
      clientSecret: "YOUR_GOOGLE_SECRET",
    }
  },
  user: {
    fields: {
      name: "string",
      number: "string",
      background: "string?",
    }
  }
});

app.use(expressAuth(auth));
app.listen(4000, () => console.log("Auth server running on 4000"));
