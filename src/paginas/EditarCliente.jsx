import { useState, useEffect } from "react";
import Formulario from "../components/Formulario";
import { useParams } from "react-router-dom";
import NoExiste from "../components/Noexiste";
const EditarCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setCargando(!cargando);
    };
    obtenerClienteAPI();
  }, []);
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">EDITAR CLIENTE</h1>
      <p className="mt-3">utiliza este formulario para actualizar el cliente</p>
      {cliente?.nombre ? (
        <Formulario cliente={cliente} cargando={cargando} />
      ) : (
        <NoExiste mensaje="Usuario no existe" />
      )}
    </>
  );
};

export default EditarCliente;
