import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import '../../assets/styles/Payment.css'; // Importa el archivo CSS para estilos

const stripePromise = loadStripe('pk_test_51PRhFmH1SRAUWCPFnmWbx2wJqCfUb0NIGuODMBk3mVcv36RsTrCRjENJAXuEbR3YaKAv28EIqFl4UEpDMgUQL6LI00W2juiojj');

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const response = await axios.post('http://localhost:8000/create-checkout-session/', {
          amount: totalAmount,
        });
        window.location.href = response.data.url; // Redirige al checkout de Stripe
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h4 className="text-center mb-4">Métodos de pago</h4>
      <div className="payment-methods">
        <img src="../images/visa.png" alt="Visa" />
        <img src="../images/Mastercard.png" alt="MasterCard" />
        <img src="../images/americanE.png" alt="American Express" />
        <img src="../images/Paypal.png" alt="PayPal" />
      </div>
      <h5 className="text-center mb-4">Tus datos de pago</h5>
      <label>
        Titular de la tarjeta
        <input type="text" placeholder="Ej. Rodolfo Rivera" className="form-control mb-3" />
      </label>
      <label>
        Número de la tarjeta
        <CardElement options={CARD_ELEMENT_OPTIONS} className="form-control mb-3" />
      </label>
      <label>
        Fecha de vencimiento
        <input type="text" placeholder="MM/YY" className="form-control mb-3" />
      </label>
      <label>
        CVV
        <input type="text" placeholder="Ej. 123" className="form-control mb-3" />
      </label>
      <div className="payment-summary">
        <h5>Monto total</h5>
        <h5>${totalAmount.toFixed(2)} USD</h5>
      </div>
      <button type="submit" className="btn btn-primary btn-block mt-4" disabled={!stripe}>
        Pagar ahora
      </button>
    </form>
  );
};

const Payment = ({ totalAmount }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm totalAmount={totalAmount} />
  </Elements>
);

export default Payment;
