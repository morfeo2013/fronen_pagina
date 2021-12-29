import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootswatch/dist/slate/bootstrap.min.css'
import Nav from "./components/nav"
import Loging from "./components/loging"
import Registrar from "./components/Registrar";
function App() {
  return (
   
    <>
    <Router>
    
    <Route path="/inicio" component={Loging}/>
 <Nav/>

 
 </Router>
    </>
  )
}

export default App;
