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

const usersRouter = Router();

usersRouter.post("/register", registerUser);
usersRouter.post("/login", loginUser);

usersRouter.put("/:idUser", updateUser);
usersRouter.delete("/:idUser", deleteUser);

usersRouter.get("/", getAllUsers);
usersRouter.get("/:idUser", getUserById);
usersRouter.get("/get/count", getUserCount);

export default usersRouter;