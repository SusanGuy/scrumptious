const admin = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      throw new Error();
    }

    next();
  } catch (err) {
    res.status(401).send({ errMessage: "Not authorized. Must be an admin" });
  }
};

module.exports = admin;
