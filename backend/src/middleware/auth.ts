import jwt from 'jsonwebtoken';
import customRespond from '../helper/customRespond';

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token)
      return customRespond(
        res,
        400,
        'Invalid Authentication.'
      );

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, user) => {
        if (err)
          return customRespond(
            res,
            400,
            'Invalid Authentication.'
          );
        req.userId = user.id;
        next();
      }
    );
  } catch (error) {
    return customRespond(res, 500, error.message);
  }
};

export default auth;
