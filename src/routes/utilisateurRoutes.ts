import { Router }                                                                                               from "express";
import { deleteUser, getAllUsers, getUserById, getUserCount, getUserInfo, loginUser, registerUser, updateUser } from "../controller/userController";
import { estConnecté }                                                                                          from "../middlewares/auth/estConnecté";

const utilisateurRouter = Router();

utilisateurRouter.get("/", getAllUsers);
utilisateurRouter.post("/register", registerUser);
utilisateurRouter.post("/login", loginUser);

utilisateurRouter.get("/user-info", estConnecté, getUserInfo);
utilisateurRouter.get("/count", getUserCount);

utilisateurRouter.get("/:idUser", getUserById);
utilisateurRouter.put("/:idUser", updateUser);
utilisateurRouter.delete("/:idUser", deleteUser);

export default utilisateurRouter;
