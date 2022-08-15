import nodemailer from 'nodemailer';
import { google } from 'googleapis';
const { OAuth2 } = google.auth;
import {
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN,
} from '../constant';

const OAUTH_PLAYGROUND =
  'https://developers.google.com/oauthplayground';

const oauth2Client = new OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  OAUTH_PLAYGROUND
);

// send mail
const sendEmail = (to, url, txt) => {
  oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
  });
  const accessToken = oauth2Client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'danglong0911@gmail.com',
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken,
    },
  });

  const mailOptions = {
    from: 'danglong0911@gmail.com',
    to: to,
    subject: 'Yul',
    html: `
            <div style="max-width: 700px; margin:auto; border: 2px solid #ddd; border-radius: 5px; padding: 15px 20px 50px 20px; font-size: 110%;">
            <h2 style="font-size: 28px;color: #1e600d;">Neftclone.yul</h2>

            <p>Please click the button to:</p>
            <a href=${url} style="background: #1e600d; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
            <p>Or follow this link:</p>
            
            ${url}
            </div>
        `,
  };

  smtpTransport.sendMail(mailOptions, (err, infor) => {
    if (err) return err;
    return infor;
  });
};

export default sendEmail;
