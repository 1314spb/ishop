// src/app/components/NavBar.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LOGO from '@/logo/1314_spb_LOGO.svg';
import NavBarCSS from '@/styles/NavBar.module.css';
import SearchBar from '@/components/searchbar';
import CartButton from '@/components/cartButton';

const NavBar: React.FC = () => {
  return (
    <nav className={NavBarCSS.navbar}>
      <div className={NavBarCSS.navLeft}>
        <ul className={NavBarCSS.navList}>
          <li className={NavBarCSS.navItem}><Link href="/"><Image src={LOGO} alt="Logo" width={32} height={32} /></Link></li>
          <li className={NavBarCSS.navItem}><Link href="/">Home</Link></li>
          <li className={NavBarCSS.navItem}><Link href="/food">Food</Link></li>
          <li className={NavBarCSS.navItem}><Link href="/drink">Drink</Link></li>
          <li className={NavBarCSS.navItem}><Link href="/fruit">Fruit</Link></li>
          {/* <li className={NavBarCSS.navItem}><SearchBar /></li> */}
        </ul>
      </div>
      
      <div className={NavBarCSS.navRight}>
        <CartButton />
      </div>
      
    </nav>
  );
};

export default NavBar;