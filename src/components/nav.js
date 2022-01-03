import React,{ useEffect,useState } from 'react'
import { Link } from "react-router-dom"







function Nav() {

/* controlar menu admin o usuario */
const [menu, setMenu] = useState(false);
const id = sessionStorage.getItem("nombre");
const id2 = sessionStorage.getItem("admin");
useEffect(() => {
  if (id === id2) {
    setMenu(true);
  }
}, [id, id2]);

/* Salir dee sesion */
const salir = () => {
  sessionStorage.clear();
  
};





    return (


        <div>
        


         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Features</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Pricing</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown link
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a className="dropdown-item" href="#">Action</a></li>
            
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li className="nav-item col-md-6 col-lg-3 col-xl-5">
        <Link
                      
                      className="nav-link"
                      to="/"
                      onClick={() => salir()}
                    >
                      Salir
                    </Link>
                    </li>
      </ul>
      
    </div>
  </div>
</nav> 
        </div>
    )
}


export default Nav

