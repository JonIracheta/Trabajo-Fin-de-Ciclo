import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "./logo_transparent.png";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      contraseña: "",
      submit: null,
    },
    validationSchema: Yup.object({
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
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post("http://localhost:5022/api/usuarios/login", values);
    
        if (response.status === 200) {
          console.log('Inicio de sesión exitoso');
          navigate('/inicio');
        } else {
          console.log('Error al iniciar sesión');
          setError('Usuario o contraseña incorrectos');
        }
      } catch (error) {
        console.error('Error al iniciar sesión', error);
        setError('Usuario o contraseña incorrectos');
        setSubmitting(false);
      }
    }
     
  });

  return (
    <div className="contenedor-principal">
      <Form className="form" onSubmit={formik.handleSubmit}>
        <div className="logo-container">
          <img src={logo} className="logo" alt="Logo" />
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel
            controlId="floatingInput"
            label="Correo electrónico"
            className="mb-3"
          >
            <Form.Control type="email" placeholder="Ingresa el correo" name="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <FloatingLabel
            controlId="floatingPassword"
            label="Contraseña"
            className="mb-3"
          >
            <Form.Control type="password" placeholder="Ingresa la contraseña"  name="contraseña" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.contraseña}/>
            {formik.touched.contraseña && formik.errors.contraseña ? (
              <div className="error">{formik.errors.contraseña}</div>
            ) : null}
          </FloatingLabel>
        </Form.Group>  
          {error && <div className="error">{error}</div>}      
          <Button
            className="boton-principal btn btn-primary"
            variant="primary"
            type="submit"
          >
            Iniciar sesión
          </Button>        
        <Link to="/registro" style={{ textDecoration: "none" }}>
          <Button className="boton-secundario" variant="primary" type="submit">
            Registrarse
          </Button>
        </Link>
        <Button className="boton-secundario" variant="primary" type="submit">
          ¿Ha olvidado su contraseña?
        </Button>
      </Form>
    </div>
  );
};

export default Login; 