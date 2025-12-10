import { Asociado } from "../types/Asociado";

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
  Prospecto: "Expediente en Construcción",
  "Expediente en Construcción": "Pendiente Jurídico",
  "Pendiente Jurídico": "Pendiente Cierre de Crédito",
  "Pendiente Cierre de Crédito": "Pendiente Firma y Litivo",
  "Pendiente Firma y Litivo": "Pendiente Revisión Abogado",
  "Pendiente Revisión Abogado": "Cartera Activa",
  "Cartera Activa": "Desembolsado/Finalizado",
  "Desembolsado/Finalizado": "",
};

// Validacion de estado permitido
export function validarEstadoPermitido(nuevoEstado: string): boolean {
  return estadosPermitidos.includes(nuevoEstado);
}

// Validacion transicion de estado
export function validarTransicion(
  asociado: Asociado,
  nuevoEstado: string
): boolean {
  const siguienteEstadoPermitido = flujoEstados[asociado.estado_pipeline];
  return nuevoEstado === siguienteEstadoPermitido;
}

// Validacion de aporte antes de Pendiente Juridico
export function validarAporteJuridico(
  asociado: Asociado,
  nuevoEstado: string
): boolean {
  return !(
    nuevoEstado === "Pendiente Jurídico" && !asociado.aporte_49900_pagado
  );
}
