# SSAFE 4차 MISSION: 타입스크립트와 API를 이용한 회원가입&로그인

##  ✏️  주요기능

# 2차 PR Refactoring 내용
1. Protected Router 적용
2. Input 필드에 reducer적용


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

## ✏️ 파일 구조
⭐️: 이번주에 추가된 파일
Folder|File|Description|
|-------|------------|--------------|
|components|Header|모든 페이지 상단에 등장하는 헤더|
|  |SignUpForm| 회원가입 `입력` 과 `유효성 검사`를 담당하는 컴포넌트|
|  |LoginForm ⭐️| 로그인 기능을 담당하는 컴포넌트|
|  |common/Button| 회원가입, 로그인 페이지에 등장하는 버튼 컴포넌트|
|pages|MainPage| 첫 화면 페이지의 UI| 
|  |SignUpPage| 회원가입 페이지의 UI |
|  |LoginPage ⭐️| 로그인 페이지의 UI |
|apis|AuthApi ⭐️|회원가입과 로그인 Api 호출 기능 |
|utils|validator| 이메일과 비밀번호 유효성검사 정규식|

##  ✏️구현 방법
### 1️⃣ Api 호출 구현
  ✅  `AuthApi.tsx` 에서 axios.create()를 이용해 baseURL 지정

```javascript
//AuthApi.tsx L3 부분
const AuthApi = axios.create({
  baseURL: "http://localhost:8000/auth",
});
```

✅  `signup` `login` `test` 함수를 작성 => 각각 회원가입, 로그인, 테스트 관련 API 호출을 담당

```javascript
//AuthApi.tsx L20 부분
export const login = (email: string, password: string) => {
  const response = AuthApi.post("/login", {
    email: email,
    pw: password,
  });
  return response;
};
```

✅   성공, 실패 처리는 각 Form에서 처리 (SignUpForm, LoginForm, MainPage)

```javascript
// LoginForm.tsx L44부분
async function handleLoginBtnClick(e: MouseEvent) {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response.status === 200) {
        storeToken(response);
        navigator("/");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        decideErrorMsg(error);
      }
    }
  }
```

### 2️⃣ `SignUpForm.tsx` useEffect없이 유효성검사 (지난 주 피드백 내용) 

#### 변경 전
 ```javascript
const [email, setEmail] = useState("");
const [isEmailValid, setIsEmailValid] = useState(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  useEffect(() => {
    if (!checkEmail(email)) {
      setIsEmailValid(false);
    }
    if (checkEmail(email) || !email) {
      setIsEmailValid(true);
    }
  }, [email]);
``` 
#### 변경 후

```javascript
//SignUpForm L13부분
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    updateEmailValid(newEmail);
  };
  const updateEmailValid = (newEmail: string) => {
    if (!checkEmail(newEmail)) setIsEmailValid(false);
    if (checkEmail(newEmail) || !newEmail) setIsEmailValid(true);
  };
```

### 3️⃣ 타입스크립트 마이그레이션 (❓❓ 이렇게 3개만 하면 마이그레이션 끝나는건가 ❓❓)
✅  tsconfig.json 설정
✅  파일명 jsx -> tsx로 변경
✅  타입 지정



## API 명세서
1. 회원가입

- `POST` http://localhost:8000/auth/signup
- Request fields : email(이메일), pw(비밀번호), comparePw(비밀번호 확인)

2. 로그인

- `POST` http://localhost:8000/auth/login
- Request fields : email, pw
- Response fields : accessToken, refreshToken, userInfo

3. 로그인 여부 권한 테스트

- `GET` http://localhost:8000/auth/test
- **Request headers**

  | Name          | Description             |
  | ------------- | ----------------------- |
  | Authorization  | **Bearer** access-token |
  | refresh-token | refreshToken            |

  - Authorization 헤더에 access-token을 포함할 때 Bearer을 꼭 붙여주세요!


