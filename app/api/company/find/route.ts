import { cookies } from 'next/headers';
import { getUser } from '@/lib/actions';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const token = cookies().get('@control-token');

  const { user_company } = await getUser(token?.value);

  const res = await fetch(
    `${process.env.API_SERVER}company/find/${user_company}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.value}`
      }
    }
  );
  const data = await res.json();

  return NextResponse.json(data);
}
