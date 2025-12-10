import { useState } from "react";
import { useAsociados } from "../hooks/useAsociados";


export function AsociadosList() {
    const {data, loading, error} = useAsociados();
    const [filter, setFilter] = useState("Todos");


    const filteredData = filter === "Todos" ? data : data.filter((a) => a.estado_pipeline === filter);

    if(loading) return <p>cargando Asociados...</p>;
    if(error) return <p>Error: {error}</p>;

    return (
        <div style={{padding: "20px"}}>
            <h2>Asociados</h2>

            <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{marginBottom: "20px", padding: "6px"}}>
                <option value="Todos">Todos</option>
                <option value="Prospecto">Prospecto</option>
                <option value="Expediente en Construcción">Expediente en Construcción</option>
                <option value="Pendiente Jurídico">Pendiente Jurídico</option>
                <option value="Pendiente Cierre de Crédito">Pendiente Cierre de Crédito</option>
            </select>

            <table border={1} cellPadding={8} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Identificación</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((a,index) => (
                        <tr key={index}>
                            <td>{a.Nombre}</td>
                            <td>{a.Identificación}</td>
                            <td>{a.estado_pipeline}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}