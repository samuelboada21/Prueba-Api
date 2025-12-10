import express from "express";
import dotenv from "dotenv";
import asociadosRouter, { cargarAsociados } from "./routes/Asociados";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/asociados", asociadosRouter);

const PORT = process.env.PORT || 3004;
const GITHUB_JSON_URL = process.env.GITHUB_JSON_URL;

app.listen(PORT, async () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  if (!GITHUB_JSON_URL) {
    console.warn("No se proporcionó URL");
    return;
  }

  try {
    await cargarAsociados(GITHUB_JSON_URL);
    console.log("Asociados cargados desde GitHub correctamente");
  } catch (error) {
    console.error("Error cargando asociados desde GitHub:", error);
  }
});
