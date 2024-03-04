import { LoginFormBlock, InputGroup, Button } from "./LoginForm.element";
import openEye from "../../assets/openeye.svg";
import closeEye from "../../assets/closeeye.svg";
import { ChangeEvent, useState, MouseEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const [isLogin, setIsLogin] = useState(true);
  async function handleLoginBtnClick(e: MouseEvent) {
    e.preventDefault();
    await axios
      .post("http://localhost:8000/auth/login", {
        email: email,
        pw: password,
      })
      .then((res) => {
        localStorage.setItem("refresh_token", res.data.refreshToken);
        localStorage.setItem("access_token", res.data.accessToken);
        navigator("/");
      })
      .catch((err) => {
        setIsLogin(false);
      });
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
      <span>{!isLogin && "이메일 또는 비밀번호가 올바르지 않습니다."}</span>
      <Button onClick={handleLoginBtnClick}>로그인</Button>
    </LoginFormBlock>
  );
};
