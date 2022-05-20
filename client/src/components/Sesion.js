import { useEffect, useState } from "react";
import '/node_modules/font-awesome/css/font-awesome.css'

export default function Sesion(props) {
  // Se usan las props para inicializar los estados del componente
  const [users, setUsers] = useState([])
  const [ingreso, SetIngreso] = useState(props.ingreso)
  const [user, setUser] = useState(props.user)

  /* Se utiliza el async/await con el fin de que las
  acciones a la base de datos se hagan de manera asincrona*/
  const loadUsers = async () => {
    const response = await fetch("http://localhost:9000/users");
    const data = await response.json();
    setUsers(data);
  }

  /* Se usa el hook useEffect para cargar los datos de los
  usuarios una vez se haya terminado de renderizar el componentes */
  useEffect(() => {
    loadUsers();
  }, []);

  // Se define un manejador para el evento onSubmit del formulario
  const handleSubmit = (e) => {
    e.preventDefault()
    const email = document.getElementById('email').value;
    const pass = document.getElementById('clave').value;
    const valido = validarCredenciales(email, pass)
    if(valido){
      validarIngreso(valido)
    }
  }

  const validarCredenciales = (correo, clave) => {
    const usuarioValido = users.find((user) => {
      return user.email === correo && user.password === clave
    })
    if(usuarioValido === undefined){
      alert("Datos invalidos")
      return undefined
    }
    else{
      alert("Bienvenido al sitema")
      return usuarioValido
    }
  }

  /* este metodo modifica el estado del componente <Sesion/>
  y le notifica al componente padre (App) que el estado
  "ingreso" y "user" cambiaron*/
  const validarIngreso = (usuario) => {
    SetIngreso(true)
    props.updateIngreso(true)
    setUser(usuario)
    props.updateUser(usuario)
  }

  // Se define un manejador para salir del sistema (log-out)
  const salir = () => {
    SetIngreso(false)
    props.updateIngreso(false)
    setUser({id: "", email: "", password: ""})
    props.updateUser({id: "", email: "", password: ""})
    props.salirSistema()
  }

  if(ingreso){
    return(
      <>
        <div className="row my-2 text-center">
          <div className="col-12 text-center">
            <h3>Bienvenido al sistema</h3>
          </div>
          <div className="col-8 bg-dark rounded text-white mx-auto mt-2">
            <i className="fa fa-user pr-2"></i> <b>Usuario: </b>
            <i> {user.email} </i>
          </div>
        </div>
        <div className="row">
          <div className="col-6 mx-auto">
          <button className="btn btn-danger btn-sm mt-2" style={{width:"100%"}} onClick={salir}>
            Salir
          </button>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
      <div className="row">
        <div className="col-8 mx-auto">
          <h2 className='text-primary text-center'><small>Inicio Sesion</small></h2>
          <div className=' rounded bg-dark mt-2 p-2'>
            <form onSubmit={handleSubmit}>
              <div className="input-group pb-3">
                <div className="input-group-prepend my-auto">
                  <span className="input-group-text">
                  <i className="fa fa-envelope-o fa-fw py-1"></i></span>
                </div>
                <input className="form-control" id='email'
                  type="email" placeholder="Correo Electrónico"
                />
              </div>
              <div className="input-group pb-3">
                <div className="input-group-prepend my-auto">
                  <span className="input-group-text">
                  <i className="fa fa-key fa-fw py-1"></i></span>
                </div>
                <input className="form-control" id='clave'
                  type="password" placeholder="Contraseña"
                />
              </div>
              <button className="btn btn-primary mx-auto" type="submit" style={{width:"100%"}}>
                Acceder
              </button>
            </form>
          </div>
        </div>
      </div>
      </>
    )
  }
}
