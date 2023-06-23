import express, { Express } from "express";
import categorieRouter      from "./routes/categorieRoutes";
import articleRouter from "./routes/articleRouter";

const app: Express = express()

app.use(express.json());

app.use("/api/categorie", categorieRouter)
app.use("/api/article", articleRouter)

export default app