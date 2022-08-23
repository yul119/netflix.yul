import express from 'express';
import authController from '../controllers/authController';
import { checkEmptyData } from '../middleware/validate';
import auth from '../middleware/auth';

const router = express.Router();

router.post(
  '/register',
  checkEmptyData,
  authController.register
);
router.post(
  '/activation',
  checkEmptyData,
  authController.activation
);
router.post('/login', checkEmptyData, authController.login);
router.post(
  '/refresh',
  checkEmptyData,
  authController.getAccessToken
);
router.post(
  '/re-send-password',
  checkEmptyData,
  authController.forgotPassword
);
router.post(
  '/change-password',
  checkEmptyData,
  auth,
  authController.changePassword
);
router.get('/logout', authController.logout);
router.post('/google-login', authController.googleLogin);
router.post(
  '/facebook-login',
  authController.facebookLogin
);

export default router;
