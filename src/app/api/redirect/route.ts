import { NextRequest, NextResponse } from 'next/server';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER;
const LOCAL_URL = process.env.NEXT_PUBLIC_LOCAL_SERVER;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect('/login?error=no_code');
  }

  try {
    const response = await fetch(`${SERVER_URL}/api/auth/kakao/redirect?code=${code}`, {
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
      },
    });

    const setCookieHeader = response.headers.get('set-cookie');

    const data = await response.json().then((data) => data.data);

    let redirectUrl = '';

    if (data.requiredRegister) {
      redirectUrl = `${LOCAL_URL}/signupForm`;
    }

    const redirectResponse = NextResponse.redirect(redirectUrl);

    if (setCookieHeader) {
      redirectResponse.headers.set('Set-Cookie', setCookieHeader);
    }

    return redirectResponse;
  } catch (error) {
    console.error('카카오 인증 처리 중 오류:', error);
    return NextResponse.json({ error: '인증 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
