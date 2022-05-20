import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.css'

import Navigation from "./components/Navigation";
import ProductsList from './components/ProductsList'
import Sesion from './components/Sesion'
import CarroCompra from './components/CarroCompra'

function App() {
  /* Se usa el hook useState para definir los estados, inicializarlos 
  y agregar un modificador para cada estado */
  const [ingreso, SetIngreso] = useState(false)
  const [carroCompra, setCarroCompra] = useState([]);
  const [user, setUser] = useState({id: "", email: "", password: ""})

  /* Se definen metodos que se pasaran a los componentes hijos mediante las
  props con el fin de que al generar una acccion este retorne un parametro al
  componente padre (en este caso App.js) para poder gestionar el estado de la aplicacion */

  // Actualiza el valor del estado "ingreso" que se ejecuta desde el componente <Sesion/>
  const updateIngreso = (ingresoState) => {
    SetIngreso(ingresoState)
    console.log('Cambio estado: '+ingresoState)
  }

  /* Se actualiza el usuario valido en el sistema */
  const updateUser = (user) => {
    setUser(user)
    console.log('Cambio usuario: '+ JSON.stringify(user))
  }

  /* Envia desde el componente <ProductList/> el producto que sera agregado
  al carro de compras y lo almacena en el estado carroCompra */
  const updateCarroCompra = (product) => {
    const productValid = validarProducto(product)
    if(productValid){
      setCarroCompra([...carroCompra, product])
      alert("Producto agregado al carro de compra")
    }
    else
      alert("El producto ya se agrego al carro de compra")
  }

  const validarProducto = (product) => {
    if (carroCompra.length === 0)
      return true

    const productoValido = carroCompra.find((compra) => {
      return compra.id === product.id
    })

    if(productoValido)
      return false
    else
      return true
  }

  /* Elimina del estado carroCompra el producto que se elimino desde el componente
  <CarroCompra/> para mantener el estado actualizado del carro de compras*/
  const deleteCarroCompra = (product) => {
    setCarroCompra(carroCompra.filter((compra) => compra.id !== product.id))
  }

  /* Establece un arreglo vacio para el estado carroCompra cuando el usuario sale
  del sistema, este se ejecuta desde el componente <Sesion/> */
  const salirSistema = () => {
    setCarroCompra([])
  }

  return (
    <BrowserRouter>
      <Navigation/>
      <div className="container border rounded bg-light mx-auto mt-2 p-4">
        <Routes>
          <Route
            index path="/"
            element={
              <ProductsList
                ingreso={ingreso}
                updateCarroCompra={updateCarroCompra}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Sesion
                ingreso={ingreso}
                user={user}
                updateIngreso={updateIngreso}
                updateUser={updateUser}
                salirSistema={salirSistema}
              />
            }
          />
          <Route
            path="/carro"
            element={
              <CarroCompra
                ingreso={ingreso}
                carroCompra={carroCompra}
                deleteCarroCompra={deleteCarroCompra}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
