import styled from "styled-components";
import { Link } from "react-router-dom";
import palette from "../styles/palette";
import { MouseEvent } from "react";
import axios, { isAxiosError } from "axios";
import { test } from "../apis/AuthApi";

const Container = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const SubTitle = styled.span``;
const Title = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 2.5rem;
  font-weight: 700;

  margin-top: 1rem;
`;
const Descript = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 1rem;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
  gap: 3rem;

  a {
    width: 100%;
  }
`;

const Button = styled.button`
  padding: 0.8rem 5rem;
  color: white;
  background-color: ${palette.btnBlue};
  border: none;
  border-radius: 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  width: 100%;

  cursor: pointer;
`;

async function handleTestBtnClick(e: MouseEvent<HTMLButtonElement>) {
  e.preventDefault();
  try {
    const response = await test();
    if (response.status === 200) {
      alert("토큰이 제대로 발급됐습니다.");
    }
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        alert("헤더에 accessToken or refreshToken이 없습니다.");
      }
      if (error.response?.status === 403) {
        alert("accessToken과 refreshToken 모두 만료됐습니다.");
      }
      if (error.response?.status === 500) {
        alert("서버에러");
      }
    }
  }
}

const MainPage = () => {
  return (
    <Container>
      <SubTitle>데이터 수집을 위한 올인원 툴</SubTitle>
      <Title>
        <span>폼을 만들고 분석하는</span>
        <span>가장 합리적인 방법</span>
      </Title>

      <Descript>
        <span>
          폼의 제작, 응답자 모집, 보상, 분석에 불필요한 시간을 쏟지 마세요.
        </span>
        <span>모든 핵심 과정을 왈라에서 한번에 해결하실 수 있습니다.</span>
      </Descript>

      <ButtonContainer>
        <Link to="/signup">
          <Button>회원가입</Button>
        </Link>
        <Link to="/login">
          <Button>로그인</Button>
        </Link>
        <Button onClick={handleTestBtnClick}>테스트</Button>
      </ButtonContainer>
    </Container>
  );
};

export default MainPage;
