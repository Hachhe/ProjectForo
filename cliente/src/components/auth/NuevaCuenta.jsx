import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
//import AlertaContext from '../../context/alertas/alertaContext';
//import AuthContext from '../../context/autenticacion/authContext';
import uuid from 'uuid/dist/v4'
import {useFormik} from  "formik"
import * as Yup from "yup";

const NuevaCuenta = ({ListandoUsuarios}) => {
    const formik = useFormik({
        initialValues:{
            nombre:"",
            apellido:"",
            email:"",
            numero:"",
            rol:"",
            password:"",
            confirmar:""
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required("El campo es obligatorio"),
            apellido: Yup.string().required("El campo es obligatorio"),
            email: Yup.string().email("Email incorrecto").required("El campo es obligatorio"),
            numero: Yup.string()
            .matches(/^[0-9]+$/, "El campo admite solo digitos")
            .min(11, 'Deben ser 11 caracteres')
            .max(11, 'No debe ser mayor a 11 caracteres'),
            rol: Yup.string().required("El campo es obligatorio"),
            password: Yup.string()
            .required("El campo es obligatorio")
            .oneOf([Yup.ref("confirmar")],"Las contraseñas no son iguales")
            .min(8, "Password muy corta - debe tener 8 caracteres mínimo."),
            confirmar: Yup.string().required("El campo es obligatorio")
        }),
        onSubmit: (e,{resetForm}) => {
            e.id = uuid();
            console.log(e);
            resetForm({e:''});
            ListandoUsuarios(e);
            console.log(ListandoUsuarios);
        },
    })

    return ( 
       <div className="form-usuario">
           <div className="contenedor-form sombra-dark">
               <h1>Registrarse</h1>
               <form
               onSubmit={formik.handleSubmit}
               >
                   <div className="campo-form">
               <label htmlFor="nombre">*Nombre: </label>
                   <input 
                       type="text"
                       name="nombre"
                       id="nombre"
                       placeholder="Ingresa tu Nombre"
                       onChange={formik.handleChange}
                       value={formik.values.nombre}
                   />
                {
                    formik.errors.nombre ? 
                    <div className="alert alert-danger error">{formik.errors.nombre}</div>
                    : null
                }
                </div>
                <div className="campo-form">
               <label htmlFor="apellido">*Apellido: </label>
                   <input 
                       type="text"
                       name="apellido"
                       id="apellido"
                       placeholder="Ingresa tu Apellido"
                       onChange={formik.handleChange}
                       value={formik.values.apellido}
                   />
                   {
                    formik.errors.apellido ? 
                    <div className="alert alert-danger error">{formik.errors.apellido}</div>
                    : null
                }
                </div>
                <div className="campo-form">
               <label htmlFor="email">*Email: </label>
                   <input 
                       type="text"
                       name="email"
                       id="email"
                       placeholder="Ingresa tu Email"
                       onChange={formik.handleChange}
                       value={formik.values.email}
                   />
                   {
                    formik.errors.email ? 
                    <div className="alert alert-danger error">{formik.errors.email}</div>
                    : null
                }
                </div>
                <div className="campo-form">
               <label htmlFor="numero">Numero Teléfonico: </label>
                   <input 
                       type="text"
                       name="numero"
                       id="numero"
                       placeholder="Ingresa número teléfonico"
                       onChange={formik.handleChange}
                       value={formik.values.numero}
                   />
                   {
                    formik.errors.numero ? 
                    <div className="alert alert-danger error">{formik.errors.numero}</div>
                    : null
                }
                </div>
                <div className="campo-form">
               <label htmlFor="rol">*Rol: </label>
               <select 
                id="rol" 
                name="rol"
                onChange={formik.handleChange}
                value={formik.values.rol}
                >
                    <option>...</option>
                    <option>Docente/Administración</option>
                    <option>Estudiante</option>
                    <option>Invitado</option>
                </select>
                   {
                    formik.errors.rol ? 
                    <div className="alert alert-danger error">{formik.errors.rol}</div>
                    : null
                }
                </div>
                   <div className="campo-form">
                        <label htmlFor="password">*Password: </label>
                            <input 
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Ingresa tu Password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                {
                    formik.errors.password ? 
                    <div className="alert alert-danger error">{formik.errors.password}</div>
                    : null
                }
                   </div>
                   <div className="campo-form">
                        <label htmlFor="confirmar">*Confirmar Password: </label>
                            <input 
                                type="password"
                                name="confirmar"
                                id="confirmar"
                                placeholder="Confirmar Password"
                                onChange={formik.handleChange}
                                value={formik.values.confirmar}
                            />
                {
                    formik.errors.confirmar ? 
                    <div className="alert alert-danger error">{formik.errors.confirmar}</div>
                    : null
                }
                   </div>

                   
                <br/>
                <strong>(*) Campos Requeridos</strong>  
                
                <div className="campo-form">
                    <input
                    type="submit"
                    className="btn btn-primario btn-block"
                    value="Registrarme"/>

                </div>
            </form>
                <Link to={'/'} className="enlace-cuenta"> Volver a inicio </Link>
           </div>
       </div>
     );
}
 
export default NuevaCuenta;