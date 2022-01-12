import Axios from "axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function EditarCrearProducto(props) {
  /* aca el props es para identificar la ruta   que se ingreso  e identificar si es para editar o crear */

  /* crear los esatados del backen */
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [estrella, setEstrella] = useState("");
  const [correo, setCorreo] = useState("");
  const [imagen, setImagen] = useState("");
  const [unidades, setUnidades] = useState("");

  /* COMANDOS PARA GENERAR LA VALIDACION DE PA PAGINA CREAR O MODIFICAR */

  /* PARA UTILIZAR EL MISMO DISEÑO PARA VARIAS ORDENES CREAR MODIFICAR DE ALA WEB */
  /* CREAR EL ESTADO BOOLEANO */
  const [editar, setEditar] = useState("");

  /* CREAR UNA CONDICION IF ELS PARA HACCER LOS CAMBIOS POR MEDIO DEL USSEFECT */
  /* utilizando los props con el parametro props.match.path devuelve esto '/comprar/:id'
    con esto lo uso para identificar que opcion mostrara*/
  useEffect(() => {
    if (props.match.path === "/comprar/:id") {
      /* verifica que el props recivido tenga un id ingresado */
      setEditar("comprar");

      const id = props.match.params.id; /* saco el i d */
      consultarusuarioUnico(id);
      console.log(props.match.path);
      console.log(editar);
    } else if (props.match.path === "/editar/:id") {
      setEditar("modificar");

      const id = props.match.params.id; /* saco el i d */
      consultarusuarioUnico(id);
      console.log(props.match.path);
      console.log(editar);
    }
  }, []);

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
  /*     ACCION PARA ACTIVAR FUNCION MODIFICAR O GARDAR */

  const accion = async (e) => {
    e.preventDefault(); /* para prevenir que la pagina se refresque */
    if (editar === "modificar") {
      modificarLibro();
      console.log("esta en la accion modificar");
    } else if (editar === "comprar") {
      console.log("esta en la accion comprar");
    } else {
      guardarLibro();
    }
  };

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
  /* CONSULATAR USUARIO UNICO */

  const consultarusuarioUnico = async (id) => {
    const respuesta = await Axios.get(
      "http://localhost:4000/obtener/" + id
    ); /* se envia la instruccion al backen para que  consulte un usuarios especifico con el id */
    /*       console.log(respuesta) */

    /* DESPUES DE RECIBIR LA INFORMACION SE ACTUALIZA LOS ESTADOS */

    setNombre(respuesta.data.nombre);
    setDescripcion(respuesta.data.descripcion);
    setPrecio(respuesta.data.precio);
    setEstrella(respuesta.data.estrella);
    setCorreo(respuesta.data.correo);
    setImagen(respuesta.data.imagen);

    console.log(imagen);
  };
  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

  /* MODIFICACION DE CLIENTE UNICO DESPUES DE CONSULTAR LA FUNCION CLIENTE UNICO */

  const modificarLibro = async () => {
    const id = props.match.params.id;
    const formdata = new FormData();
    formdata.append("nombre", nombre);
    formdata.append("descripcion", descripcion);
    formdata.append("precio", precio);
    formdata.append("estrella", estrella);
    formdata.append("correo", correo);
    formdata.append("image", imagen); /* deve decir 'image' el archivo */

    const respuesta = await Axios.put(
      "http://localhost:4000/modificar/" + id,
      formdata
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
      window.location.href =
        "/visualAdmin/"; /* para redirigir ala pagina listar */
    }, 1300);
  };

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
  /* INGRESO DE PRODUCTOS NUEVOS*/
  const guardarLibro = async () => {
    /* SE CREA LA FUNCION QUE SERA LLAMADA POR EL BOTON GUARDAR */

    const formdata = new FormData();
    formdata.append("nombre", nombre);
    formdata.append("descripcion", descripcion);
    formdata.append("precio", precio);
    formdata.append("estrella", estrella);
    formdata.append("correo", correo)
    formdata.append("image", imagen); /* deve decir 'image' el archivo */

    const respuesta = await Axios.post(
      "http://localhost:4000/crear",
      formdata
    ); /* CON AXIONS 
    LLAMA AL BACKEN EN SU PUERTO Y UNA UN ENVIO POS, ENVIANDO LOS DATOS DE LIBRONUEVO */

    const mensaje =
      respuesta.data
        .mensaje; /* llama desde la constante respuesta el mensage guardado en baken */

    Swal.fire({
      icon: "success",
      title: mensaje,
      showConfirmButton: false,
    });
    setTimeout(() => {
      window.location.href =
        "/ProductosUsuarioAdmin"; /* para redirigir ala pagina listar */
    }, 1300);
  };

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
  /* ACTIVAR BOTON  O DESACTIVAR */
  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
  const [botonActivo, setbotonActivo] = useState(
    false
  ); /* para activar botones o desactivar */
  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
  const [activarcheckbox, setActivarcheckbox] = useState([]);
  /* esta ala escucha de que oprima el check box para recivir la infomacion del value */
  const handleChangeCheckBox = (e) => {
    var aux = null;
    console.log(e.target.value);

    if (activarcheckbox.includes(e.target.value)) {
      aux = activarcheckbox.filter((elemento) => elemento !== e.target.value);
    } else {
      aux = activarcheckbox.concat(e.target.value);
    }
    setActivarcheckbox(aux);

    /*formula para ver si el checl box esta chuliado  */
    if (aux.length > 0) {
      // eslint-disable-next-line no-const-assign
      setbotonActivo(true);
    } else {
      // eslint-disable-next-line no-const-assign
      // eslint-disable-next-line no-unused-vars
      setbotonActivo(false);
    }
  };

  /*  */

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

  return (
    /* el entorno para el ingreso o modificacion de nuevos usuarios o datos pos-put */

    <div className="container mt-5 ">
      <div className="row ">
        {editar === "" ? null : (
          <div className="container col-3 imagen6 text-center">
            <img
              className="  img-thumbnail img-fluid  text-center"
              src={imagen}
              width="20"
              height="20"
              alt=""
            ></img>
          </div>
        )}

        <div className="col-12 pt-4-mx-auto">
          <div className="card card-body text-center">
            {/* PARA MODIFICAR EL TITULO SEGUN LA OPCION */}
            {editar === "modificar" ? (
              <h3>Modificar Producto</h3>
            ) : editar === "comprar" ? (
              <h3>Comprar Producto</h3>
            ) : (
              <h3>Ingresar Producto Nuevo</h3>
            )}

            {/* SE AGREGA LA FUNCION ACCION PARA DETERMINAR SI SE ACTIVA
                                   LA FUNCION GUARDAR O MODIFICAR */}

            <form onSubmit={accion}>
              {/* EL ONSUBMIT ES PARA REALIZAR UNA ACCION CUANDO EL BOTON SEA PRESIONADO */}
              {editar === "comprar" ? (
                <div className="container text-center">
                  <div className="form-group  mt-3">
                    <input
                      type="
  text"
                      className="form-control "
                      value={null}
                      /* EL .toLowerCase() CONVIERTE LAS PALARAS INGRESADAS A MINUSCULAS */ onChange={(
                        e
                      ) => setUnidades(e.target.value.toLowerCase())}
                      required
                      autoFocus
                      placeholder="Unidades a Comprar"
                    />
                  </div>

                  <fieldset disabled>
                    {/* PARA TENER LA OPCION DE DESABILITAR LOS FORM PARA COMPRAR */}

                    <div className="form-group  mt-3">
                      <input
                        type="
text"
                        className="form-control "
                        value={nombre}
                        /* EL .toLowerCase() CONVIERTE LAS PALARAS INGRESADAS A MINUSCULAS */ onChange={(
                          e
                        ) => setNombre(e.target.value.toLowerCase())}
                        required
                        autoFocus
                        placeholder="Producto"
                      />
                    </div>
                    <div className="form-group  mt-3">
                      <input
                        type="
text"
                        className="form-control"
                        value={precio}
                        onChange={(e) =>
                          setPrecio(e.target.value.toLowerCase())
                        }
                        placeholder="codigo"
                        required
                      />
                    </div>
                    <div className="form-group  mt-3">
                      <input
                        type="
text"
                        className="form-control"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value.toLowerCase())}
                        placeholder="detalle"
                        required
                      />
                    </div>

                    <div className="form-group  mt-3">
                      <input
                        type="
text"
                        className="form-control"
                        value={estrella}
                        onChange={(e) => setEstrella(e.target.value.toLowerCase())}
                        placeholder="Valor"
                        required
                      />
                    </div>

                    {/*  <div className="form-group  mt-3">
         <input type="
  text" className="form-control" value={imagen} onChange={e => setImagen(e.target.value.toLowerCase())} placeholder="Valor" required />
     </div> */}

                    {/* CREAR EL OPERADOR TERCEARIO PARA EL CAMBIO DE BOTON UTILIZANDO EL CREADO EN EL ESTADO EDITAR AL INICIO*/}
                  </fieldset>
                </div>
              ) : (
                <div className="container text-center">
                  <div className="form-group  mt-3">
                    <input
                      type="
 text"
                      className="form-control "
                      value={nombre}
                      /* EL .toLowerCase() CONVIERTE LAS PALARAS INGRESADAS A MINUSCULAS */ onChange={(
                        e
                      ) => setNombre(e.target.value.toLowerCase())}
                      required
                      autoFocus
                      placeholder="Producto"
                    />
                  </div>
                  <div className="form-group  mt-3">
                    <input
                      type="
 text"
                      className="form-control"
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value.toLowerCase())}
                      placeholder="codigo"
                      required
                    />
                  </div>
                  <div className="form-group  mt-3">
                    <input
                      type="
 text"
                      className="form-control"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value.toLowerCase())}
                      placeholder="detalle"
                      required
                    />
                  </div>

                  <div className="form-group  mt-3">
                    <input
                      type="
 text"
                      className="form-control"
                      value={estrella}
                      onChange={(e) => setEstrella(e.target.value.toLowerCase())}
                      placeholder="Valor"
                      required
                    />
                  </div>
                  {/*   <div className="form-group  mt-3">
         <input type="
  text" className="form-control" value={imagen} onChange={e => setImagen(e.target.value)} placeholder="Link de la imagen" required />
     </div> */}

                  {/* CREAR EL OPERADOR TERCEARIO PARA EL CAMBIO DE BOTON UTILIZANDO EL CREADO EN EL ESTADO EDITAR AL INICIO*/}
                </div>
              )}

              {/* opcion subir foto */}

              <div className="d-grid gap-2 m-3">
                {" "}
                {/* para alargar el boton */}
                {editar === "modificar" ? (
                  <h5>
                    <input
                      type="checkbox"
                      value="activo"
                      onChange={handleChangeCheckBox}
                    />{" "}
                    Subir nueva imagen
                  </h5>
                ) : /* mostrar el check box  y  estar a la escucha para mandar a la funcion que hubo un cambio con ""onChange ={handleChangeCheckBox}" el value es para dar el valor o asignarlo de una tabla 
                                        ver video https://www.youtube.com/watch?v=1sCzFUUPIoE*/
                null}
                {editar === "modificar" ? (
                  <fieldset disabled={!botonActivo}>
                    {" "}
                    {/* utilia el estado para saber sise activoo el checkbox */}
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="file"
                        placeholder="Seleccionar Imagen"
                        autoFocus
                        onChange={(e) => setImagen(e.target.files[0])}
                        required
                      />
                    </div>
                  </fieldset>
                ) : editar === "" ? (
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="file"
                      placeholder="Seleccionar Imagen"
                      autoFocus
                      onChange={(e) => setImagen(e.target.files[0])}
                      required
                    />
                  </div>
                ) : null}
              </div>

              <div className="d-grid gap-2 m-3">
                {" "}
                {/* para alargar el boton */}
                {editar === "modificar" ? (
                  <button type="submit" className="btn btn-success mt-3 ">
                    Actualizar
                  </button>
                ) : editar === "comprar" ? (
                  <button type="submit" className="btn btn-warning mt-3 ">
                    Comprar
                  </button>
                ) : (
                  <button type="submit" className=" btn btn-success">
                    Guardar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
