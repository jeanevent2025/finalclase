import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { Proveedor } from "../types/Proveedor";
import { API_URL } from "../utils";
import axios from "axios";
import './Suppliers.css'

function Suppliers() {
    const [listaProveedores, setListaProveedores] = useState<Proveedor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        leerServicio();
    }, []);

    const leerServicio = () => {
        axios.get<Proveedor[]>(API_URL + "proveedores.php")
            .then((response) => {
                console.log(response);
                setListaProveedores(response.data);
                setLoading(false)
            })
            .catch((error) => {
                console.error("Error consultando datos:", error);
            });
    }

    const dibujarTabla = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Empresa</th>
                        <th>Contacto</th>
                        <th>Cargo</th>
                        <th>Ciudad</th>
                        <th>País</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaProveedores.map(item =>
                            <tr key={item.idproveedor}>
                                <td>{item.idproveedor}</td>
                                <td>{item.nombreempresa}</td>
                                <td>{item.nombrecontacto}</td>
                                <td>{item.cargocontacto}</td>
                                <td>{item.ciudad}</td>
                                <td>{item.pais}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        )
    }

    const dibujarPrecarga = () => {
        return (
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        )
    }

    return (
        <>
            <PageHeader pageTitle="Proveedores" />
            <section id="suppliers" className='padded'>
                <div className="container">
                    {loading ? dibujarPrecarga(): dibujarTabla()}
                </div>
            </section>
        </>
    )
}

export default Suppliers