import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/api/db';

export async function GET(req: NextRequest) {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
  }
}
