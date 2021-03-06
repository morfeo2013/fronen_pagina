import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
  /* controlar menu admin o usuario */
  const [menu, setMenu] = useState(false);
  const [admin, setAdmin] = useState(false);
  const id = sessionStorage.getItem("nombre");
  const id2 = sessionStorage.getItem("admin");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (id === id2) {
      setAdmin(true);
    }
  }, [id, id2]);
  
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setMenu(true);
    }
  }, []);

  /* Salir dee sesion */
  const salir = () => {
    sessionStorage.clear();
    setMenu(false);
  };

  return (
    <div>
      {menu ? (
        <div>
          {admin ? (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">
                  ADMINISTRADOR:{" "} {sessionStorage.getItem("nombre")}
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNavDropdown"
                  aria-controls="navbarNavDropdown"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarNavDropdown"
                >
                  <ul className="navbar-nav">
                  <li className="nav-item col-md-6 col-lg-3 col-xl-5">
                        <Link
                          className="nav-link"
                          to="/visualAdmin"
                         
                        >
                           ADMNISTRAR PRODUCTOS
                        </Link>
                      </li>
                      <li className="nav-item col-md-6 col-lg-3 col-xl-5">
                    <Link
                          className="nav-link"
                          to="/AdminUsuario"
                          
                        >
                          ADMNISTRAR USUARIO
                        </Link>
                        </li>
                    <ul>
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
                  </ul>
                </div>
              </div>
            </nav>
          ) : (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">
                  USUARIO:{" "} {sessionStorage.getItem("nombre")}
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNavDropdown"
                  aria-controls="navbarNavDropdown"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarNavDropdown"
                >

                  
                  <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/VistaProductosUsuario"
                      
                    >
                      PRODUCTOS
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/ProductosUsuarioAdmin"
                    
                    >
                     ADMINISTRAR PRODUCTOS
                    </Link>
                  </li>
                    <ul>
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
                  </ul>
                </div>
              </div>
            </nav>
          )}
        </div>
      ) : (
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                INGRESO
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={() => salir()}>
                      LOGIN
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/registrar"
                      onClick={() => salir()}
                    >
                      REGISTRO
                    </Link>
                  </li>

                 
                </ul>
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Nav;
