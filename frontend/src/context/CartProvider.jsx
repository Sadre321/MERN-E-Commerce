import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext();

const CartProvider = ({children}) => {
  
  const [cartItems,setCartItems] = useState(localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[]);

  useEffect(()=>{
    localStorage.setItem("cartItems",JSON.stringify(cartItems));
  },[cartItems]);
  
  const addToCard = (cartItem) => {
    setCartItems((prevCart) => [
      ...prevCart,
      {
        ...cartItem,
        quantity: cartItem.quantity ? cartItem.quantity : 1,
      },
    ]);
  };

  const removeToCard =(product)=>{
    const filteredCart = cartItems.filter((item)=>{return item.id !== product._id});
    setCartItems(filteredCart);
  } 


  return (
    <CartContext.Provider value={{addToCard,cartItems,removeToCard}}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;

CartProvider.propTypes = {
  children:PropTypes.node
}