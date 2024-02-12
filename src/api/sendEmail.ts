"use server";
import { getLogger } from "@/logging/log-util";
import { createTransport } from "nodemailer";
require("dotenv").config();
export async function sendMail(toWho: any, subject: any, content: any) {
  const logger = getLogger("*");
  logger.info("sendMail");
  try {
    const mailOptions = {
      from: "softyhr@gmail.com",
      to: toWho,
      subject: subject,
      html: content,
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        logger.error(err);
        return {
          Error: err,
          Status: "failed",
          message: "Error sending message",
        };
      } else {
        return {
          Error: null,
          Status: "success",
          message: "Message sent succesfully.",
        };
      }
    });
    return {
      Error: null,
      Status: "success",
      message: "Message sent succesfully.",
    };
  } catch (error) {
    logger.error(error);
    return {
      Error: error,
      Status: "failed",
      message: "Something Went Wrong",
    };
  }
}

const GMAIL_USERNAME = "softyhr@gmail.com";
const OAUTH_CLIENT_ID =
  "258183501603-pj67mgkemi8c3lj57sdcmc20i6o7a2ih.apps.googleusercontent.com";
const OAUTH_CLIENT_SECRET = "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";
const OAUTH_REFRESH_TOKEN =
  "1//04rbAErmdsLyVCgYIARAAGAQSNwF-L9IrP0dcV2gP8mo6Jh3I9U79zQIvXOELwHlojpGNshRys1xGGDcFovAOEzeGN3P0PNWdarw";
const OAUTH_ACCESS_TOKEN =
  "ya29.a0AfB_byCwSL_Jy3utImNs_2O86psZjlX3h5S0uiGF4agYSn093TUbWgawmu_FDEWigcDY60epyAUpFg3ZLU1B0TkcxRBLhVjqFdrew6VvVIVgeapqCOwr2TC61S1G0sSsIRg09G4-up7itL05anbkn4owOExeA5U0b8fkaCgYKAa0SARMSFQHGX2MiN7m8MS70PgLFIiWMceFpzA0171";
let transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    type: "OAUTH2",
    user: GMAIL_USERNAME, //set these in your .env file
    clientId: OAUTH_CLIENT_ID,
    clientSecret: OAUTH_CLIENT_SECRET,
    refreshToken: OAUTH_REFRESH_TOKEN,
    accessToken: OAUTH_ACCESS_TOKEN,
    expires: 3599,
  },
});
