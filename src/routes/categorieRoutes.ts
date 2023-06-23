import { Router }                                                                           from "express";
import { createCategory, deleteCategory, getAllCategories, getOneCategory } from "../controller/categoryController"
import upload                                                                               from "../middlewares/imgUpload";

const categorieRouter = Router();

categorieRouter.post("/",upload.single("image"), createCategory);
categorieRouter.get("/", getAllCategories);
categorieRouter.get("/:idCategorie", getOneCategory);
categorieRouter.delete("/delete/:idCategorie", deleteCategory);

export default categorieRouter;