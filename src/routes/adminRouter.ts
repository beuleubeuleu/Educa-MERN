import { Router }   from "express";
import { estAdmin }                                                                                                  from "../middlewares/auth/estAdmin";
import { getEleveCount, getPendingProfs, getProfesseurCount, getTotalArticleCount, getTotalUserCount, validateProf } from "../controller/adminController";

const adminRouter = Router();

adminRouter.get("/eleve/count", estAdmin, getEleveCount);
adminRouter.get("/professeur/count", estAdmin, getProfesseurCount);
adminRouter.get("/user/count", estAdmin, getTotalUserCount);
adminRouter.get("/article/count", estAdmin, getTotalArticleCount);
adminRouter.get("/professeur", estAdmin, getPendingProfs);
adminRouter.post("/professeur/validate/:idProf", estAdmin, validateProf);

export default adminRouter;