import { Response, NextFunction } from "express";
import { CustomRequest } from "./auth";

export const authorize = (
  roles: string[]
) => {
  return (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {

    if (
      !roles.includes(req.user.role)
    ) {
      return res.status(403).json({
        message: "Forbidden"
      });
    }

    next();
  };
};