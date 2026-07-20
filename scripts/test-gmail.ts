import nodemailer from "nodemailer";
import { readFileSync } from "fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i), l.slice(i + 1)];
    }),
);

const user = env.GMAIL_USER!;
const pass = env.GMAIL_APP_PASSWORD!;
console.log("user", user);
console.log("passLen", pass?.length);

const t = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: { user, pass },
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 20000,
});

try {
  await t.verify();
  console.log("SMTP_OK");
  const info = await t.sendMail({
    from: "AI CareerPath Feedback" <>,
    to: user,
    subject: "[AI CareerPath Feedback] Setup test",
    text: "Test email from AI CareerPath feedback SMTP setup. If you see this, mail delivery works.",
  });
  console.log("SENT", info.messageId);
} catch (e) {
  console.error("SMTP_FAIL", e instanceof Error ? e.message : e);
  process.exit(1);
}
