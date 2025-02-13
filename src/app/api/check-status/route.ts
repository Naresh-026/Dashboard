import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const response = await fetch(url, { method: 'HEAD' });
    return NextResponse.json({ isOnline: response.ok });
  } catch (error) {
    return NextResponse.json({ isOnline: false });
  }
} 