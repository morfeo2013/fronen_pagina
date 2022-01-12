import Axios from 'axios'/* PARA PODER HACER LAS PETICIONES GET,PUT,POS,DELETE EN EL BACKEND */

import React, { useEffect, useState } from 'react' /* PARA UTILIZAR LOS ESTADOS (useState) Y QUE SE EJECUTEN PRIMERO DETERMINADAS ACCIONES (useEffect) */

import Swal from 'sweetalert2'/* EL EFECTO IMPORTADO DE ANIMACION */

import { Link } from 'react-router-dom'  /* IMPORTAR PARA PODER ACCEDER AL PA PROPIEDAD LINK Y ACCEDER
A LA PAGINA DONDE ESTA CREADO LA OPCION DE  CREAR USUARIOS EN EL RETUR DE CREACION DE PAGINAS */




/* SE CREA EL COMPONENTE ListarLibro() */
export default function ProductosUsuarioadmin() {

    const correoBase = sessionStorage.getItem("correo");



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

    const [admin, setAdmin] = useState(false)

    const id = (sessionStorage.getItem('id'))

    const id2 = (sessionStorage.getItem('admin'))
    useEffect(() => {
        if ((id === id2)) { setAdmin(true) }

    }, [id, id2])



    /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    /*FUNCION PARA LISTAR USUARIOS */
    const obtenerUsuarios = async () => {

        /* se crea la validacion del tokend */
        const token = sessionStorage.getItem('token')


        const respuesta = await Axios.get('http://localhost:4000/obtener/', { headers: { 'autorizacion': 'bearer ' + token } }) /* usando axios se descarga con una peticion get la lista de  usuarios del backend */
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

    /* LOSSEGUNDO QUE EVALUARA ES QUE HAY EN EL ESTADO OPCION QUE ES EL ENCARGADO DE RECIVIR EL objeto DE LA BUSQUEDA  */
    useEffect(() => {
  
        /* SE PASAN LOS DATOS DE EL ESTADO DATOS A SETBUSCAR PARA TERMINAR LUEGO EN BUSCAR */
        setBuscar(
        
          datos.filter((datos2) => {
            /* se pasan los valores del datos del backen al arrays setbuscar */
            return datos2.correo.includes(
              correoBase
            ); /* retorna los valores que contengan en la palabra correo  */
          })
        );
      }, [datos]);





    /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

    /* FUNCION ELIMINAR */
    const eliminar = (id) => {

        Swal.fire({
            title: 'Eliminar Documento',
            text: "Esta seguro de Eliminar la Informacion?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar documento'

        }).then((result) => {
            if (result.isConfirmed) {

                eliminarSub(id)


            }
        })


    }
    /* para generar doble verificacion de eliminar */

    const eliminarSub = async (id) => {

        const respuesta = await Axios.delete('http://localhost:4000/eliminar/' + id) /* cuando reciba l informacion entra tambien el id de el elemento a eliminar */
        obtenerUsuarios()  /* se llama para vuela inmediatamente a la lista inicial */
        const mensaje = respuesta.data.mensaje
        /*   console.log(respuesta) */


        Swal.fire({

            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        })
    }
    /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    /* AGREGAR A MIS FAVORITOS */


    const Favoritos = async (id2) => {


        const favorito = await {
            user2: id2
        }
        const respuesta = await Axios.put('http://localhost:4000/agregarfavorito/' + id, favorito) /* cuando reciba l informacion entra tambien el id de el elemento a eliminar */


        const mensaje = respuesta.data.mensaje
        /*   console.log(respuesta) */



        Swal.fire({

            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        })

        const respuesta2 = await Axios.get('http://localhost:4000/favoritos/' + id)

        sessionStorage.setItem('contadorFavoritos', ((respuesta2.data.user2).length))/* conocer el valos de cuantos datos tiene un arrays en la tabla en el mongo db */


    }
    /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

















    /* CRACION DE LA TABLA BASICA PARA IMPORTAR LOS LISTADOS DESDE EL BACKEND */


    return (
         <>
          <div className="text-center">
        <Link className="btn btn-info mr-2 " to="/EditarCrearProducto">
          <i className="far fa-address-book  m-1"></i>
          Agregar Producto Nuevo
        </Link>
      </div>
      <div className="container border border-secondary">
            {/* AGREGAR PARA ADMINISTRADOR OPCION AGREGAR NUEVO PRODUCTO*/}
            {(admin) ?
                <div className="row">
                    <div className="card-body ">
                        <div className="col-sm-12 text-center">

                            <Link className="btn btn-info mr-2" to={'/ingresar/'}> <i class="fas fa-plus"></i>
                     Agregar Nuevo Producto
                                  </Link>
                        </div>
                    </div>
                </div>
                :


                null

            }



           
            {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}


            {/* CREO LA TABLA */}
            <table className="table table-success table-striped">


                <thead>
                    <tr >
                        {/* ACA VA EL ENCABEZADO DE LA LISTA */}
                        <th scope="col">#</th>
                        <th scope="col">Imagen</th>
                        <th scope="col">Producto</th>
                        <th scope="col">Usuario</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Opciones</th>
                    </tr>
                </thead>



                {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

                {/* ACA VA EL LISTADO DESCARGADO  */}

                {
                    /* UTILIZO LOS DATOS DEL ESTADO QUE RECIVIO DEL SETDATOS */
                    buscar.map((productos, i) => (  /* productos RECIVIRA LOS LA INFORMACION DE DATOS RECIVIDO DE SETDATOS*/

                        <tbody key={productos._id}>{/* NECESARIO CREAR UN KEY  le asigno el _id que viene por defecto del mongodb como entrada*/}
                            <tr>
                                <td >{i + 1}</td>
                                {/* agregar la imagen desde el link */}
                                <div className=" imagen4 ">
                                    <img className="  img-thumbnail img-fluid  text-center" src={productos.imagen} width="20" height="20" alt=""></img>
                                    {console.log(productos.imagen)}
                                </div>
                                <td>{productos.nombre}</td>
                           
                               
                                <td>{productos.correo}</td>
                                <td>{'$'}{productos.precio}</td>

                                {admin ?
                                   null
                                    :
                                    <td >


                                        <Link className="btn btn-info mr-2" to={'/editar/' + productos._id}><i class="fas fa-sync-alt"></i>
                                            Actualizar
                                         </Link>



                                        <button className="btn btn-danger mr-2" onClick={() => eliminar(productos._id)}> <i className="far fa-trash-alt"></i>{/* agregar el onClick para ejecutaar la funcion eliminar APROVECHA Y SACA EL ._ID Y LO ENVIA A LA FUNCION ELIMINAR(_ID)*/}

                                             Eliminar




                                         </button>
                                    </td>


                                }


                            </tr>

                        </tbody>

                    ))

                }




            </table>
        </div>
         
         </>
      
       

    )
}
