import { useContext } from 'react'
import classes from './Cart.module.css'
import Modal from "../UI/Modal"
import CartItem from "./CartItem"

import CartContext from '../../store/cart-context'

export const Cart = props => {

  const cartCtx = useContext(CartContext)
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
  const hasItems = cartCtx.items.length > 0

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({
      id: item.id,
      name: item.name,
      amount: 1,
      price: item.price
    })
  } 
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  } 
  
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => 
        <CartItem 
          key={item.id} 
          name={item.name} 
          amount={item.amount} 
          price={item.price} 
          item={item}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)} 
        />
      )}
    </ul>
  )

  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
        {hasItems && <button className={classes.button} onClick={props.onOrder} >Order</button>}
      </div>
    </Modal>
  )
}

export default Cart