import { Router }                                                                           from "express";
import { createCategory, deleteCategory, getAllCategories, getOneCategory } from "../controller/categoryController"

const categorieRouter = Router();

categorieRouter.post("/", createCategory);
categorieRouter.get("/", getAllCategories);
categorieRouter.get("/:idCategory", getOneCategory);
categorieRouter.delete("/delete/:idCategory", deleteCategory);

export default categorieRouter;