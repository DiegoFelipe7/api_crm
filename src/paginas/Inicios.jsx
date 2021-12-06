import { useEffect, useState } from "react";
import Cliente from "../components/Cliente";
const Inicios = () => {
  const [clientes, setclientes] = useState([]);
  useEffect(() => {
    const obtenerClientesApi = async () => {
      try {
        const url = "http://localhost:4000/clientes";
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setclientes(resultado);
      } catch (error) {
        console.log("Ocurrio un error " + error);
      }
    };
    obtenerClientesApi();
  }, []);

  const handleEliminar = async (id) => {
    const confirmar = confirm("¿Estas Seguro de Eliminar Este Cliente?");
    if (confirmar) {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuest = await fetch(url, {
          method: "DELETE",
        });
        const resultado = await respuest.json();
        const array = clientes.filter((cliente) => cliente.id !== id);
        setclientes(array);
      } catch (error) {
        console.log("Se genero un erro" + error);
      }
    } else {
      alert("Usario no eliminado");
    }
  };
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">CLIENTES</h1>
      <p className="mt-3">Administra tus clientes</p>
      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <Cliente
              key={cliente.id}
              cliente={cliente}
              handleEliminar={handleEliminar}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Inicios;
