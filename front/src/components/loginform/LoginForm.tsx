import { LoginFormBlock, InputGroup, Button } from "./LoginForm.element";
import openEye from "../../assets/openeye.svg";
import closeEye from "../../assets/closeeye.svg";
import { ChangeEvent, useState, MouseEvent } from "react";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "../../apis/AuthApi";
import { LoginErrorMsg } from "./LoginErrorMsg";
export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const navigator = useNavigate();
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handlePasswordVisibleClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const [errorMsg, setErrorMsg] = useState("");
  const decideErrorMsg = (error: AxiosError) => {
    const status = error.response?.status;
    if (status === 400) {
      setErrorMsg(LoginErrorMsg[400]);
    }
    if (status === 406) {
      setErrorMsg(LoginErrorMsg[406]);
    }
    if (status === 500) {
      setErrorMsg(LoginErrorMsg[500]);
    }
  };
  const storeToken = (response: AxiosResponse) => {
    localStorage.setItem("refresh_token", response.data.refreshToken);
    localStorage.setItem("access_token", response.data.accessToken);
  };
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

  return (
    <LoginFormBlock>
      <InputGroup>
        <label htmlFor="email">이메일</label>
        <input
          name="email"
          placeholder="ssafe11@gmail.com"
          onChange={handleEmailChange}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="password">비밀번호</label>
        <input
          name="password"
          placeholder="비밀번호를 입력하세요."
          type={isPasswordVisible ? "text" : "password"}
          onChange={handlePasswordChange}
        />
        <img
          src={isPasswordVisible ? openEye : closeEye}
          onClick={handlePasswordVisibleClick}
          alt=""
        />
      </InputGroup>
      <span>{errorMsg}</span>
      <Button onClick={handleLoginBtnClick}>로그인</Button>
    </LoginFormBlock>
  );
};
