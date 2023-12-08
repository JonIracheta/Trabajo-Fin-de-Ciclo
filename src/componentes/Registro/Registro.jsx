import "bootstrap/dist/css/bootstrap.min.css";
import "./Registro.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../Login/logo_transparent.png";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const Registro = () => {
  const [registroExitoso, setRegistroExitoso] = useState(false);

  const formik = useFormik({
    initialValues: {
      nombre: "",
      primerApellido: "",
      segundoApellido: "",
      email: "",
      contraseña: "",
      submit: null,
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .min(2, "El nombre debe contener al menos dos caracteres")
        .max(25, "El nombre no puede exceder los 25 caracteres")
        .required("El nombre es requerido"),
      primerApellido: Yup.string()
        .min(3, "El primer apellido debe tener más caracteres")
        .max(25, "Apellido demasiado largo")
        .required("El primer apellido es requerido"),
      segundoApellido: Yup.string()
        .min(3, "El segundo apellido debe tener más caracteres")
        .max(25, "Apellido demasiado largo")
        .required("El segundo apellido es requerido"),
      email: Yup.string()
        .email("El formato del correo electrónico no es válido")
        .required("El correo electrónico es requerido"),
      contraseña: Yup.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
          "La contraseña debe contener al menos una mayúscula, un número y un carácter especial"
        )
        .required("La contraseña es requerida"),
    }),
    onSubmit: async (event, helpers) => {
      try {
        const response = await axios.post(
          "http://localhost:5022/api/usuarios/registrar",
          event
        );
        console.log(event);

        formik.resetForm();
        setRegistroExitoso(true);

        setTimeout(() => {
          setRegistroExitoso(false);
        }, 3000);
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <div className="contenedor-principal">
      <Form noValidate className="form" onSubmit={formik.handleSubmit}>
        <div className="logo-container">
          <img src={logo} className="logo" alt="Logo" />
        </div>
        {registroExitoso && (
          <div className="mensaje-exito">{window.alert('Usuario registrado correctamente')}</div>
        )}
        <Form.Group className="mb-3" controlId="formBasicNombre">
          <FloatingLabel controlId="floatingNombre" label="Nombre">
            <Form.Control
              type="text"
              placeholder="Ingresa tu nombre"
              name="nombre"
              onChange={formik.handleChange}
              onBlur={formik.onBlur}
              value={formik.values.nombre}
            />
            {formik.touched.nombre && formik.errors.nombre ? (
              <div className="error">{formik.errors.nombre}</div>
            ) : null}
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPrimerApellido">
          <FloatingLabel controlId="floatingNombre" label="Primer apellido">
            <Form.Control
              type="text"
              placeholder="Ingresa tu primer apellido"
              name="primerApellido"
              onChange={formik.handleChange}
              onBlur={formik.onBlur}
              value={formik.values.primerApellido}
            />
            {formik.touched.primerApellido && formik.errors.primerApellido ? (
              <div className="error">{formik.errors.primerApellido}</div>
            ) : null}
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicSegundoApellido">
          <FloatingLabel controlId="floatingNombre" label="Segundo apellido">
            <Form.Control
              type="text"
              placeholder="Ingresa tu segundo apellido"
              name="segundoApellido"
              onChange={formik.handleChange}
              onBlur={formik.onBlur}
              value={formik.values.segundoApellido}
            />
            {formik.touched.segundoApellido && formik.errors.segundoApellido ? (
              <div className="error">{formik.errors.segundoApellido}</div>
            ) : null}
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel controlId="floatingNombre" label="Email">
            <Form.Control
              type="email"
              placeholder="Ingresa tu correo electrónico"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.onBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicContraseña">
          <FloatingLabel controlId="floatingNombre" label="Contraseña">
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña"
              name="contraseña"
              onChange={formik.handleChange}
              onBlur={formik.onBlur}
              value={formik.values.contraseña}
            />
            {formik.touched.contraseña && formik.errors.contraseña ? (
              <div className="error">{formik.errors.contraseña}</div>
            ) : null}
          </FloatingLabel>
        </Form.Group>

        <Button
          className="boton-principal btn btn-primary"
          variant="primary"
          type="submit"
        >
          Registrarse
        </Button>

        <Link to="/" style={{ textDecoration: "none" }}>
          <Button className="boton-secundario" variant="primary">
            Volver al inicio
          </Button>
        </Link>
      </Form>
    </div>
  );
};

export default Registro;
