import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://localhost:8080/api/auth/kakao', {
      redirect: 'manual',
    });
    if (response.status === 302) {
      const redirectUrl = response.headers.get('Location');
      if (redirectUrl) {
        return NextResponse.redirect(redirectUrl);
      }
    }
    return NextResponse.json({ error: '예상치 못한 응답' }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
