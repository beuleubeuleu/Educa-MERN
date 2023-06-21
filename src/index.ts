import app from "./app";

const port = process.env.PORT

app.listen(port, () => console.log(`connecter au stage sur le port ${ port }`))