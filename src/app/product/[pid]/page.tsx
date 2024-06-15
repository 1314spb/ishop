// src/app/product/[pid]/page.tsx
"use client";

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import NavBar from '@/components/navbar';
import AddToCartButton from '@/components/AddToCartButton';
import Loading from '@/components/Loading';

import ProductCSS from '@/styles/Product.module.css';


type Product = {
  pid: number;
  cid: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image_src: string;
};

const ProductPage = () => {
  const { pid } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pid) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/product/${pid}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setProduct(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching product:', error);
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [pid]);

  if (loading) {
    return <Loading />
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className={ProductCSS.page}>
      <NavBar />
      <main className="p-6">
        <div className={ProductCSS.product_container}>
          <div className={ProductCSS.image_container}>
            <img src={product.image_src} alt={product.name} />
          </div>

          <div className={ProductCSS.information_container}>
            <p className={ProductCSS.info_title}>{product.name}</p>
            <AddToCartButton product={{ pid: product.pid, name: product.name, price: product.price, quantity: 1 }} />
            <p className={ProductCSS.info_quantity}>Quantity: {product.quantity}</p>

            <div className={ProductCSS.divider}></div>

            <p className={ProductCSS.info_description}>{product.description}</p>
          </div>

          <div>
            <button className={ProductCSS.back_button} onClick={() => router.push('/home')}>
              <p>Back</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;