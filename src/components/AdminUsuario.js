import Axios from "axios"; /* PARA PODER HACER LAS PETICIONES GET,PUT,POS,DELETE EN EL BACKEND */

import React, {
  useEffect,
  useState,
} from "react"; /* PARA UTILIZAR LOS ESTADOS (useState) Y QUE SE EJECUTEN PRIMERO DETERMINADAS ACCIONES (useEffect) */

import Swal from "sweetalert2"; /* EL EFECTO IMPORTADO DE ANIMACION */
import { BrowserRouter as Redirect } from "react-router-dom"; /* SE CREA EL COMPONENTE Listar() */ /* IMPORTAR PARA PODER ACCEDER AL PA PROPIEDAD LINK Y ACCEDER
A LA PAGINA DONDE ESTA CREADO LA OPCION DE  CREAR USUARIOS EN EL RETUR DE CREACION DE PAGINAS */
/* import { Link } from 'react-router-dom'  */ export default function AdminUsuario() {
  /* ESTADOS PARA GUARDAR LOS DATOS RECIBIDOS DEL BACKEND DE TODOS LOS  USARIOS */
  const [datos, setDatos] = useState(
    []
  ); /*  crea una arrays para guardar todos los objetos json que de descargaran de
    la base de datos */

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
  /* ESTADOS PARA BUSCAR USARIOS */

  const [search2, setSearch2] = useState(
    ""
  ); /* aca ira el estado de la palabra EN TEXTO en la busqueda le la pagina bajo la palabra search2 */

  const [buscar, setBuscar] = useState(
    []
  ); /* aca el arrays recojera el OBJETO json del estado datos */

  const [opcion, setOpcion] = useState(
    ""
  ); /* este estado realiza el contro del tipo de busqueda que se realizara */

  /* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
  /* ESTADO PARA ACCEDER A MODIFICAR-ELIMINAR O A COMPRAR */

  const [admin, setAdmin] = useState(false);

  const id = sessionStorage.getItem("nombre");
  const id2 = sessionStorage.getItem("admin");
  const correoBase = sessionStorage.getItem("correo");
  useEffect(() => {
    if (id === id2) {
      setAdmin(true);
    }
  }, [id, id2]);

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
  /*FUNCION PARA LISTAR USUARIOS */
  const obtenerUsuarios = async () => {
    if (id === id2) {
      /* se crea la validacion del tokend */
      const token = sessionStorage.getItem("token");

      const respuesta = await Axios.get(
        "http://localhost:4000/listarUsuarios/",
        { headers: { autorizacion: "bearer " + token } }
      ); /* usando axios se descarga con una peticion get la lista de  usuarios del backend */
      /* SE PASA LA INFORMACION AL ESTADO SETDATOS Y DATOS */
      setDatos(
        respuesta.data
      ); /* se envia la informacion al estado setdatos para ser almacenado en datos finalmente E NLA HUBICACION .DATA DEL OBJETO JSON RECIBIDO DE LBACKEND*/
      console.log(respuesta.data);

      /* llevar al inicio del listado */

      console.log(respuesta);
    }
  };

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

  /*   USSEFECT
    ESTE ES PARA MOSTRAR LA LISTA DE LIBROS

    el useeffect es para iniciar automaticamente en determinada accion este caso 
        la funcion obtener listado de usarios */
  useEffect(() => {
    obtenerUsuarios(); /* ACTIVA PRIMERAMENTE LAFUNCION OBTENERUSUARIOS */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); /* es necesario dejar este  parametro vacio o sera un ciclo infito */

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

  const modificarUsuario = async (index, nom) => {
    const id = index;
    const admin = nom;

    /* deve decir 'image' el archivo */

    const respuesta = await Axios.put(
      "http://localhost:4000/modificar/" + id + "/" + admin
    );
    console.log(respuesta);
    const mensaje =
      respuesta.data
        .mensaje; /* llama desde la constante respuesta el mensage guardado en baken */
    Swal.fire({
      icon: "success",
      title: mensaje,
      showConfirmButton: false,
    });
    setTimeout(() => {
      if (id === id2) {
        window.location.href =
          "/visualAdmin/"; /* para redirigir ala pagina listar */
      } else {
        window.location.href =
          "/VistaProductosUsuario"; /* para redirigir ala pagina listar */
      }
    }, 1300);
  };

  /* LOSSEGUNDO QUE EVALUARA ES QUE HAY EN EL ESTADO OPCION QUE ES EL ENCARGADO DE RECIVIR EL TEXTO DE LA BUSQUEDA  */
  useEffect(() => {
    /* CREO UNA CONDICION QUE AL SER EVALUADO POR EL CHECKEND IGUALE EL ESTADO
        OPCIONS A UN TEXTO Y AL SER IGUAL EJECUTA LA OPCION DESEADA */

    /* SE PASAN LOS DATOS DE EL ESTADO DATOS A SETBUSCAR PARA TERMINAR LUEGO EN BUSCAR */

    if (opcion === "") {
      setBuscar(
        datos.filter((datos2) => {
          /* se pasan los valores del datos del backen al arrays setbuscar */
          return datos2.nombre.includes(
            search2
          ); /* retorna los valores que contengan en la palabra search2 */
        })
      );
    } else if (opcion === "cedula") {
      setBuscar(
        datos.filter((datos2) => {
          /* se pasan los valores del datos del backen al arrays setbuscar */
          return datos2.cedula.includes(
            search2
          ); /* retorna los valores que contengan en la palabra search2 */
        })
      );
    } else if (opcion === "ciudad") {
      setBuscar(
        datos.filter((datos2) => {
          /* se pasan los valores del datos del backen al arrays setbuscar */
          return datos2.ciudad.includes(
            search2
          ); /* retorna los valores que contengan en la palabra search2 */
        })
      );
    } else if (opcion === "nombre") {
      setBuscar(
        datos.filter((datos2) => {
          /* se pasan los valores del datos del backen al arrays setbuscar */
          return datos2.nombre.includes(
            search2
          ); /* retorna los valores que contengan en la palabra search2 */
        })
      );
    }
  }, [datos, opcion, search2]);

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

  /* FUNCION ELIMINAR */

  const eliminar = (id) => {
    Swal.fire({
      title: "Eliminar Documento",
      text: "Esta seguro de Eliminar la Informacion?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar documento",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarSub(id);
      }
    });
  };

  const eliminarSub = async (id) => {
    const respuesta = await Axios.delete(
      "http://localhost:4000/eliminarUsuario/" + id
    ); /* cuando reciba l informacion entra tambien el id de el elemento a eliminar */

    obtenerUsuarios(); /* se llama para vuela inmediatamente a la lista inicial */
    const mensaje = respuesta.data.mensaje;
    /*   console.log(respuesta) */

    Swal.fire({
      icon: "success",
      title: "Eliminando",
      text: mensaje,
      showConfirmButton: false,
      timer: 1500,
    });
    /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
  }; /* CRACION DE LA TABLA BASICA PARA IMPORTAR LOS LISTADOS DESDE EL BACKEND */

  return (
    <div className="container fluid">
      {/* CREO LA BARRA DE BUSQUEDA */}

      <nav className="navbar ">
        <div>
          <div className="col ">
            {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

            {/* ESTE CODIGO ES PARA RECOGER LA INFORMACION A ELEGIR DE QUE TIPO DE BUSQUEDA SE REALIZARA  
                   AL SER ELEGISO LO GUARDARA CON EL PARAMETRO "VALUE" Y AL LLEVARA AL ESTADO:
                   setOpcion(e.target.value) PARA LUEGO ACTUALIZAR EL ESTADO OPCION*/}
            {/*  {if (opcion ==='')checked} */}

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                defaultChecked={true}
                /*  defaultChecked={true}  para seleccionar de inicio una de las opcionees */
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="nombre"
                onChange={(e) => setOpcion(e.target.value)}
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Buscar por nombre
              </label>
            </div>

            {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

            {/*ACA SE RENDERIZARA LA PALABRA EN TEXTO QUE SE ESTARA BUSCANDO */}
          </div>
        </div>
        <div className="container col-auto">
          <input
            type="search2"
            className="form-control mr-sm-2"
            placeholder="Buscar Usuario por..."
            onChange={(e) => setSearch2(e.target.value)}
            required
          />
          {/* se le da valor al estado search2  y  va a larer lo que  Y LOS ENVIARA AL ESTADO setSearch2(e.target.value) QUE POSTERIOR MENTE LO ENVIARA AL ESTADO TEXTO "SEARCH2"*/}
          {/* NOTA: EL .toLowerCase() ES PARA QUE TODA LA LETRA SEA CONVERTIDA A MINUSCULA PARA EVITR INCOPATIBILIDAD ENA LA BUSQUEDA */}
        </div>
        {/*   <div>
                    <ReactHTMLTableToExcel
                                id="test-table-xls-button"
                                className="btn btn-primary"
                                table="tabla General usuarios"
                                filename="Tabla de Usuarios"
                                sheet="tabla de Usuarios"
                                buttonText="Descargar a Exel" />
                    </div> */}
      </nav>
      {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

      {/* CREO LA TABLA */}
      <table
        className="table table-success table-striped"
        id="tabla General usuarios"
      >
        <thead>
          <tr>
            {/* ACA VA EL ENCABEZADO DE LA LISTA */}
            <th scope="col">#</th>
            <th scope="col">Nombre</th>

            <th scope="col">Correo</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>

        {/* ACA VA EL LISTADO DESCARGADO  */}

        {/* UTILIZO LOS DATOS DEL ESTADO QUE RECIVIO DEL SETDATOS */
        buscar.map((
          clientes,
          i /* LIBROS RECIVIRA LOS LA INFORMACION DE DATOS RECIVIDO DE SETDATOS*/
        ) => (
          <tbody key={clientes._id}>
            {/* NECESARIO CREAR UN KEY  le asigno el _id que viene por defecto del mongodb como entrada*/}
            <tr>
              <td>{i + 1}</td>

              <td>{clientes.nombre}</td>

              <td>{clientes.correo}</td>

              <td>
                  {/* si eres el administrador principal */}
                {correoBase === clientes.correo ? (
                  <div>
                    <button className="btn btn-warning mr-2" disabled>
                      {" "}
                      <i className="fas fa-star"></i>{" "+id}
                    </button>
                    
                  </div>
                ) : 
                
                /* solo los usuarios  */
                (<> { clientes.admin==="" ? (<div>
                        <button
                          className="btn btn-success mr-2"
                          onClick={() =>
                            modificarUsuario(clientes._id, clientes.nombre)
                          }
                        >
                          {" "}
                          <i className="fas fa-edit"></i>
                         
                        </button>
    
                        <button
                          className="btn btn-danger mr-2"
                          onClick={() => eliminar(clientes._id)}
                        >
                          <i className="far fa-trash-alt"> </i>{" "}
                         
                        </button>
                      </div>)
                      :
                      /* los demas administradores aparte de ti*/
                      (
                         
                        <div>
                        <button className="btn btn-warning mr-2" disabled>
                          {" "}
                          <i className="fas fa-star"></i>
                        </button>
                        <button
                          className="btn btn-danger mr-2"
                          onClick={() => eliminar(clientes._id)}
                        >
                          <i className="far fa-trash-alt"> </i>{" "}
                          {/* agregar el onClick para ejecutaar la funcion eliminar APROVECHA Y SACA EL ._ID Y LO ENVIA A LA FUNCION ELIMINAR(_ID)*/}
                        </button>
                      </div>)}</>

                   
                  
                )}
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
