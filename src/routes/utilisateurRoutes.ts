import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserCount,
  registerUser,
  loginUser
}                  from "../controller/userController";

const utilisateurRouter = Router();

utilisateurRouter.post("/register", registerUser);
utilisateurRouter.post("/login", loginUser);

utilisateurRouter.put("/:idUser", updateUser);
utilisateurRouter.delete("/:idUser", deleteUser);

utilisateurRouter.get("/", getAllUsers);
utilisateurRouter.get("/:idUser", getUserById);
utilisateurRouter.get("/get/count", getUserCount);

export default utilisateurRouter;
