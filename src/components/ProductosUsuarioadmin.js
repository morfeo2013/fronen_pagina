import Axios from "axios"; /* PARA PODER HACER LAS PETICIONES GET,PUT,POS,DELETE EN EL BACKEND */

import React, {
  useEffect,
  useState,
} from "react"; /* PARA UTILIZAR LOS ESTADOS (useState) Y QUE SE EJECUTEN PRIMERO DETERMINADAS ACCIONES (useEffect) */

import { Link } from "react-router-dom"; /* IMPORTAR PARA PODER ACCEDER AL PA PROPIEDAD LINK Y ACCEDER
A LA PAGINA DONDE ESTA CREADO LA OPCION DE  CREAR USUARIOS EN EL RETUR DE CREACION DE PAGINAS */

/* SE CREA EL COMPONENTE ListarLibro() */
export default function ProductosUsuarioAdmin() {
  /* ESTADOS PARA GUARDAR LOS DATOS RECIBIDOS DEL BACKEND DE TODOS LOS  USARIOS */
  const [datos, setDatos] = useState(
    []
  ); /*  crea una arrays para guardar todos los objetos json que de descargaran de
    la base de datos */

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
  /* ESTADOS PARA BUSCAR USARIOS */

  const [search, setSearch] = useState(
    ""
  ); /* aca ira el estado de la palabra EN TEXTO en la busqueda le la pagina bajo la palabra search */

  const [buscar, setBuscar] = useState(
    []
  ); /* aca el arrays recojera el OBJETO json del estado datos */

  const [opcion, setOpcion] = useState(
    ""
  ); /* este estado realiza el contro del tipo de busqueda que se realizara */

  /* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
  /* ESTADO PARA ACCEDER A MODIFICAR-ELIMINAR O A COMPRAR */

  // eslint-disable-next-line no-unused-vars
  const [admin, setAdmin] = useState(false);

  const id = sessionStorage.getItem("id");

  const id2 = sessionStorage.getItem("admin");
  useEffect(() => {
    if (id === id2) {
      setAdmin(true);
    }
  }, [id, id2]);

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
  /*FUNCION PARA LISTAR USUARIOS */
  const obtenerUsuarios = async () => {
    /* se crea la validacion del tokend */

    const respuesta = await Axios.get(
      "http://localhost:4000/obtener/"
    ); /* usando axios se descarga con una peticion get la lista de  usuarios del backend */
    /* SE PASA LA INFORMACION AL ESTADO SETDATOS Y DATOS */
    setDatos(
      respuesta.data
    ); /* se envia la informacion al estado setdatos para ser almacenado en datos finalmente E NLA HUBICACION .DATA DEL OBJETO JSON RECIBIDO DE LBACKEND*/
    sessionStorage.setItem("contProductos", respuesta.data.length);
    console.log(respuesta.data.length);

    /* llevar al inicio del listado */

    /* console.log(respuesta) */
  };

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

  /*   USSEFECT
    ESTE ES PARA MOSTRAR LA LISTA DE LIBROS

    el useeffect es para iniciar automaticamente en determinada accion este caso 
        la funcion obtener listado de usarios */
  useEffect(() => {
    obtenerUsuarios(); /* ACTIVA PRIMERAMENTE LAFUNCION OBTENERUSUARIOS */
  }, []); /* es necesario dejar este  parametro vacio o sera un ciclo infito */

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

  /* LOSSEGUNDO QUE EVALUARA ES QUE HAY EN EL ESTADO OPCION QUE ES EL ENCARGADO DE RECIVIR EL TEXTO DE LA BUSQUEDA  */
  useEffect(() => {
    /* CREO UNA CONDICION QUE AL SER EVALUADO POR EL CHECKEND IGUALE EL ESTADO
        OPCIONS A UN TEXTO Y AL SER IGUAL EJECUTA LA OPCION DESEADA */

    /* SE PASAN LOS DATOS DE EL ESTADO DATOS A SETBUSCAR PARA TERMINAR LUEGO EN BUSCAR */
    if (opcion === "titulo")
      setBuscar(
        datos.filter((datos2) => {
          /* se pasan los valores del datos del backen al arrays setbuscar */
          return datos2.titulo.includes(
            search
          ); /* retorna los valores que contengan en la palabra search */
        })
      );
    else if (opcion === "autor")
      setBuscar(
        datos.filter((datos2) => {
          /* se pasan los valores del datos del backen al arrays setbuscar */
          return datos2.autor.includes(
            search
          ); /* retorna los valores que contengan en la palabra search */
        })
      );
    else if (opcion === "genero")
      setBuscar(
        datos.filter((datos2) => {
          /* se pasan los valores del datos del backen al arrays setbuscar */
          return datos2.genero.includes(
            search
          ); /* retorna los valores que contengan en la palabra search */
        })
      );
    /* CUANDO ESTE EL CAMPO VACIO AUTOMATICAMENTE SE HUBICA EN LA OPCION TITULO Y CON  defaultChecked={true} SE SELECCIONA DE INICIO EN EL CHECKED DE TITULO */ else if (
      opcion === ""
    )
      setBuscar(
        datos.filter((datos2) => {
          /* se pasan los valores del datos del backen al arrays setbuscar */
          return datos2.nombre.includes(
            search
          ); /* retorna los valores que contengan en la palabra search */
        })
      );
  }, [datos, search, opcion]);

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

  /* FUNCION ELIMINAR */

  /* para generar doble verificacion de eliminar */

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
  /* AGREGAR A MIS FAVORITOS */

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

  /* const g ="https://morfeo12345678.s3-sa-east-1.amazonaws.com/fotos+ganoderma/Screenshot_20201103_093714.jpg " */

  /* CRACION DE LA TABLA BASICA PARA IMPORTAR LOS LISTADOS DESDE EL BACKEND */

  return (
    <>
      <div className="text-center">
        <Link className="btn btn-info mr-2 " to="/EditarCrearProducto">
          <i className="far fa-address-book  m-1"></i>
          Agregar Producto Nuevo
        </Link>
      </div>

      <div className="container border border-success ">
        {/* AGREGAR PARA ADMINISTRADOR OPCION AGREGAR NUEVO PRODUCTO*/}

        <nav className="navbar ">
          <div className="container">
            <div className="col-md-6 ml-auto">
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
                  value="titulo"
                  onChange={(e) => setOpcion(e.target.value)}
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  Buscar por producto
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="genero"
                  onChange={(e) => setOpcion(e.target.value)}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Buscar por Codigo
                </label>
              </div>

              {/*  <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value='autor' onChange={e => setOpcion(e.target.value)} />
                            <label className="form-check-label" htmlFor="inlineRadio3">Buscar por valor </label>
                        </div> */}

              {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

              {/*ACA SE RENDERIZARA LA PALABRA EN TEXTO QUE SE ESTARA BUSCANDO */}
            </div>
            <div className="col-md-6 ml-auto">
              <input
                type="search"
                className="form-control mr-sm-2"
                placeholder="Buscar Producto por..."
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                required
              />
              {/* se le da valor al estado search  y  va a larer lo que  Y LOS ENVIARA AL ESTADO setSearch(e.target.value) QUE POSTERIOR MENTE LO ENVIARA AL ESTADO TEXTO "SEARCH"*/}
              {/* NOTA: EL .toLowerCase() ES PARA QUE TODA LA LETRA SEA CONVERTIDA A MINUSCULA PARA EVITR INCOPATIBILIDAD ENA LA BUSQUEDA */}
            </div>
          </div>
        </nav>
        {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

        <div className="row " id="card1">
          {" "}
          {/* para colocarlos en horizontal */}
          {buscar.map(productos => (
                    <div className="col-md-4 pt-2" key={productos._id}>

                        <div className="card text-center" id="card2">

                            <div className="card-header">
                                <strong>Producto: {productos.nombre}</strong>
                            </div>
                            <div className=" imagen3 ">
                                <img className="  img-thumbnail img-fluid  text-center" src={productos.imagen} width="20" height="20" alt=""></img>
                                {console.log(productos.imagen)}
                            </div>
                            <div className="card-body ">



                                <strong>codigo: {productos.precio}</strong>
                                <p></p>
                                <strong>Descripcion: {productos.descripcion}</strong>
                                <p></p>
                                <strong>Valor: {'$'}{productos.estrella}</strong>
                                <p></p>
                                <strong>Usuario: {productos.correo}</strong>

                            </div>
                            <td >


                                <Link className="btn btn-info mr-2" to='/registrar/' ><i className="far fa-address-book  m-1"></i>
    Registrate
 </Link>




                            </td>
                            



                        </div>
                    </div>

                ))}
        </div>
      </div>
    </>
  );
}
