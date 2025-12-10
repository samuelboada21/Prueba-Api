import express from "express";
import dotenv from "dotenv";
import asociadosRouter from "./routes/Asociados"

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/asociados", asociadosRouter);

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
console.log(`Servidor corriendo en el puerto ${PORT}`)
})