import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Payment from '../components/Pago/Payment'; // Importa el componente de pago
import '../assets/styles/Cart.css'; // Importa el archivo CSS para estilos adicionales

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);

  return (
    <div className="container mt-5 cart-container">
      <h2 className="mb-4 text-center">Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <table className="table table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Precio Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${parseFloat(item.price).toFixed(2)}</td>
                  <td>${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5V6h-5v-.5zm3.354-2.354a.5.5 0 0 0-.708 0L7.5 3.293 6.854 2.646a.5.5 0 1 0-.708.708l1 1a.5.5 0 0 0 .708 0l1-1a.5.5 0 0 0 0-.708zM3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zM1 5.5A.5.5 0 0 1 1.5 5h.793l1 10A.5.5 0 0 0 3.793 16h8.414a.5.5 0 0 0 .499-.5l1-10h.793a.5.5 0 0 1 .5.5v.793a.5.5 0 0 1-.5.5H1.5a.5.5 0 0 1-.5-.5v-.793z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-summary text-right mt-4">
            <h5>Total de productos: {totalQuantity}</h5>
            <h5>Total a pagar: ${totalPrice.toFixed(2)}</h5>
          </div>
          <div className="payment-section mt-4">
            <Payment totalAmount={totalPrice} /> {/* Añade el componente de pago aquí */}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
