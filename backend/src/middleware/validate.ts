export const checkEmptyData = async (req, res, next) => {
  const errors = [];
  for (const key in req.body) {
    if (!req.body[key]) {
      errors.push(`Please enter your ${key}.`);
    }
  }

  if (errors.length > 0)
    return res.status(401).json({ msg: errors });

  next();
};
