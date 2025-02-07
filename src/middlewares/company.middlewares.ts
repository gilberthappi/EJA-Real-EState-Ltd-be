import type { NextFunction } from "express";
import type { Request, Response } from "express";

export const appendPhotoAttachments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.files) {
      const files = req.files as Express.Multer.File[];
      req.body.photo = files.find((file) => file.fieldname == "photo")?.path;
    }
    next();
  } catch (error) {
    next(error);
  }
};
