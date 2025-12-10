import { Router } from "express";
import { estadoUpdateRequest } from "../types/EstadoUpdateRequest";
import { Asociado } from "../types/Asociado";

const router = Router();

const estadosPermitidos = [
  "Prospecto",
  "Expediente en Construcción",
  "Pendiente Jurídico",
  "Pendiente Cierre de Crédito",
  "Pendiente Firma y Litivo",
  "Pendiente Revisión Abogado",
  "Cartera Activa",
  "Desembolsado/Finalizado",
];

const flujoEstados: { [key: string]: string } = {
  "Prospecto": "Expediente en Construcción",
  "Expediente en Construcción": "Pendiente Jurídico",
  "Pendiente Jurídico": "Pendiente Cierre de Crédito",
  "Pendiente Cierre de Crédito": "Pendiente Firma y Litivo",
  "Pendiente Firma y Litivo": "Pendiente Revisión Abogado",
  "Pendiente Revisión Abogado": "Cartera Activa",
  "Cartera Activa": "Desembolsado/Finalizado",
  "Desembolsado/Finalizado": "",
};

let asociados: Asociado[] = [
  {
    id: "asoc001",
    Nombre: "Juan Pérez",
    Identificación: "10203040",
    estado_pipeline: "Prospecto",
    aporte_49900_pagado: false,
  },
  {
    id: "asoc002",
    Nombre: "María Gómez",
    Identificación: "99442211",
    estado_pipeline: "Expediente en Construcción",
    aporte_49900_pagado: true,
  },
];

router.post("/updateEstadoPipeline", (req, res) => {
  const body = req.body as estadoUpdateRequest;

  if (!body.asociadoId || !body.nuevoEstado) {
    return res.status(400).json({
      error: "Falta información, por favor envie correctamente los datos",
    });
  }
  if (!estadosPermitidos.includes(body.nuevoEstado)) {
    return res.status(400).json({ error: "El estado no es permitido" });
  }

  const asociado = asociados.find((a) => a.id === body.asociadoId);

  if (!asociado) {
    return res.status(404).json({ error: "Asociado no encontrado" });
  }

  //Validacion de aporte
  if (
    body.nuevoEstado === "Pendiente Jurídico" &&
    !asociado.aporte_49900_pagado
  ) {
    return res.status(400).json({
      error:
        "No es posible avanzar a Pendiente Jurídico porque el aporte 49.900 no está pagado",
    });
  }

  //Validacion de siguiente estado
  const sigEstadoPermitido = flujoEstados[asociado.estado_pipeline];
  if (body.nuevoEstado !== sigEstadoPermitido) {
    return res.status(400).json({
      error: `Transición no permitida de '${asociado.estado_pipeline}' a '${body.nuevoEstado}'`,
    });
  }

  asociado.estado_pipeline = body.nuevoEstado;
  asociado.ultima_actualizacion = new Date().toISOString();

  return res.json({
    mensaje: "Estado actualizado correctamente",
    asociado,
  });
});

export default router;
