import React from 'react'

import mealsImage from "../../assets/meals.jpg";
import HeaderCartButton from './HeaderCartButton'
import classes from "./Header.module.css"

const Header = (props) => {


  return (
    <>
      <header className={classes.header}>
        <h1>Ndukz Meals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="at table with some Meals" />
      </div>
    </>
  )
}

export default Header