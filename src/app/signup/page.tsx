'use client'; // 클라이언트 컴포넌트임을 명시 (Next.js App Router용)

import { useState } from 'react';

export default function SignUpPage() {
  // 👉 사용자 입력값을 저장할 상태
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  // 👉 에러 메시지 상태
  const [error, setError] = useState('');

  // 👉 input 값이 바뀔 때마다 form 상태 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(''); // 입력 중엔 에러 초기화
  };

  // 👉 입력값 유효성 검사
  const validateForm = () => {
    if (form.name.trim().length < 2) return '이름은 2글자 이상이어야 합니다.';
    if (!form.email.includes('@') || !form.email.includes('.')) return '유효한 이메일 형식을 입력해주세요.';
    if (form.password.length < 6) return '비밀번호는 최소 6자 이상이어야 합니다.';
    return '';
  };

  // 👉 폼 제출 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 페이지 새로고침 방지

    const errorMessage = validateForm();
    if (errorMessage) {
      setError(errorMessage); // 에러 메시지 출력
      return;
    }

    // 서버에 회원가입 정보 전송
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message); // 서버 응답 메시지 출력
  };

  // 👉 실제 화면 구성
  return (
    <main className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

      {/* 에러 메시지 영역 */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 이름 입력 */}
        <div>
          <label className="block mb-1">Name</label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* 이메일 입력 */}
        <div>
          <label className="block mb-1">Email</label>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* 비밀번호 입력 */}
        <div>
          <label className="block mb-1">Password</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
