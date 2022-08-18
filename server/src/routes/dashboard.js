const express = require("express");

const router = new express.Router();
var randomstring = require("randomstring");

const Token = require("../models/Token");

// middleware
const { validateUser } = require("../utils/utils");

router.get("/dashboard", validateUser, async (req, res) => {
  const user = res.locals.user;

  if (user.role === "ADMIN") {
    var amount = 0;

    var tokens = await Token.find({
      $or: [
        {
          createdAt: { $gte: new Date().toISOString().split("T")[0] },
        },
        {
          exit: { $gte: new Date().toISOString().split("T")[0] },
        },
      ],
    });

    tokens.forEach((t) => {
      amount = amount + parseInt(t.amount);
    });

    res.send({ tokens: tokens.length, amount });
  } else {
    var count1 = await Token.find({
      createdAt: { $gte: new Date().toISOString().split("T")[0] },
      createdBy: user.email,
    }).count();

    var count2 = await Token.find({
      createdBy: user.email,
    }).count();
    res.send({ todayCount: count1, totalCount: count2 });
  }
});

module.exports = router;
