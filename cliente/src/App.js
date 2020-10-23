import React,{useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';
import ProyectoState from './context/proyectos/proyectoState';
import TareaState from './context/tareas/tareaState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';


function App() {
  let usuariosIniciales = JSON.parse(localStorage.getItem('usuarios'));
  if(!usuariosIniciales){
    usuariosIniciales = [];
  }

  //state de usuarios y validos
 const [usuarios, listarUsuarios]= useState(usuariosIniciales);

  const ListandoUsuarios = usuario => {
    listarUsuarios([
      ...usuarios,
      usuario
    ]);
  }
  //use effect

 useEffect(() => {
  let usuariosIniciales = JSON.parse(localStorage.getItem('usuarios'));
  if(usuariosIniciales){
     localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }else{
      localStorage.setItem('usuarios', JSON.stringify([]));
    }

}, [usuarios]);

  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path='/' 
                render={(props)=>(
                  <Login {...props} 
                  usuarios = {usuarios}
                  />
                )}/>
                <Route 
                exact path='/nueva-cuenta' 
                render={(props)=> (
                <NuevaCuenta {...props} ListandoUsuarios={ListandoUsuarios}/>)}  />
                <Route 
                exact path='/proyectos' 
                component={Proyectos}/>
              </Switch>
            </Router>
        </AuthState>
        </AlertaState>
        </TareaState>
    </ProyectoState>
  );
}

export default App;
