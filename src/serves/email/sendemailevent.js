import  EventEmitter  from "events";
import { sendemail } from "../sendemail.js";

export const myEmitter = new EventEmitter();
myEmitter.on("sendemail", async (data) => {
  try {
    const emailsender = await sendemail(data.email, data.html);
    if (!emailsender) {
      console.error(" Failed to send email to:", data.email);
    } else {
      console.log("Email sent to:", data.email);
    }
  } catch (err) {
    console.error(" Error while sending email:", err.message);
  }
});

