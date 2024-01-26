const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');


const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
    cookieSession({
      name: "bezkoder-session",
      keys: ["COOKIE_SECRET"], // should use as secret environment variable
      httpOnly: true,
    })
  );
