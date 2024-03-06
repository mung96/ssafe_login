import styled from "styled-components";
import palette from "../../styles/palette";

export const HeaderBlock = styled.header`
  border-bottom: 1px gray solid;

  width: 100%;
  height: 4.2rem;
  line-height: 1rem;

  display: flex;
  justify-content: space-between;
  padding: 1.6rem 1.2rem;
`;
export const Div = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Logo = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  padding: 0 1.2rem;
`;

export const Version = styled.span`
  padding: 0 0.7rem;
  height: 2rem;
  line-height: 2rem;

  position: relative;
  bottom: 0.5rem;
  background-color: ${palette.backGray};
  color: ${palette.fontGray};

  border-radius: 1rem;
`;

export const SubTitle = styled.span`
  padding: 0 0.7rem;
  height: 2rem;
  line-height: 2rem;

  position: relative;
  bottom: 0.5rem;

  color: ${palette.fontBlue};
  background-color: ${palette.backBlue};

  border-radius: 1rem;
`;

export const Button = styled.button`
  color: white;
  background-color: black;

  padding: 0 1.5rem;
  height: 2.5rem;
  line-height: 2.5rem;

  position: relative;
  bottom: 0.8rem;

  border-radius: 0.3rem;
`;
