import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootswatch/dist/slate/bootstrap.min.css'
import Nav from "./components/Nav"
import Loging from "./components/Loging";
import Registrar from "./components/Registrar";

function App() {
  return (
  

   <Router>
     
    
    
  <Nav/> 

 <Route exact path='/' component={Loging}/>
 <Route exact path='/registrar' component={Registrar}/>

 
 </Router>


  
   
    
  );
}

export default App;
