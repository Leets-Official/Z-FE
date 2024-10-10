import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://43.203.123.147:8080';

export async function POST(req: NextRequest) {
  try {
    const { nickname, tag, birthDate } = await req.json();
    const signupResponse = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname, tag, birthDate }),
    });

    const data = await signupResponse.json();
    return NextResponse.json(data, { status: signupResponse.status });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const tag = req.nextUrl.searchParams.get('tag');
    const checkDuplicationResponse = await fetch(
      `${API_URL}/api/members/tag/is-duplication?tag=${tag}`,
    );
    const data = await checkDuplicationResponse.json();
    return NextResponse.json(data, { status: checkDuplicationResponse.status });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}