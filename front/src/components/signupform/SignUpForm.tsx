import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { SignUpFormBlock, InputGroup } from "./SignUpForm.element";
import { Button } from "../common/Button";
import { checkEmail, checkPassword } from "../../utils/validator";
import { useNavigate } from "react-router-dom";
import openEye from "../../assets/openeye.svg";
import closeEye from "../../assets/closeeye.svg";
import { isAxiosError } from "axios";
import { signup } from "../../apis/AuthApi";

export const SignUpForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isPasswordConfirmValid, setIsPasswordConfirmValid] = useState(false);
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
    useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    updateEmailValid(newEmail);
  };

  const updateEmailValid = (newEmail: string) => {
    if (!checkEmail(newEmail)) setIsEmailValid(false);
    if (checkEmail(newEmail) || !newEmail) setIsEmailValid(true);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    updatePasswordValid(newPassword);
    updatePasswordConfirmValid(newPassword, passwordConfirm);
  };

  const updatePasswordValid = (newPassword: string) => {
    if (!checkPassword(newPassword)) setIsPasswordValid(false);
    if (checkPassword(newPassword) || !newPassword) setIsPasswordValid(true);
  };

  const handlePasswordVisibleClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handlePasswordConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPasswordConfirm = e.target.value;
    setPasswordConfirm(newPasswordConfirm);
    updatePasswordConfirmValid(password, newPasswordConfirm);
  };
  const updatePasswordConfirmValid = (
    _password: string,
    _passwordConfirm: string
  ) => {
    if (_password !== _passwordConfirm) setIsPasswordConfirmValid(false);
    if (_password === _passwordConfirm || !_passwordConfirm)
      setIsPasswordConfirmValid(true);
  };

  const handlePasswordConfirmVisibleClick = () => {
    setIsPasswordConfirmVisible(!isPasswordConfirmVisible);
  };

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

  async function handleBtnClick(e: MouseEvent) {
    e.preventDefault();
    if (isActive) {
      try {
        const response = await signup(email, password, passwordConfirm);
        if (response.status === 200) {
          alert("회원가입을 축하합니다.");
          navigate("/");
        }
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 500) {
          alert("서버에 문제가 있습니다.");
        }
      }
    }
    if (!isActive) {
      alert("아직 입력하지 않은 정보가 있어요.");
    }
  }

  return (
    <SignUpFormBlock>
      <InputGroup>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          name="email"
          placeholder="ssafe11@gmail.com"
          onChange={handleEmailChange}
        />
        <span>
          {email && !isEmailValid && "유효하지 않은 이메일 형식입니다."}
        </span>
      </InputGroup>
      <InputGroup>
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          name="password"
          placeholder="비밀번호를 입력하세요."
          type={isPasswordVisible ? "text" : "password"}
          onChange={handlePasswordChange}
        />
        <img
          src={isPasswordVisible ? openEye : closeEye}
          onClick={handlePasswordVisibleClick}
          alt="visible"
        />
        <span>
          {password && !isPasswordValid && "유효하지 않은 비밀번호 형식입니다."}
        </span>
      </InputGroup>
      <InputGroup>
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input
          id="passwordConfirm"
          name="passwordConfirm"
          placeholder="비밀번호를 다시 입력해주세요."
          type={isPasswordConfirmVisible ? "text" : "password"}
          onChange={handlePasswordConfirmChange}
        />
        <img
          src={isPasswordConfirmVisible ? openEye : closeEye}
          onClick={handlePasswordConfirmVisibleClick}
          alt="visible"
        />
        <span>
          {passwordConfirm &&
            !isPasswordConfirmValid &&
            "비밀번호가 일치하지 않습니다."}
        </span>
      </InputGroup>
      <Button active={isActive} onClick={handleBtnClick}>
        회원가입
      </Button>
    </SignUpFormBlock>
  );
};
