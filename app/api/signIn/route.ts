import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { email, password } = body;

    const res = await fetch(`${process.env.API_SERVER}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    cookies().set('@control-server-token', data.access_token);

    return NextResponse.json(data);
  } catch (error) {
    throw error;
  }
}
