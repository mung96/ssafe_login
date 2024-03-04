import { LoginFormBlock, InputGroup, Button } from "./LoginForm.element";
import openEye from "../../assets/openeye.svg";
import closeEye from "../../assets/closeeye.svg";
import { useState } from "react";

export const LoginForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handlePasswordVisibleClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <LoginFormBlock>
      <InputGroup>
        <label htmlFor="email">이메일</label>
        <input name="email" placeholder="ssafe11@gmail.com" />
        <span></span>
      </InputGroup>
      <InputGroup>
        <label htmlFor="password">비밀번호</label>
        <input name="password" placeholder="비밀번호를 입력하세요." type={isPasswordVisible ? "text" : "password"} />
        <img src={isPasswordVisible ? openEye : closeEye} onClick={handlePasswordVisibleClick} alt="" />
        <span></span>
      </InputGroup>

      <Button>로그인</Button>
    </LoginFormBlock>
  );
};
