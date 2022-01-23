import Axios from 'axios'/* PARA PODER HACER LAS PETICIONES GET,PUT,POS,DELETE EN EL BACKEND */

import React, { useEffect, useState } from 'react' /* PARA UTILIZAR LOS ESTADOS (useState) Y QUE SE EJECUTEN PRIMERO DETERMINADAS ACCIONES (useEffect) */



import { Link } from 'react-router-dom'  /* IMPORTAR PARA PODER ACCEDER AL PA PROPIEDAD LINK Y ACCEDER
A LA PAGINA DONDE ESTA CREADO LA OPCION DE  CREAR USUARIOS EN EL RETUR DE CREACION DE PAGINAS */




/* SE CREA EL COMPONENTE ListarLibro() */
export default function VistaProductosUsuario() {
    const [idd, setIdd] = useState("");
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [estrella, setEstrella] = useState("");
    const [correo, setCorreo] = useState("");
    const [imagen, setImagen] = useState("");



    /* ESTADOS PARA GUARDAR LOS DATOS RECIBIDOS DEL BACKEND DE TODOS LOS  USARIOS */
    const [datos, setDatos] = useState([]) /*  crea una arrays para guardar todos los objetos json que de descargaran de
    la base de datos */

    /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    /* ESTADOS PARA BUSCAR USARIOS */

    const [search, setSearch] = useState('') /* aca ira el estado de la palabra EN TEXTO en la busqueda le la pagina bajo la palabra search */


    const [buscar, setBuscar] = useState([])/* aca el arrays recojera el OBJETO json del estado datos */


    const [opcion, setOpcion] = useState('') /* este estado realiza el contro del tipo de busqueda que se realizara */


    /* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    /* ESTADO PARA ACCEDER A MODIFICAR-ELIMINAR O A COMPRAR */

    // eslint-disable-next-line no-unused-vars
    const [admin, setAdmin] = useState(false)
   
    const id = (sessionStorage.getItem('id'))

    const id2 = (sessionStorage.getItem('admin'))
    useEffect(() => {
        if ((id === id2)) { setAdmin(true) }

    }, [id, id2])
/* MOSTRAR DETALLES DEL PRODUCTO */
    const consultarusuarioUnico = async (id) => {

        const respuesta = await Axios.get(
          "http://localhost:4000/obtener/" + id
        ); /* se envia la instruccion al backen para que  consulte un usuarios especifico con el id */
        /*       console.log(respuesta) */
    
        /* DESPUES DE RECIBIR LA INFORMACION SE ACTUALIZA LOS ESTADOS */
        setIdd(respuesta.data._id);
        setNombre(respuesta.data.nombre);
        setDescripcion(respuesta.data.descripcion);
        setPrecio(respuesta.data.precio);
        setEstrella(respuesta.data.estrella);
        setCorreo(respuesta.data.correo);
        setImagen(respuesta.data.imagen);
      };

    /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    /*FUNCION PARA LISTAR USUARIOS */
    const obtenerUsuarios = async () => {

        /* se crea la validacion del tokend */



        const respuesta = await Axios.get('http://localhost:4000/obtener/') /* usando axios se descarga con una peticion get la lista de  usuarios del backend */
        /* SE PASA LA INFORMACION AL ESTADO SETDATOS Y DATOS */
        setDatos(respuesta.data)  /* se envia la informacion al estado setdatos para ser almacenado en datos finalmente E NLA HUBICACION .DATA DEL OBJETO JSON RECIBIDO DE LBACKEND*/
        sessionStorage.setItem('contProductos', ((respuesta.data).length))
        console.log(respuesta.data.length)

        /* llevar al inicio del listado */

        /* console.log(respuesta) */
    }


    /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */


    /*   USSEFECT
    ESTE ES PARA MOSTRAR LA LISTA DE productos

    el useeffect es para iniciar automaticamente en determinada accion este caso 
        la funcion obtener listado de usarios */
    useEffect(() => {
        obtenerUsuarios() /* ACTIVA PRIMERAMENTE LAFUNCION OBTENERUSUARIOS */
    }, []) /* es necesario dejar este  parametro vacio o sera un ciclo infito */



    /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

    /* LOSSEGUNDO QUE EVALUARA ES QUE HAY EN EL ESTADO OPCION QUE ES EL ENCARGADO DE RECIVIR EL TEXTO DE LA BUSQUEDA  */
    useEffect(() => {


        /* CREO UNA CONDICION QUE AL SER EVALUADO POR EL CHECKEND IGUALE EL ESTADO
        OPCIONS A UN TEXTO Y AL SER IGUAL EJECUTA LA OPCION DESEADA */

        /* SE PASAN LOS DATOS DE EL ESTADO DATOS A SETBUSCAR PARA TERMINAR LUEGO EN BUSCAR */
        if (opcion === 'nombre')
            setBuscar(datos.filter(datos2 => {

                /* se pasan los valores del datos del backen al arrays setbuscar */
                return datos2.titulo.includes(search) /* retorna los valores que contengan en la palabra search */
            }))

        else if (opcion === 'descripcion')
            setBuscar(datos.filter(datos2 => {

                /* se pasan los valores del datos del backen al arrays setbuscar */
                return datos2.autor.includes(search) /* retorna los valores que contengan en la palabra search */
            }))
        else if (opcion === 'precio')
            setBuscar(datos.filter(datos2 => {

                /* se pasan los valores del datos del backen al arrays setbuscar */
                return datos2.precio.includes(search) /* retorna los valores que contengan en la palabra search */
            }))


        /* CUANDO ESTE EL CAMPO VACIO AUTOMATICAMENTE SE HUBICA EN LA OPCION TITULO Y CON  defaultChecked={true} SE SELECCIONA DE INICIO EN EL CHECKED DE TITULO */
        else if (opcion === '')


            setBuscar(datos.filter(datos2 => {

                /* se pasan los valores del datos del backen al arrays setbuscar */
                return datos2.nombre.includes(search) /* retorna los valores que contengan en la palabra search */
            }))
    }, [datos, search, opcion])







    













    /* CRACION DE LA TABLA BASICA PARA IMPORTAR LOS LISTADOS DESDE EL BACKEND */


    return (
        <div className="container border border-success ">
            {/* AGREGAR PARA ADMINISTRADOR OPCION AGREGAR NUEVO PRODUCTO*/}




            <nav className="navbar "  >

                <div className="container">

                    <div className="col-md-6 ml-auto">

                        {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}


                        {/* ESTE CODIGO ES PARA RECOGER LA INFORMACION A ELEGIR DE QUE TIPO DE BUSQUEDA SE REALIZARA  
                   AL SER ELEGISO LO GUARDARA CON EL PARAMETRO "VALUE" Y AL LLEVARA AL ESTADO:
                   setOpcion(e.target.value) PARA LUEGO ACTUALIZAR EL ESTADO OPCION*/}
                        {/*  {if (opcion ==='')checked} */}

                        <div className="form-check form-check-inline"  >
                            <input className="form-check-input" type="radio" defaultChecked={true}
                                /*  defaultChecked={true}  para seleccionar de inicio una de las opcionees */
                                name="inlineRadioOptions" id="inlineRadio1" value='titulo' onChange={e => setOpcion(e.target.value)}

                            />
                            <label className="form-check-label" htmlFor="inlineRadio1">Buscar por producto</label>
                        </div>


                        




                      
                        {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

                        {/*ACA SE RENDERIZARA LA PALABRA EN TEXTO QUE SE ESTARA BUSCANDO */}
                    </div>
                    <div className="col-md-6 ml-auto">
                        <input type="search" className="form-control mr-sm-2" placeholder="Buscar Producto por..." onChange={
                            (e) => setSearch(e.target.value.toLowerCase())} required />
                        {/* se le da valor al estado search  y  va a larer lo que  Y LOS ENVIARA AL ESTADO setSearch(e.target.value) QUE POSTERIOR MENTE LO ENVIARA AL ESTADO TEXTO "SEARCH"*/}
                        {/* NOTA: EL .toLowerCase() ES PARA QUE TODA LA LETRA SEA CONVERTIDA A MINUSCULA PARA EVITR INCOPATIBILIDAD ENA LA BUSQUEDA */}
                    </div>
                </div>

            </nav>
            {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}





            <div className="row " id="card1"> {/* para colocarlos en horizontal */}

            {buscar.map(productos => (
                    <div className="col-md-4 pt-2" key={productos._id}>

                        <div className="card text-center " id="card2">

                            <div className="card-header ">
                                <strong>Nombre: {productos.nombre}</strong>
                            </div>
                            <div className=" imagen3 ">
                                <img className="  img-thumbnail img-fluid  text-center" src={productos.imagen} width="20" height="20" alt=""></img>
                                {console.log(productos.imagen)}
                            </div>
                            <div className="card-body ">



                               
                                <p></p>
                                <strong>Puntuacion: {productos.estrella}</strong>
                                <p></p>
                                <strong>Valor: {'$'}{productos.precio}</strong>
                                <p></p>
                                <strong>Contacto: {' '}{productos.correo}</strong>

                            </div>

                         
                            <button
                          onClick={async(e) =>await consultarusuarioUnico(productos._id)

                            
                        }
                      
                          type="button"
                          className="btn btn-outline-success mb-2"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          <i className="far fa-address-book  m-1"></i>
                          Mas Detalles
                        </button>
                            
                        <div
                          className="modal fade"
                          id="exampleModal"
                          tabindex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >

                          {/* MODAL +++++++++++++++++++++++++++++++++++++++++++++++++++ */}
                          <div className="modal-dialog d-none-modal-md modal-lg">
                            <div className="modal-content modal0">
                              <div className="modal-header ">

                                <h5 className="modal-title " id="exampleModalLabel">


                                  Contacto: {correo}
                                </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body ">

                                <div className="col-12 modal1">
                                  <img className=" d-block w-100" src="https://res.cloudinary.com/dhiasghho/image/upload/v1628963364/frutas_logo_catalogo_alargado_cowasl.png" alt="" />
                                  <div className="row  ">

                                    <div className="col-xs-12 col-lg-6 imagen33">
                                      <img id="" src={imagen} alt="" />

                                      <div >
                                        <h2 className="text-center  mt-2">
                                          Precio: ${precio}
                                        </h2>
                                    
                                      </div>
                                    </div>

                                    <div className=" col-xs-12 col-lg-6 ">
                                      <div className="satisfy_id">
                                        <h3 className=" text-center display-3">
                                          {/* Producto: */} {nombre}
                                        </h3>
                                      </div>
                                      <h6 className="text-center  mt-2">
                                          Puntuacion: {estrella}
                                        </h6>
                                      <hr />
                                      <div className="" >
                                        <h5 className="text-start display-linebreak">
                                          {/*  Descripcion:  */}{descripcion}

                                        </h5>
                                      </div>
                                     
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="modal-footer ">
                                <div className="container text-center">
                                  <a
                                    type="button"
                                    className="btn btn-danger "
                                    data-bs-dismiss="modal"
                                  >
                                    Cerrar 
                                  </a>
                               

                                </div>
                              </div>
                            </div>
                          </div>
                        </div>


                        </div>
                    </div>
                    

                ))}
            </div>


        </div>

    )
}
