import { useState, useEffect } from "react";

export default function ProductsList(props) {

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({id:"", contenido:"", titulo:"", precio:0})
  const [ingreso] = useState(props.ingreso)

  const loadProducts = async () => {
    const response = await fetch("http://localhost:9000/products");
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const agregarCompra = (producto) => {
    setProduct(producto)
    props.updateCarroCompra(producto)
  }

  var mostrarCompra = ingreso ? "d-block" : "d-none"

  return (
    <>
      <h1>Productos</h1>
      <div className="row">
        {
          products.map((product) => (
            <div className="col-md-6 p-2 mt-1" key={product.id}>
              <div className="card">
                <div className="card-header bg-dark">
                  <h5 className="text-white mb-0">{product.titulo}</h5>
                </div>
                <div className="card-body">
                  <p> Cantidad: {product.contenido} </p>
                  <p className="mb-0">
                    Precio: <b className="text-primary" > $ {new Intl.NumberFormat("de-DE").format(product.precio)} </b>
                  </p>
                </div>
                <div className={"card-header " + mostrarCompra}>
                  <button
                    className="btn btn-warning"
                    onClick={() => agregarCompra(product)}
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}
