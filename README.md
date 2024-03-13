# SSAFE 4차 MISSION: 타입스크립트와 API를 이용한 회원가입&로그인

## 1주차 구현 내용
#### 1️⃣ 회원가입 등록 기능 구현
#### 2️⃣ 로그인 실패시 에러메세지
#### 3️⃣ 로그인 성공시 토큰 로컬스토리지에 저장
#### 4️⃣ 토큰이 없다면 테스트 버튼 눌렀을 때 실패 메세지

## 2주차 구현 내용
#### 1️⃣ Protected Router 적용
#### 2️⃣ 회원가입 Input에 reducer적용
#### 3️⃣ 로그인 Input에 커스텀훅 적용(useInput)

## ✏️ 파일 구조
Folder|File|Description|
|-------|------------|--------------|
|components|Header|모든 페이지 상단에 등장하는 헤더|
|  |SignUpForm| 회원가입 `입력` 과 `유효성 검사`를 담당하는 컴포넌트|
|  |LoginForm| 로그인 기능을 담당하는 컴포넌트|
|  |common/Button| 회원가입, 로그인 페이지에 등장하는 버튼 컴포넌트|
|pages|MainPage| 첫 화면 페이지의 UI| 
|  |SignUpPage| 회원가입 페이지의 UI |
|  |LoginPage| 로그인 페이지의 UI |
|apis|AuthApi|회원가입과 로그인 Api 호출 기능 |
|utils|validator| 이메일과 비밀번호 유효성검사 정규식|


##  ✏️  1주차 주요기능
### 1️⃣ 회원가입 등록 기능 구현
아래 이메일과 비밀번호가 등록된 상태 
- 이메일: `ssafy1234@naver.com`
-  비밀번호: `ssaffe1234**`

### 2️⃣ 로그인 실패시 에러메세지
- 존재하지 않는 이메일 or 패스워드 일치하지 않을 때
- 이메일 , 비밀번호 형식이 틀렸을 떄

https://github.com/SSA-FE/ssafe_login/assets/121214068/416cfe5e-f09f-4cb6-8831-5aed85de96db


### 3️⃣ 로그인 성공시 토큰 로컬스토리지에 저장
  - 로그인에 성공하면 로컬스토리지에 accessToken과 freshToken이 저장됩니다.
  - 로컬스토리지에 토큰이 있다면 `테스트` 버튼 클릭시 성공메세지 출력

https://github.com/SSA-FE/ssafe_login/assets/121214068/931a9256-8154-48ee-bcaf-69cac07f7e27

### 4️⃣ 토큰이 없다면 테스트 버튼 눌렀을 때 실패 메세지

https://github.com/SSA-FE/ssafe_login/assets/121214068/1d168433-efbc-4bd6-9532-74fcadfe1322

