import express, { Express } from "express";
import categorieRouter      from "./routes/categorieRoutes";
import articleRouter from "./routes/articleRouter";

declare global {
  namespace Express {
    interface Request {
      file? : Multer.File
    }
  }
}

const app: Express = express()

app.use(express.json());

app.use("/api/categorie", categorieRouter)
app.use("/api/article", articleRouter)

export default app