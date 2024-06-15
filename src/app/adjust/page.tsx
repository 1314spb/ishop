// app/about/page.tsx
"use client";

import React, { useEffect, useState }from 'react';
import Head from 'next/head';
import NavBar from '@/components/navbar';
import BoxCSS from '@/styles/Box.module.css';

type Product = {
  pid: number;
  cid: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image_src: string;
};

const Food = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastSegment, setLastSegment] = useState('');

  useEffect(() => {
    const path = window.location.pathname;
    const segment = path.substring(path.lastIndexOf('/') + 1);
    setLastSegment(segment);
    
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/showCategory?segment=${segment}`);
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
        <title>Fruit Page</title>
        <meta name="description" content="Welcome to my homepage" />
      </Head>
      <NavBar />
      <main className="p-6">
      {loading ? (
          <p>Loading...</p>
        ) : (
          <div className={BoxCSS.box_container}>
            {products.map(product => (
              <div className={BoxCSS.box}  key={product.pid}>
                <img src={product.image_src} alt={product.name} />
                <button key={product.pid} title='Add to cart'> 
                  <span className='productName'>{product.name} </span>
                  <span className='productPrice'>${product.price}</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Food;