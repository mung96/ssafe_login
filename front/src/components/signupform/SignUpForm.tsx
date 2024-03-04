import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { SignUpFormBlock, InputGroup, Button } from "./SignUpForm.element";
import { checkEmail, checkPassword } from "../../utils/validator";
import { useNavigate } from "react-router-dom";
import openEye from "../../assets/openeye.svg";
import closeEye from "../../assets/closeeye.svg";

export const SignUpForm = () => {
  const navigator = useNavigate();
  //이메일
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
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

  //패스워드
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  useEffect(() => {
    if (!checkPassword(password)) {
      setIsPasswordValid(false);
    }
    if (checkPassword(password) || !password) {
      setIsPasswordValid(true);
    }
  }, [password]);
  const handlePasswordVisibleClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  //패스워드 확인
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isPasswordConfirmValid, setIsPasswordConfirmValid] = useState(false);
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
    useState(false);
  const handlePasswordConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };
  useEffect(() => {
    if (password !== passwordConfirm) {
      setIsPasswordConfirmValid(false);
    }
    if (password === passwordConfirm || !passwordConfirm) {
      setIsPasswordConfirmValid(true);
    }
  }, [password, passwordConfirm]);
  const handlePasswordConfirmVisibleClick = () => {
    setIsPasswordConfirmVisible(!isPasswordConfirmVisible);
  };

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isEmailValid && isPasswordValid && isPasswordConfirmValid) {
      setIsActive(true);
    }
    if (!isEmailValid || !isPasswordValid || !isPasswordConfirmValid) {
      setIsActive(false);
    }
    if (!email || !password || !passwordConfirm) {
      setIsActive(false);
    }
  }, [isEmailValid, isPasswordValid, isPasswordConfirmValid]);

  const handleBtnClick = (e: MouseEvent) => {
    e.preventDefault();
    if (isActive) {
      alert("회원가입을 축하합니다.");
      navigator("/");
    }
    if (!isActive) {
      alert("아직 입력하지 않은 정보가 있어요.");
    }
  };

  return (
    <SignUpFormBlock>
      <InputGroup>
        <label htmlFor="email">이메일</label>
        <input
          name="email"
          placeholder="ssafe11@gmail.com"
          onChange={handleEmailChange}
        />
        <span>{!isEmailValid && "유효하지 않은 이메일 형식입니다."}</span>
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
        <span>{!isPasswordValid && "유효하지 않은 비밀번호 형식입니다."}</span>
      </InputGroup>
      <InputGroup>
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input
          name="passwordConfirm"
          placeholder="비밀번호를 다시 입력해주세요."
          type={isPasswordConfirmVisible ? "text" : "password"}
          onChange={handlePasswordConfirmChange}
        />
        <img
          src={isPasswordConfirmVisible ? openEye : closeEye}
          onClick={handlePasswordConfirmVisibleClick}
          alt=""
        />
        <span>
          {!isPasswordConfirmValid && "비밀번호가 일치하지 않습니다."}
        </span>
      </InputGroup>
      <Button active={isActive} onClick={handleBtnClick}>
        회원가입
      </Button>
    </SignUpFormBlock>
  );
};
