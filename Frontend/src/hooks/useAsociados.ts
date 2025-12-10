import { useEffect, useState } from "react";
import type { Asociado } from "../types/Asociado";


export function useAsociados(){
    const [data, setData] = useState<Asociado[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const URL = "https://raw.githubusercontent.com/managerrojo/COAVANCOL-Prueba-T-cnica-/refs/heads/main/IndexAsociados";

    useEffect(() => {
        async function fecthData() {
            try {
                setLoading(true);
                const res = await fetch(URL);

                if(!res.ok){
                    throw new Error("Error al obtener los datos");
                }

                const response: Asociado[] = await res.json();
                setData(response);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Se produjo un error desconocido")
                }
            } finally {
                setLoading(false);
            }
        }
        fecthData();
    }, []);
    return {data, loading, error}
}