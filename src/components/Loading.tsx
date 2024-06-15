"use client";

import React from 'react';
import LoadingCSS from '@/styles/Loading.module.css';

const Loading: React.FC = () => {
  window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
  
    if (loader) {
      loader.classList.add("loader--hidden");
  
      loader.addEventListener("transitionend", () => {
        document.body.removeChild(loader);
      });
    }
  });
  
  return (
    <div className={LoadingCSS.loader}></div>
  );
};

export default Loading;