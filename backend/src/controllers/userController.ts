import Users from '../models/userModel';
import customRespond from '../helper/customRespond';

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
  uploadAvt: async (req, res) => {},
};

export default userController;
