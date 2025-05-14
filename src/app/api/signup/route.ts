import { NextResponse } from "next/server"; // 클라이언트에게 응답을 보내기 위한 Next.js 도구
import fs from "fs/promises";               // 파일을 비동기적으로 읽고/쓰는 Node.js 내장 모듈
import path from "path";                    // 운영체제에 상관없이 안전하게 경로를 처리하기 위한 모듈

// 사용자 정보를 표현하는 타입 정의
type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

// POST 요청이 오면 실행되는 함수 (회원가입 처리)
export async function POST(req: Request) {
  // 클라이언트가 보낸 JSON 데이터 꺼내기
  const { name, email, password } = await req.json();

  // users.json 파일의 경로 생성 (프로젝트 루트 기준)
  const filePath = path.join(process.cwd(), "data", "users.json");

  // 파일 내용을 문자열로 읽은 후, JSON 배열로 파싱
  const fileData = await fs.readFile(filePath, "utf-8");
  const users: User[] = JSON.parse(fileData);

  // 이미 같은 이메일로 가입된 사용자가 있는지 확인
  const exists = users.some((user) => user.email === email);
  if (exists) {
    // 중복된 이메일이면 409 Conflict 상태코드와 함께 응답
    return NextResponse.json({ message: "사용중인 이메일입니다." }, { status: 409 });
  }

  // 새 사용자 객체 생성 (id는 현재 시간의 타임스탬프 사용)
  const newUser: User = {
    id: Date.now(),
    name,
    email,
    password,
  };

  // 기존 사용자 목록에 새 사용자 추가
  users.push(newUser);

  // 수정된 사용자 목록을 다시 JSON 파일로 저장 (들여쓰기: 2칸)
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));

  // 성공 응답 반환 (201 Created)
  return NextResponse.json({ message: "회원가입 완료!" }, { status: 201 });
}
