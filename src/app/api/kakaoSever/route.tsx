import { NextRequest, NextResponse } from 'next/server';

const CLIENT_ID = process.env.KAKAO_CLIENT_ID;
const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect('/login?error=no_code');
  }

  try {
    const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: CLIENT_ID!,
        redirect_uri: REDIRECT_URI!,
        code,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to fetch token from Kakao');
    }

    const tokenData = await tokenResponse.json();

    const apiResponse = await fetch(`${API_URL}/api/auth/kakao`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ access_token: tokenData.access_token }),
    });

    if (!apiResponse.ok) {
      throw new Error('Failed to authenticate with the server');
    }

    const userData = await apiResponse.json();

    if (userData.isNewUser) {
      return NextResponse.redirect('/auth/signupForm');
    } else {
      const { token } = userData;
      const response = NextResponse.redirect('/auth/oauth/kakao/success');
      response.cookies.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600, // 1시간
        path: '/',
      });

      return response;
    }
  } catch (error) {
    console.error('Error in Kakao login process:', error);
    return NextResponse.redirect('/login?error=login_failed');
  }
}
