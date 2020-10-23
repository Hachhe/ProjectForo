import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useFormik} from  "formik"
import * as Yup from "yup";
import uuid from 'uuid/dist/v4';
const Login = ({usuarios}) => {

    const valid = true;

    const formik = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Email incorrecto").required("El campo es obligatorio"),
            password: Yup.string().required("El campo es obligatorio")
        }),
        onSubmit: (e,{resetForm}) => {
            e.id = uuid();
            console.log(e);
            resetForm({e:''});
            
            usuarios.map(usuario => 
               { if((usuario.email!==e.email) || (usuario.password!==e.password)){
                valid = false;
               } else{
                alert("correcto")
                valid = true;
               }    
            })}
    })
      
    return ( 
       <div className="form-usuario">
           <div className="contenedor-form sombra-dark">
               <h1>Iniciar Sesión</h1>
               <form
               onSubmit={formik.handleSubmit}
               >
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
                   {
                    formik.errors.email ? 
                    <div className="alerta alerta-error">{formik.errors.email}</div>
                    : null
                }
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
                {
                    formik.errors.password ? 
                    <div className="alerta alerta-error">{formik.errors.password}</div>
                    : null
                }
                   </div>
                    <Link to={'/proyectos'}>
                        <div className="campo-form">
                            <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesion"/>
                        </div>
                    </Link>
               
                
            </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta"> Obtener cuenta </Link>
  
           </div>
       </div>
     );
}
 
export default Login;