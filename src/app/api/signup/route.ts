import { NextResponse } from "next/server"; // 응답을 클라이언트한테 보낼 때 쓰는 도구
import fs from "fs/promises"; // 파일을 읽고 쓰기 위한 기능 (비동기용)
import path from 'path'; // 파일 경로를 안전하게 만들어주는 도구

// POST 요청이 오면 실행되는 함수
export async function POST (req: Request) {
  // 사용자가 보낸 데이터 꺼내기 (name, email, password)
  const { name, email, password } = await req.json();

  // users.json 파일 위치 정하기 (프로젝트 기준 경로)
  const filePath = path.join(process.cwd(), 'data', 'users.json');

  // 파일 안의 내용을 읽고, 문자열을 배열로 바꿔주기
  const fileData = await fs.readFile(filePath, 'utf-8');
  const users = JSON.parse(fileData);

  // 이미 가입된 이메일인지 확인
  const exists = users.some((user: any) => user.email === email);
  if (exists) {
    // 중복이면 실패 응답 보내기 (409 = 충돌)
    return NextResponse.json(
      { message: '사용중인 이메일입니다.' },
      { status: 409 }
    );
  }

  // 새 사용자 객체 만들기 (id는 지금 시간으로 만듦)
  const newUser = { id: Date.now(), name, email, password };

  // 기존 목록에 새 유저 추가
  users.push(newUser);

  // 바뀐 목록을 다시 파일에 저장 (들여쓰기 예쁘게 2칸)
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));

  // 가입 성공 응답 보내기 (201 = 성공적으로 생성됨)
  return NextResponse.json({ message: '회원가입 완료!' }, { status: 201 });
}
