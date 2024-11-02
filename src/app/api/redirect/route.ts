import { NextRequest, NextResponse } from 'next/server';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER;
const LOCAL_URL = process.env.NEXT_PUBLIC_LOCAL_SERVER;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  console.log(code, '1. 가져온 코드');

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
    console.log(response.headers, '2. 응답헤더');

    const setCookieHeader = response.headers.get('Set-Cookie');

    const data = await response.json();
    console.log(data, '3. 응답데이터');

    let redirectUrl = '/';

    if (data.data.requiredRegister) {
      redirectUrl = `/signupForm`;
    }

    console.log(redirectUrl, '5. redirect');
    const redirectResponse = NextResponse.redirect(LOCAL_URL + redirectUrl);

    if (setCookieHeader) {
      redirectResponse.headers.set('Set-Cookie', setCookieHeader);
    }
    console.log(setCookieHeader, '4. 쿠키 헤더 설정');

    return redirectResponse;
  } catch (error) {
    console.error('카카오 인증 처리 중 오류:', error);
    return NextResponse.json({ error: '인증 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
