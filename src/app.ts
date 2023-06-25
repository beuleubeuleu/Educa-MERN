import express, { Express } from "express";
import categorieRouter      from "./routes/categorieRoutes";
import articleRouter        from "./routes/articleRouter";
import utilisateurRouter    from "./routes/utilisateurRoutes";

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

export default app