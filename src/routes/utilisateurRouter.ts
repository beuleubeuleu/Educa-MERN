import { Router }                                                                                               from "express";
import { deleteUser, getUserById, getUserInfo, loginUser, registerUser, updateUser } from "../controller/userController";
import { estConnecté }                                                                                          from "../middlewares/auth/estConnecté";

const utilisateurRouter = Router();

utilisateurRouter.post("/register", registerUser);
utilisateurRouter.post("/login", loginUser);

utilisateurRouter.get("/user-info", estConnecté, getUserInfo);

utilisateurRouter.get("/:idUser", estConnecté, getUserById);
utilisateurRouter.put("/:idUser", updateUser);
utilisateurRouter.delete("/:idUser", deleteUser);

export default utilisateurRouter;
