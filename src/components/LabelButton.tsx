// src/components/AddToCartButton.tsx
import React from 'react';

type AddToCartButtonProps = {
  productId: number;
  productName: string;
  productPrice: number;
};

const LabelButton: React.FC<AddToCartButtonProps> = ({ productId, productName, productPrice }) => {
  return (
    <button key={productId} title="Add to cart">
      <span className="productName">{productName} </span>
      <span className="productPrice">${productPrice}</span>
    </button>
  );
};

export default LabelButton;