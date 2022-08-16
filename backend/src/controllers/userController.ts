import Users from '../models/userModel';
import customRespond from '../helper/customRespond';
import cloudinary from 'cloudinary';
import {
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
  CLOUD_NAME,
} from '../constant';
import removeTmp from '../helper/removeTmp';

cloudinary.v2.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

const userController = {
  getUserInfor: async (req, res) => {
    try {
      const user = await Users.findById(req.userId).select(
        '-password'
      );

      res.json(user);
    } catch (error) {
      return customRespond(res, 500, error.message);
    }
  },
  getAllUserInfor: async (req, res) => {
    try {
      const users = await Users.find().select('-password');

      res.json(users);
    } catch (error) {
      return customRespond(res, 500, error.message);
    }
  },
  updateUser: async (req, res) => {
    try {
      const { userName, avatar } = req.body;

      await Users.findByIdAndUpdate(
        { _id: req.userId },
        { userName, avatar }
      );

      customRespond(res, 200, 'Update success!');
    } catch (error) {
      return customRespond(res, 500, error.message);
    }
  },
  deleteUser: async (req, res) => {
    try {
      await Users.findByIdAndDelete(req.params.id);

      customRespond(res, 200, 'Delete success!');
    } catch (error) {
      return customRespond(res, 500, error.message);
    }
  },
  uploadAvatar: (req, res) => {
    try {
      const file = req.files.file;

      cloudinary.v2.uploader.upload(
        file.tempFilePath,
        {
          folder: 'avatar',
          width: 150,
          height: 150,
          crop: 'fill',
        },
        (err, result) => {
          if (err) throw err;

          removeTmp(file.tempFilePath);

          res.json({ url: result.secure_url });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default userController;
