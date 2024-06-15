// src/components/AddToCartButton.tsx
import React from 'react';
import eventEmitter from '@/utils/events';

type AddToCartButtonProps = {
  product: {
    pid: number;
    name: string;
    price: number;
    quantity: number;
  };
};

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const existingProductIndex = cart.findIndex((item: AddToCartButtonProps['product']) => item.pid === product.pid);

    if (existingProductIndex >= 0) {
      // If product already exists in the cart, increase its quantity
      const existingProduct = cart[existingProductIndex];
      const newQuantity = isNaN(existingProduct.quantity) ? 1 : existingProduct.quantity + (isNaN(product.quantity) ? 1 : product.quantity);
      cart[existingProductIndex].quantity = newQuantity;
    } else {
      // If product does not exist in the cart, add it with default quantity if necessary
      cart.push({
        ...product,
        quantity: isNaN(product.quantity) ? 1 : product.quantity,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);

    // Emit event to notify CartPopup to update
    eventEmitter.emit('cartUpdated');
  };

  return (
    <button onClick={handleAddToCart}>
      <p>${product.price.toFixed(2)}</p>
    </button>
  );
};

export default AddToCartButton;