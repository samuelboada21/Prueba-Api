import { useAsociados } from "../hooks/useAsociados";


export function AsociadosList() {
    const {data, loading, error} = useAsociados();

    if(loading) return <p>cargando...</p>;
    if(error) return <p>Error: {error}</p>;

    return (
        <div style={{padding: "20px"}}>
            <h2>Asociados</h2>

            <ul>
                {data.map((a, index) => (
                    <li key={index}>
                        {a.Nombre} - {a.Identificación} - {a.estado_pipeline}
                    </li>
                ))}
            </ul>
        </div>
    );
}