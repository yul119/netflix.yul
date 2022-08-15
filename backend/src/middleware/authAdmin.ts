import customRespond from '../helper/customRespond';
import Users from '../models/userModel';

const authAdmin = async (req, res, next) => {
  try {
    const user = await Users.findOne({ _id: req.userId });

    if (user.role !== 1)
      return customRespond(
        res,
        500,
        'Admin resources access denied.'
      );

    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export default authAdmin;
