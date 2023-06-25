import { Router }                                                                                               from "express";
import { deleteUser, getAllUsers, getUserById, getUserCount, getUserInfo, loginUser, registerUser, updateUser } from "../controller/userController";
import { estConnecté }                                                                                          from "../middlewares/auth/estConnecté";

const utilisateurRouter = Router();

utilisateurRouter.post("/register", registerUser);
utilisateurRouter.post("/login", loginUser);

utilisateurRouter.put("/:idUser", updateUser);
utilisateurRouter.delete("/:idUser", deleteUser);

utilisateurRouter.get("/", getAllUsers);
utilisateurRouter.get("/:idUser", getUserById);
utilisateurRouter.get("/get/count", getUserCount);
utilisateurRouter.get("/get/user-info", estConnecté, getUserInfo);

export default utilisateurRouter;
