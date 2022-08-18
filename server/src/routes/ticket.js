const express = require("express");

const router = new express.Router();
var randomstring = require("randomstring");

const Token = require("../models/Token");
const DATE_DIFF = require("date-diff-js");

// middleware
const { validateUser } = require("../utils/utils");
const { parse } = require("dotenv");

router.post("/new-token", validateUser, async (req, res) => {
  var veh = req.body;
  var id = randomstring.generate(7);

  try {
    var token = await new Token({
      id: id,
      createdBy: res.locals.user.email,
      vehNumber: veh.vehNum,
      vehType: veh.vehType,
      entry: new Date(),
      exit: "",
    });
    token = await token.save();
    return res.status(201).send({ ...token._doc });
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }
});

router.get("/token/:id", validateUser, async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).send();
  const user = res.locals.user;
  try {
    var token = await Token.findOne({ id });
    if (!token)
      return res.status(404).send({ message: "Unable to Find Token" });

    var data = {
      id: token.id,
      createdBy: token.createdBy,
      vehNumber: token.vehNumber,
      vehType: token.vehType,
      entry: token.entry,
      exit: token.exit,
      createdAt: token.createdAt,
      amount: parseFloat(token.amount),
      exitIssued: token.exitIssued,
    };
    if (user.role === "ADMIN") return res.send(data);

    if (token.createdBy !== user.email)
      return res.status(404).send({ message: "Unable to Find Token" });
    delete data.createdBy;
    res.send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/token/exit/:id", validateUser, async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).send();
  const user = res.locals.user;
  try {
    var token = await Token.findOne({ id });
    if (!token)
      return res.status(404).send({ message: "Unable to Find Token" });

    var data = calculateFare(token);
    token.exit = data.exit;
    token.amount = data.amount;

    var updated = await Token.findOneAndUpdate(
      { id: token.id },
      { ...data, exitIssued: true }
    );

    // updated = { ...updated, amount: parseFloat(updated.amount) };
    updated = {
      exit: data.exit,
      amount: parseFloat(token.amount),
      exitIssued: true,
    };
    if (user.role === "ADMIN") return res.send(updated);

    if (token.createdBy !== user.email)
      return res.status(404).send({ message: "Unable to Find Token" });
    delete updated.createdBy;
    res.send(updated);

    console.log(updated);
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/tokens", validateUser, async (req, res) => {
  const start = req.query.start || 0;
  const limit = req.query.limit || 10;
  const user = res.locals.user;

  try {
    var query;
    if (user.role === "ADMIN")
      query = Token.find().limit(limit).skip(start).sort("createdAt");
    else
      query = Token.find({ createdBy: user.email })
        .limit(limit)
        .skip(start)
        .sort("createdAt");

    const tokens = await query.exec();

    var data = tokens.map((item) => {
      var tokenItem = { ...item._doc };
      delete tokenItem._id;
      delete tokenItem.__v;
      tokenItem.amount = parseFloat(tokenItem.amount);
      if (user.role !== "ADMIN") delete tokenItem.createdBy;

      return tokenItem;
    });

    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

function calculateFare(token) {
  let fare;

  const exit = new Date();
  const entry = new Date(token.entry);

  var dateDiff = DATE_DIFF(entry, exit, "h");

  const time = dateDiff.totals.minutes / 60;

  switch (token.vehType) {
    case "bike":
      fare = 1;
      break;
    case "car":
      fare = 2;

      break;
    case "truck":
      fare = 3;
      break;
    default:
      break;
  }
  let TotalFare = time * fare;
  let timeSpent = Math.round(time * 10) / 10;
  return {
    amount: Math.round(TotalFare),
    timeSpent,
    exit: exit,
  };
}

module.exports = router;
