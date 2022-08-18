require("dotenv").config();
const express = require("express");
var cors = require("cors");

// router
const authRouter = require("./src/routes/userAuth");
const ticketRouter = require("./src/routes/ticket");
const dashboardRouter = require("./src/routes/dashboard");

// initialize express app
const app = express();
app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(ticketRouter);
app.use(dashboardRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening on ${process.env.SERVER_PORT}`);
});
