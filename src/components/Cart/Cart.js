import React, { useState, useContext } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';


const Cart = (props) => {
  const [ ordered, setOrdered ] = useState(false)
  const cartCtx = useContext(CartContext);
  const [ didSubmit, setDidSubmit ] = useState(false)
  const [ isSubmitting, setIsSubmitting ] = useState(false)

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  function submitOrder () {
    setOrdered(true)

  }

  const submitOrderHandler = async ( userData ) => {
    setIsSubmitting(true)
    await fetch('https://reactmeals-4c3cc-default-rtdb.firebaseio.com/orders.json', {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      }),
      headers: {
        "Content-Type": "application/json"
      } 
    })
    setIsSubmitting(false)
    setDidSubmit(true)
    cartCtx.clearCart()
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && <button className={classes.button} onClick={submitOrder}>Order</button>}
    </div>
  )

  const cartModalContent =  (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      { !ordered && modalActions }
      { ordered && <Checkout onConfirm={submitOrderHandler} onClose={props.onClose} /> }
    </>
  )

  const isSubmittingModalContent = <p>Sending order data...</p>

  const didSubmitModalContent = <>
    <p>Successfully sent the order...</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
    </div>
  </>

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent }
      {isSubmitting && isSubmittingModalContent}
      { didSubmit && !isSubmitting && didSubmitModalContent }

    </Modal>
  );
};

export default Cart;
