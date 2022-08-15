import Users from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {
  validateEmail,
  createAccessToken,
  createRefreshToken,
  createActivationToken,
  verifyToken,
} from '../helper/processToken';
import sendEmail from '../helper/sendEmail';
import customRespond from '../helper/customRespond';
import { google } from 'googleapis';
import fetch from 'node-fetch';

const { OAuth2 } = google.auth;
const client = new OAuth2(
  '310055488729-26ou1ufirli5omtmi53cg41qj5ejlee9.apps.googleusercontent.com'
);

const authController = {
  register: async (req, res) => {
    try {
      const { userName, email, password } = req.body;

      if (!validateEmail(email))
        return customRespond(res, 400, 'Invalid email.');

      const isExist = await Users.findOne({ email });
      if (isExist)
        return customRespond(
          res,
          400,
          'This email already exists.'
        );
      if (password.length < 8)
        return customRespond(
          res,
          400,
          'Your password must be more than 8 characters.'
        );

      const hashedPassword = await bcrypt.hash(
        password,
        12
      );

      const newUser = {
        userName,
        email,
        password: hashedPassword,
      };

      const acivationToken = createActivationToken(newUser);

      const url = `${process.env.CLIENT_URL}/user/activate/${acivationToken}`;
      sendEmail(email, url, 'Verify your email address.');

      customRespond(
        res,
        200,
        'Register success! Please check email to activate your account.'
      );
    } catch (err) {
      return customRespond(res, 500, err.message);
    }
  },
  activation: async (req, res) => {
    try {
      const { activationToken } = req.body;

      const user = verifyToken(
        activationToken,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      const { userName, email, password } = user;

      const isExist = await Users.findOne({ email });
      if (isExist)
        return customRespond(
          res,
          400,
          'This email already exists.'
        );

      const newUser = new Users({
        userName,
        email,
        password,
      });

      await newUser.save();

      customRespond(
        res,
        200,
        'Account have been activated.'
      );
    } catch (error) {
      return customRespond(res, 500, error.message);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user)
        return customRespond(
          res,
          400,
          'This email does not exist.'
        );

      const isMatch = await bcrypt.compare(
        password,
        user.password
      );
      if (!isMatch)
        return customRespond(
          res,
          400,
          'Password is incorrect.'
        );

      const refreshToken = createRefreshToken({
        id: user._id,
      });
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/auth/refresh',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      customRespond(res, 200, 'Login success!');
    } catch (error) {
      return customRespond(res, 500, error.message);
    }
  },
  getAccessToken: (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken)
        return customRespond(res, 400, 'Please login now!');

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err)
            return customRespond(
              res,
              400,
              'Please login now!'
            );

          const accessToken = createAccessToken({
            id: user.id,
          });
          return res.json({ accessToken });
        }
      );
    } catch (err) {
      return customRespond(res, 500, err.message);
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      console.log(email);
      const user = await Users.findOne({ email });
      if (!user)
        return customRespond(
          res,
          400,
          'This email does not exist.'
        );

      const accessToken = createAccessToken({
        id: user._id,
      });
      const url = `${process.env.CLIENT_URL}/user/reset/${accessToken}`;
      sendEmail(email, url, 'Reset your password.');

      customRespond(
        res,
        200,
        'Please enter your email to reset password.'
      );
    } catch (error) {
      return customRespond(res, 500, error.message);
    }
  },
  changePassword: async (req, res) => {
    try {
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);

      await Users.findOneAndUpdate(
        { _id: req.userId },
        {
          password: passwordHash,
        }
      );

      customRespond(
        res,
        200,
        'Password successfully changed!'
      );
    } catch (error) {
      customRespond(res, 500, error.message);
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('refreshToken', {
        path: '/auth/refresh',
      });
      customRespond(res, 200, 'Logout success!');
    } catch (error) {
      return customRespond(res, 500, error.message);
    }
  },
  googleLogin: async (req, res) => {
    try {
      const { tokenId } = req.body;
      console.log('tokenId: ', tokenId);
      // const verify = await client.verifyIdToken({
      //   idToken: tokenId,
      //   audience:
      //     '310055488729-26ou1ufirli5omtmi53cg41qj5ejlee9.apps.googleusercontent.com',
      // });
      // console.log(verify);

      // const { email_verified, email, name, picture } =
      //   verify.payload;

      // const password = email + process.env.GOOGLE_SECRET;

      // const passwordHash = await bcrypt.hash(password, 12);

      // if (!email_verified)
      //   return res
      //     .status(400)
      //     .json({ msg: 'Email verification failed.' });

      // const user = await Users.findOne({ email });

      // if (user) {
      //   const isMatch = await bcrypt.compare(
      //     password,
      //     user.password
      //   );
      //   if (!isMatch)
      //     return customRespond(
      //       res,
      //       400,
      //       'Password is incorrect.'
      //     );

      //   const refreshToken = createRefreshToken({
      //     id: user._id,
      //   });
      //   res.cookie('refreshtoken', refreshToken, {
      //     httpOnly: true,
      //     path: '/auth/refresh',
      //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      //   });

      //   res.json({ msg: 'Login success!' });
      // } else {
      //   const newUser = new Users({
      //     name,
      //     email,
      //     password: passwordHash,
      //     avatar: picture,
      //   });

      //   await newUser.save();

      //   const refreshToken = createRefreshToken({
      //     id: newUser._id,
      //   });
      //   res.cookie('refreshtoken', refreshToken, {
      //     httpOnly: true,
      //     path: '/auth/refresh',
      //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      //   });

      //   res.json({ msg: 'Login success!' });
      // }
    } catch (err) {
      return customRespond(res, 500, err.message);
    }
  },
};

export default authController;
