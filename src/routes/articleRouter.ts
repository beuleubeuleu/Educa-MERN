import { Router }                                                                           from "express";
import { createArticle, deleteArticle, getAllArticles, getOneArticle, updateArticle } from "../controller/articleController"
import upload                                                                               from "../middlewares/imgUpload";
import { estProfesseur }                                                                    from "../middlewares/auth/estProfesseur";
import { estConnecté }                                                                      from "../middlewares/auth/estConnecté";

const articleRouter = Router();

articleRouter.post("/",estProfesseur, upload.single("image"), createArticle);
articleRouter.get("/", estConnecté, getAllArticles);
articleRouter.get("/:idArticle", estConnecté, getOneArticle);
articleRouter.delete("/delete/:idArticle", deleteArticle);
articleRouter.delete("/update/:idArticle", updateArticle);

export default articleRouter;