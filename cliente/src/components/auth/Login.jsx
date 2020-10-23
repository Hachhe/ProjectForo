import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import uuid from "uuid/dist/v4";
const Login = ({ usuarios }) => {
    const router = useHistory();
    const [error, setError] = useState({
        found: false,
        message: "Credenciales inválidas.",
    });
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Email incorrecto")
                .required("El campo es obligatorio"),
            password: Yup.string().required("El campo es obligatorio"),
        }),
        onSubmit: (e, { resetForm }) => {
            e.id = uuid();
            console.log(e);
            resetForm({ e: "" });

            const usuario = usuarios.find((usuario) => {
                if (
                    usuario.email === e.email &&
                    usuario.password === e.password
                ) {
                    return usuario;
                }
            });
            if (!!usuario) {
                router.push("/proyectos");
            } else {
                setError({ found: true, message: "Credenciales inválidas." });
            }
        },
    });

    useEffect(() => {
        if (error.found) {
            setTimeout(() => {
                setError((prev) => !prev.found);
            }, 5000);
        }
    }, [error]);

    return (
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="campo-form">
                        <label htmlFor="email">Email: </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Ingresa tu Email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        {formik.errors.email ? (
                            <div className="alerta alerta-error">
                                {formik.errors.email}
                            </div>
                        ) : null}
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password: </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Ingresa tu Password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        {formik.errors.password ? (
                            <div className="alerta alerta-error">
                                {formik.errors.password}
                            </div>
                        ) : null}
                    </div>
                    {error.found && (
                        <div style={{ color: "#c53030", textAlign: "center" }}>
                            {error.message}
                        </div>
                    )}

                    <div className="campo-form">
                        <button
                            type="submit"
                            className="btn btn-primario btn-block"
                        >
                            Iniciar Sesion
                        </button>
                    </div>
                </form>
                <Link to={"/nueva-cuenta"} className="enlace-cuenta">
                    {" "}
                    Obtener cuenta{" "}
                </Link>
            </div>
        </div>
    );
};

export default Login;
