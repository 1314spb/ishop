// components/CartButton.tsx
"use client";

import { useState } from 'react';
import CartPopup from './cartPopup';
import cart from '../images/shopping-cart.png'
import CartButtonCSS from '../styles/CartButton.module.css';

const CartButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={CartButtonCSS.cart_container}
    >
      <button><img src={cart.src} alt="cart" /></button>
      {isHovered && <CartPopup />}
    </div>
  );
};

export default CartButton;