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

    // 리다이렉트가 없는 경우 또는 다른 상태 코드인 경우
    return NextResponse.json({ error: '예상치 못한 응답' }, { status: 500 });
  } catch (error) {
    console.error('카카오 인증 요청 중 오류 발생:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
