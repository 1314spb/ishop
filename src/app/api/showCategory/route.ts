import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/api/db';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    console.log("url: ", url);
    const lastSegment = url.searchParams.get('segment');
    console.log(lastSegment);

    const [rows]: any[] = await pool.query('SELECT * FROM categories WHERE category = ?', [lastSegment]);
    const cid = rows[0].cid;
    const [products] = await pool.query('SELECT * FROM products WHERE cid = ?', [cid]);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
  }
}
