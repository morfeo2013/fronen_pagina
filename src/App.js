import React from "react";
import { BrowserRouter as Router,Redirect, Route } from 'react-router-dom';
import 'bootswatch/dist/slate/bootstrap.min.css'
import Nav from "./components/Nav"
import Loging from "./components/Loging";
import Registrar from "./components/Registrar";
import VistaProductosUsuario from "./components/VistaProductosUsuario";
import VistaProductosAdmin from "./components/VistaProductosAdmin";
import AdminUsuario from "./components/AdminUsuario";
import EditarCrearProducto from "./components/EditarCrearProducto"
import ProductosUsuarioAdmin from "./components/ProductosUsuarioadmin"


/* ESTO PARA DARLE MAS SEGURIDAD ALA ENTRADA DEL USUARIO Y NO PERMITIR EL ACCESO A LOS COMPONENTES */

const validar=()=>{
  if(sessionStorage.getItem('token')){  return true}
  else{return false}
  
  
  }
  const MyRoute=(props)=>{
 
    return validar()?<Route {...props}/>
  
    :
    
    <Redirect to='/'/>
    
  }

/* las props son para recivir todo lo que venga desde las rutas */


function App() {
 
  return (
  

   <Router>
     
    
    
  <Nav/> 

 <Route exact path='/' component={Loging}/>
 <Route exact path='/registrar' component={Registrar}/>
 <MyRoute exact path='/VistaProductosUsuario' component={VistaProductosUsuario}/>
 <MyRoute exact path='/visualAdmin' component={VistaProductosAdmin}/>
 <MyRoute exact path='/AdminUsuario' component={AdminUsuario}/>
 <MyRoute exact path='/EditarCrearProducto' component={EditarCrearProducto}/>

 <MyRoute exact path='/ProductosUsuarioAdmin' component={ProductosUsuarioAdmin}/>

 <MyRoute path="/editar/:id" component={EditarCrearProducto} />

 
 </Router>


  
   
    
  );
}

export default App;
