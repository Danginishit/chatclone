const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const allRoutes = require('./app/routes/route');

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

  app.use('/user',allRoutes.userRouter);

  app.use('/chat',allRoutes.chatRoutes);

  app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
  });
  
  // set port, listen for requests
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
