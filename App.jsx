import { useState } from 'react'

import Header from './components/Layout/Header'
import Cart from './components/Cart/Cart'
import Meals from "./components/Meals/Meals.jsx"
import CartProvider from './store/CartProvider'

function App() {
  const [cartIsShown, setCartIsShown ] = useState(false)

  const showCartHandler = () => {
    setCartIsShown(true)
  }

  const hideCartHandler = () => {
    setCartIsShown(false)
  }

  const orderFood = () => {
    console.log('ordering the food!!')
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart onHideCart={hideCartHandler} onOrder={orderFood} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
 