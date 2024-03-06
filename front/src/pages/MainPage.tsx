import styled from "styled-components";
import { Link } from "react-router-dom";
import palette from "../styles/palette";
import { MouseEvent } from "react";
import axios from "axios";
import { test } from "../apis/LoginApi";

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
`;

const Button = styled.button`
  padding: 0.8rem 5rem;
  color: white;
  background-color: ${palette.btnBlue};
  border: none;
  border-radius: 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;

  margin-top: 6rem;
  cursor: pointer;
`;

async function handleTestBtnClick(e: MouseEvent<HTMLButtonElement>) {
  e.preventDefault();
  console.log(test());
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
