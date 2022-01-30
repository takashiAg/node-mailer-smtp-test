const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const host = process.env.SMTP_HOST || "localhost";
const port = parseInt(process.env.SMTP_PORT) || 25;
const from = process.env.MAIL_ADDRESS || "test@test.com";

const smtp = nodemailer.createTransport({
  host,
  port,
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { to, message, subject } = req.body;
    if (!to) throw new Error("to is required");
    if (!message) throw new Error("message is required");
    if (!subject) throw new Error("subject is required");

    const option = { from, to, subject, text: message };
    const result = await smtp.sendMail(option);

    res.json({
      message: "message has been sent",
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: true, message: e.message });
  }
});

module.exports = router;
