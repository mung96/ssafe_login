import { SignUpForm } from "../components/signupform/SignUpForm";
import styled from "styled-components";

const SignUpTemplate = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;

  justify-content: center;
  align-items: center;
  gap: 5rem;
`;
const Title = styled.span`
  width: 30rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  font-size: 2.5rem;
  font-weight: 700;
`;

const SignUpPage = () => {
  return (
    <SignUpTemplate>
      <Title>
        <span>더 쉬운 폼을 위한 시작</span>
        <span>폼나는싸패</span>
      </Title>
      <SignUpForm />
    </SignUpTemplate>
  );
};

export default SignUpPage;
