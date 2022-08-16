import express from 'express';
import userController from '../controllers/userController';
import auth from '../middleware/auth';
import authAdmin from '../middleware/authAdmin';
import uploadImg from '../middleware/uploadAvt';

const router = express.Router();

router.get('/infor', auth, userController.getUserInfor);

router.get(
  '/all-infor',
  auth,
  authAdmin,
  userController.getAllUserInfor
);

router.patch('/update', auth, userController.updateUser);

router.delete(
  '/delete/:id',
  auth,
  authAdmin,
  userController.deleteUser
);

router.post(
  '/upload-avatar',
  uploadImg,
  userController.uploadAvatar
);

export default router;
