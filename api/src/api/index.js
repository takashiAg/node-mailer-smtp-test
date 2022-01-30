const express = require("express");

const emojis = require("./emojis");
const sendmail = require("./sendmail");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("<a href='https://www.postman.com/'>use postman</a>");
});

router.use("/emojis", emojis);
router.use("/sendmail", sendmail);

module.exports = router;
