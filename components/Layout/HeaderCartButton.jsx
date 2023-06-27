import React, {useContext, useEffect, useState } from 'react'

import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context'

const HeaderCartButton = (props) => {
  const [ buttonIsHighlighted, setButtonIsHighlighted] = useState(false)
  const cartCtx = useContext(CartContext)
  console.log(cartCtx.items);
  
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    if (typeof item.amount === 'number' && !isNaN(item.amount)) {
      return curNumber + item.amount
    }
    return curNumber
  }, 0);


  const btnClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ""}`

  useEffect(()=>{
    if(items.length === 0){
      return
    }
    setButtonIsHighlighted(true)

    const timer = setTimeout(()=>{
      setButtonIsHighlighted(false)
    }, 300)
    
    return () => {
      clearTimeout(timer)
    }
  }, items)

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>
        {numberOfCartItems} 
      </span>
    </button>
    )
}

export default HeaderCartButton