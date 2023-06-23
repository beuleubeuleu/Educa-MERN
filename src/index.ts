import app from "./app";
import { main }    from "./config/dbConfig";
import * as dotenv from "dotenv";
dotenv.config()

main(process.env.MONGO_URI).catch(err => console.log(err));

const port = process.env.PORT
app.listen(port, () => console.log(`connecter au stage sur le port ${ port }`))