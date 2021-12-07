import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // access authorization from req header
  const Authorization = req.header("authorization");

  if (!Authorization) {
    // err : unauthorizd
    const err = new Error("Unauthgorized");
    err.statusCode = 401; // Unthorizied
    return next(err);
  }

  //get token
  const token = Authorization.replace("Bearer ", "");

  // verify toekn
  const { userId } = jwt.verify(token, process.env.APP_SECRET);

  // asign req
  req.user = { userId };
  next();
};
