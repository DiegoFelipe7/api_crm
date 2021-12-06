import React from "react";
import Alerta from "./Alerta";
import Spinner from "./Spinner";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
const Formulario = ({ cliente, cargando }) => {
  const navigate = useNavigate();
  const NuevoCliente = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre es muy corto")
      .max(20, "El nombre es muy largo")
      .required("El nombre del cliente es obligatorio!"),
    empresa: Yup.string()
      .min(3, "El nombre es muy corto")
      .max(20, "El nombre es muy largo")
      .required("El nombre del la empresa es obligatorio!"),
    email: Yup.string()
      .required("El email es es obligatorio!")
      .email("Email no valido"),
    telefono: Yup.number()
      .positive("Numero no valido")
      .integer("Numero no valido")
      .typeError("El numero no es valido"),
    notas: Yup.string()
      .min(30, "La nota es demacida corta !")
      .required("La nota es obligatoria!"),
  });
  const handleSubmit = async (valores) => {
    try {
      let respuesta;
      if (cliente.id) {
        //editando un registro
        const url = `http://localhost:4000/clientes/${cliente.id}`;
        respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        //Nuevo Registro al documento json
        const url = "http://localhost:4000/clientes";
        respuesta = await fetch(url, {
          method: "POST",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      const resultado = await respuesta.json();
      navigate("/clientes");
    } catch (error) {
      console.log("ocurrio un error" + error);
    }
  };
  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {cliente?.nombre ? "Editar cliente " : "Agregar Cliente"}
      </h1>
      <Formik
        initialValues={{
          nombre: cliente.nombre ? cliente.nombre : "",
          empresa: cliente.empresa ? cliente.empresa : "",
          email: cliente.email ? cliente.email : "",
          telefono: cliente.telefono ? cliente.telefono : "",
          notas: cliente.notas ? cliente.notas : "",
        }}
        enableReinitialize={true} //esta propiedad pinta los valores en los input
        onSubmit={async (values, { resetForm }) => {
          //subtmin para los valores y guardar en la api
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={NuevoCliente}
      >
        {({ errors, touched }) => {
          return (
            <Form className="mt-10" autoComplete="off">
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="nombre">
                  Nombre:
                </label>
                <Field
                  id="nombre"
                  name="nombre"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Nombre del cliente"
                />
                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="empresa">
                  Empresa:
                </label>
                <Field
                  id="empresa"
                  name="empresa"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Empresa del cliente"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="email">
                  Email:
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Empresa del cliente"
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="telefono">
                  Telefono:
                </label>
                <Field
                  id="telefono"
                  name="telefono"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Telefono Celular"
                />
                {errors.telefono && touched.telefono ? (
                  <Alerta>{errors.telefono}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="notas">
                  Notas:
                </label>
                <Field
                  as="textarea"
                  id="notas"
                  name="notas"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50 h-30"
                  placeholder="Notas del cliente"
                />
                {errors.notas && touched.notas ? (
                  <Alerta>{errors.notas}</Alerta>
                ) : null}
              </div>
              <input
                type="submit"
                value={cliente?.nombre ? "Editar Cliente" : "Guardar Cliente"}
                className="mt-5 w-full bg-blue-800 text-white p-3 font-bold text-xl"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
Formulario.defaultProps = {
  cliente: {},
  cargando: false,
};
export default Formulario;

//337416673

///cuenta 39836167  pago de servicios

//
