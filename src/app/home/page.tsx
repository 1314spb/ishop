// src/app/pages/home.tsx
"use client";

import React, { useState, useEffect} from 'react';
import Head from 'next/head';
import NavBar from '@/components/navbar';
import BoxCSS from '@/styles/Box.module.css';
import Link from 'next/link';
import LabelButton from '@/components/LabelButton';
import Loading from '@/components/Loading';

// 定義產品類型
type Product = {
  pid: number;
  cid: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image_src: string;
};

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/allProducts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Welcome to my homepage" />
      </Head>
      <NavBar />
      <main className="p-6">
        {loading ? (
          <Loading />
        ) : (
          <div className={BoxCSS.box_container}>
            {products.map(product => (
                <Link href={`/product/${product.pid}`} key={product.pid}>
                <div className={BoxCSS.box}  key={product.pid}>
                  <img src={product.image_src} alt={product.name} />
                  <LabelButton
                    productId={product.pid}
                    productName={product.name}
                    productPrice={product.price}
                  /> 
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;