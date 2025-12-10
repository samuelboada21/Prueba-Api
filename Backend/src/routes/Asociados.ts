import { Router } from "express";
import { estadoUpdateRequest } from "../types/EstadoUpdateRequest";
import { Asociado } from "../types/Asociado";
import {
  validarAporteJuridico,
  validarEstadoPermitido,
  validarTransicion,
} from "../validations/asociadoValidation";

const router = Router();

let asociados: Asociado[] = [];

export async function cargarAsociados(url: string) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    asociados = data as Asociado[];
    console.log("Asociados cargados:", asociados.length);
  } catch (error) {
    console.error("Error cargando asociados:", error);
  }
}

router.post("/updateEstadoPipeline", (req, res) => {
  const body = req.body as estadoUpdateRequest;

  if (!body.asociadoId || !body.nuevoEstado) {
    return res.status(400).json({
      error: "Falta información, por favor envie correctamente los datos",
    });
  }

  const asociado = asociados.find((a) => a.id === body.asociadoId);

  if (!asociado) {
    return res.status(404).json({ error: "Asociado no encontrado" });
  }
  if (!validarEstadoPermitido(body.nuevoEstado)) {
    return res.status(400).json({ error: "Estado no permitido" });
  }
  if (!validarAporteJuridico(asociado, body.nuevoEstado)) {
    return res.status(400).json({
      error:
        "No se puede avanzar a 'Pendiente Jurídico' porque el aporte 49.900 no está pagado",
    });
  }
  if (!validarTransicion(asociado, body.nuevoEstado)) {
    return res.status(400).json({
      error: `Transición no permitida de '${asociado.estado_pipeline}' a '${body.nuevoEstado}'`,
    });
  }

  asociado.estado_pipeline = body.nuevoEstado;
  asociado.ultima_actualizacion = new Date().toISOString();

  return res.json({
    mensaje: "Estado actualizado correctamente",
    asociado: {
      Nombre: asociado.Nombre,
      Estado: asociado.estado_pipeline,
      Ultima_Actualizacion: asociado.ultima_actualizacion
    },
  });
});

export default router;
