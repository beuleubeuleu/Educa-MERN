import express from 'express';
import * as dotenv from "dotenv"
import { main }    from "./config/dbConfig";

dotenv.config()
const app = express()

main().catch(err => console.log(err));
app.use(express.json());

export default app