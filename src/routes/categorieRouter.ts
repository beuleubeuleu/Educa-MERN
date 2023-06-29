import { Router }                                                                           from "express";
import { createCategory, deleteCategory, getAllCategories, getOneCategory } from "../controller/categoryController"
import upload                                                                               from "../middlewares/imgUpload";
import { estConnecté }                                                                      from "../middlewares/auth/estConnecté";
import { estAdmin }                                                                         from "../middlewares/auth/estAdmin";

const categorieRouter = Router();

categorieRouter.post("/", estAdmin, upload.single("image"), createCategory);
categorieRouter.get("/", estConnecté, getAllCategories);
categorieRouter.get("/:idCategorie", estConnecté, getOneCategory);
categorieRouter.delete("/delete/:idCategorie", estAdmin, deleteCategory);

export default categorieRouter;