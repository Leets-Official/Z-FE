import React from 'react';
import Image from 'next/image';

interface WelcomeComponentProps {
  nickname: string;
}

const WelcomeSignup: React.FC<WelcomeComponentProps> = ({nickname}) => {
  return (
    <div className="flex flex-col w-[480px] items-center justify-center h-screen bg-white text-black p-4">
      <div className="flex justify-center items-center ">
          <Image
            src="/logo_Z.jpg"
            alt="Logo"
            width={100}
            height={100}
            
          />
          </div>
      <h1 className="text-2xl font-bold mb-8">회원가입 완료!</h1>
     <div className='flex flex-col justify-center items-center gap-10'>
     <Image
            src="/checkCircle.svg"
            alt="Logo"
            width={60}
            height={60}
          
          />
      <p className="text-center mb-15 gap-15">
        {nickname}님 반가워요!<br />
        지금 바로 Z를 시작해보세요
      </p>
      <button className="bg-black text-white py-2 px-4 rounded">
        시작하기
      </button>
     </div>
      
    </div>
  );
};

export default WelcomeSignup;