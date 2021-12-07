import jwt from "jsonwebtoken";

export const checkCurrentUser = (req, res, next) => {
  // access authorization from req.header
  const Athorization = req.header("authorization");

  if (!Authorization) {
    req.user = null;
    next();
  } else {
    // get token from authorization
    const token = Authorization.replace("Bearer ", "");

    // verify token
    try {
      const { userId } = jwt.verify(token, process.env.APP_SECRET);
      req.user = { userId };
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
};
