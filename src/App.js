import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootswatch/dist/slate/bootstrap.min.css'
import Nav from "./components/Nav"
import Loging from "./components/Loging";
import Registrar from "./components/Registrar";
import VistaProductosUsuario from "./components/VistaProductosUsuario";
import VistaProductosAdmin from "./components/VistaProductosAdmin";
import AdminUsuario from "./components/AdminUsuario";

function App() {
  return (
  

   <Router>
     
    
    
  <Nav/> 

 <Route exact path='/' component={Loging}/>
 <Route exact path='/registrar' component={Registrar}/>
 <Route exact path='/VistaProductosUsuario' component={VistaProductosUsuario}/>
 <Route exact path='/visualAdmin' component={VistaProductosAdmin}/>
 <Route exact path='/AdminUsuario' component={AdminUsuario}/>

 

 
 </Router>


  
   
    
  );
}

export default App;
