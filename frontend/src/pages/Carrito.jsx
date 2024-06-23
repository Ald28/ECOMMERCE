import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const Carrito = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [quantities, setQuantities] = useState({});

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + (parseFloat(item.precio) * item.quantity), 0);

  const handleQuantityChange = (itemId, quantity) => {
    // Guardar la nueva cantidad en el estado local
    setQuantities({ ...quantities, [itemId]: quantity });

    // Actualizar la cantidad en el contexto del carrito
    updateQuantity(itemId, quantity);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <table className="table">
          <thead>
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
                <td>{item.nombre}</td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={quantities[item.id] || item.quantity}
                    min="1"
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  />
                </td>
                <td>${parseFloat(item.precio).toFixed(2)}</td>
                <td>${(parseFloat(item.precio) * item.quantity).toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="mt-4">
        <h5>Total de productos: {totalQuantity}</h5>
        <h5>Total a pagar: ${totalPrice.toFixed(2)}</h5>
      </div>
    </div>
  );
};

export default Carrito;
