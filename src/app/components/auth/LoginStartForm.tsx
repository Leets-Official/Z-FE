'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const client_id = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || '';
const redirect_uri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI || '';

const LoginStartForm = () => {
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code`;
  const route = useRouter();
  const searchParams = useSearchParams();

  const [code, setCode] = useState<string | null>();

  useEffect(() => {
    setCode(searchParams.get('code'));
    if (!code) return;
    const fetchAccessToken = async () => {
      console.log('effect');
      try {
        const response = await fetch(`/api/redirect?code=${code}`);
        if (response.redirected) {
          const redirectUrl = response.url;
          route.push(redirectUrl || '/');
        } else {
          route.push('/');
        }
      } catch (error) {
        console.error('Failed to fetch access token:', error);
      }
    };
    fetchAccessToken();
  }, [code]);

  return (
    <div className="flex w-[480px] flex-col items-center justify-center min-h-screen gap-y-[60px] bg-white">
      <Image src="/logo_Z.jpg" alt="Logo" width={240} height={240} />
      <div className="flex flex-col text-4xl items-center font-semibold gap-y-10">
        <h2>Z에서 무슨일이?</h2>
        <h5 className="text-3xl">지금 바로 시작해보세요!</h5>
      </div>
      <Link href={kakaoAuthUrl}>
        <Image src="/kakao_login_large_narrow.png" alt="Kakao Logo" width={224} height={55} />
      </Link>
    </div>
  );
};

export default LoginStartForm;
