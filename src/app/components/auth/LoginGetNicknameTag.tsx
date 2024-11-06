'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const LoginGetNicknameTag = () => {
  const [formData, setFormData] = useState({
    year: '',
    month: '',
    day: '',
    nickname: '',
    tag: '',
  });
  const [isTagAvailable, setIsTagAvailable] = useState<boolean | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const checkTagAvailability = async () => {
    try {
      const response = await fetch(`/api/signup?tag=${formData.tag}`, {
        method: 'GET',
      });
      const data = await response.json();
      console.log(data, '태그 중복 여부');

      setIsTagAvailable(!data.isDuplicate);
    } catch (error) {
      console.error('태그 중복 확인 중 오류 발생:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const birthDate = `${formData.year}-${formData.month.padStart(2, '0')}-${formData.day.padStart(2, '0')}`;

      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          nickname: formData.nickname,
          tag: formData.tag,
          birthDate,
        }),
      });
      const data = await response.json();
      console.log('client 단에서 응답 : ', data);

      if (response) {
        router.push('/login');
      } else {
        console.error('회원가입 실패');
      }
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
    }
  };

  return (
    <div className="flex w-[480px] justify-center items-center min-h-screen bg-white">
      <div className=" p-8 rounded-lg shadow-md max-w-md">
        <div className="flex justify-center items-center">
          <Image src="/logo_Z.jpg" alt="Logo" width={100} height={100} />
        </div>
        <div className="flex justify-center items-start">
          <h2 className="text-xl font-semibold">회원가입</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">생년월일</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="year"
                placeholder="YYYY"
                value={formData.year}
                onChange={handleChange}
                className="w-1/3 p-2 border rounded"
              />
              <input
                type="text"
                name="month"
                placeholder="MM"
                value={formData.month}
                onChange={handleChange}
                className="w-1/3 p-2 border rounded"
              />
              <input
                type="text"
                name="day"
                placeholder="DD"
                value={formData.day}
                onChange={handleChange}
                className="w-1/3 p-2 border rounded"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">연, 월, 일을 모두 기입해주세요</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">닉네임</label>
            <input
              type="text"
              name="nickname"
              placeholder="제트핑"
              value={formData.nickname}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <p className="text-xs text-gray-500 mt-1">한글, 영문, 숫자로 구성된 8자 이하 닉네임을 작성해주세요</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">태그</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">@</span>
              <input
                type="text"
                name="tag"
                placeholder="abc1234"
                value={formData.tag}
                onChange={handleChange}
                className="w-full p-2 pl-6 border rounded"
              />
              <button
                type="button"
                onClick={checkTagAvailability}
                className="absolute inset-y-0 right-0 flex items-center pr-2 text-sm"
              >
                중복확인
              </button>
            </div>
            {isTagAvailable !== null && (
              <p className={`text-xs mt-1 ${isTagAvailable ? 'text-green-500' : 'text-red-500'}`}>
                {isTagAvailable ? '사용 가능한 태그입니다.' : '이미 사용 중인 태그입니다.'}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">영문, 숫자, '_'로 구성된 4-12자의 태그를 작성해주세요</p>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white p-3 rounded-md hover:bg-gray-700 transition duration-300"
          >
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginGetNicknameTag;
