import { Router }                                                                           from "express";
import { createCategory, deleteCategory, getAllCategories, getOneCategory } from "../controller/categoryController"
import upload                                                                               from "../middlewares/imgUpload";
import { estConnecté }                                                                      from "../middlewares/auth/estConnecté";

const categorieRouter = Router();

categorieRouter.post("/",upload.single("image"), createCategory);
categorieRouter.get("/", estConnecté, getAllCategories);
categorieRouter.get("/:idCategorie", estConnecté, getOneCategory);
categorieRouter.delete("/delete/:idCategorie", deleteCategory);

export default categorieRouter;