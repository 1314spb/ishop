import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/api/db';

type Product = {
  pid: number;
  cid: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image_src: string;
};

export async function GET(request: NextRequest, { params }: { params: { pid: string } }) {
  const { pid } = params;

  if (!pid) {
    return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
  }

  try {
    const [rows] = await pool.execute('SELECT * FROM products WHERE pid = ?', [pid]);
    
    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const product: Product = rows[0] as Product;

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}