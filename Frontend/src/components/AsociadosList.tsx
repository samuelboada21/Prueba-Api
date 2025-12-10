import { useAsociados } from "../hooks/useAsociados";


export function AsociadosList() {
    const {data, loading, error} = useAsociados();

    if(loading) return <p>cargando...</p>;
    if(error) return <p>Error: {error}</p>;

    return (
        <div style={{padding: "20px"}}>
            <h2>Asociados</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Identificación</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((a,index) => (
                        <tr key={index}>
                            <td>{a.id}</td>
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