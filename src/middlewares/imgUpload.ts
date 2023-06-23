import { Request } from "express";
import multer      from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "client/public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const fileFilter = (req: Request, file: any, cb: any) => {
  if ( file.mimetype === "image/webp" || file.mimetype === "image/avif" ) {
    cb(null, true);
  } else {
    cb(new Error("Veuillez utiliser une image au format webP ou AVIF"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload