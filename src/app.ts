import express, { Express } from "express";
import categorieRouter      from "./routes/categorieRouter";
import articleRouter     from "./routes/articleRouter";
import utilisateurRouter from "./routes/utilisateurRouter";
import adminRouter          from "./routes/adminRouter";

declare global {
  namespace Express {
    interface Request {
      file?: Multer.File
      user?: any
    }
  }
}

const app: Express = express()

app.use(express.json());

app.use("/api/categorie", categorieRouter)
app.use("/api/article", articleRouter)
app.use("/api/utilisateur", utilisateurRouter)
app.use("/api/admin", adminRouter)

export default app