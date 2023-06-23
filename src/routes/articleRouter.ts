import { Router }                                                                           from "express";
import { createArticle, deleteArticle, getAllArticles, getOneArticle, updateArticle } from "../controller/articleController"

const articleRouter = Router();

articleRouter.post("/", createArticle);
articleRouter.get("/", getAllArticles);
articleRouter.get("/:idArticle", getOneArticle);
articleRouter.delete("/delete/:idArticle", deleteArticle);
articleRouter.delete("/update/:idArticle", updateArticle);

export default articleRouter;