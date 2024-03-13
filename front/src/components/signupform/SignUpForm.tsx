import {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useState,
  useReducer,
} from "react";
import { SignUpFormBlock, InputGroup } from "./SignUpForm.element";
import { Button } from "../common/Button";
import { checkEmail, checkPassword } from "../../utils/validator";
import { useNavigate } from "react-router-dom";
import openEye from "../../assets/openeye.svg";
import closeEye from "../../assets/closeeye.svg";
import { isAxiosError } from "axios";
import { signup } from "../../apis/AuthApi";
interface fieldActionType {
  name: string;
  value: string;
}
interface fieldStateType {
  email: string;
  password: string;
  passwordConfirm: string;
}
const fieldReducer = (state: fieldStateType, action: fieldActionType) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

export const SignUpForm = () => {
  const navigate = useNavigate();
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmValid, setIsPasswordConfirmValid] = useState(false);
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
    useState(false);
  const [isActive, setIsActive] = useState(false);

  const [fieldState, fieldDispatch] = useReducer(fieldReducer, {
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { email, password, passwordConfirm } = fieldState;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    fieldDispatch({
      name,
      value,
    });
    // 여기도 뭔가 줄일 수 있을것 같은데...못하겠네...
    if (name === "email") {
      updateEmailValid(value);
    }
    if (name === "password") {
      updatePasswordValid(value);
      updatePasswordConfirmValid(value, passwordConfirm);
    }
    if (name === "passwordConfirm") {
      updatePasswordConfirmValid(password, value);
    }
  };

  const updateEmailValid = (newEmail: string) => {
    if (!checkEmail(newEmail)) setIsEmailValid(false);
    if (checkEmail(newEmail) || !newEmail) setIsEmailValid(true);
  };

  const updatePasswordValid = (newPassword: string) => {
    if (!checkPassword(newPassword)) setIsPasswordValid(false);
    if (checkPassword(newPassword) || !newPassword) setIsPasswordValid(true);
  };

  const handlePasswordVisibleClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
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
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
