import styled, { css } from "styled-components";
import palette from "../../styles/palette";

interface ButtonProps {
  active?: boolean;
}

export const Button = styled.button<ButtonProps>`
  width: 85%;
  height: 3 rem;
  padding: 0.8rem 0.8rem;

  border-radius: 2rem;
  border: none;

  background-color: ${(ButtonProps) => (ButtonProps.active ? palette.btnBlue : palette.backGray)};
  color: white;

  font-weight: 700;
  font-size: 1.4rem;

  cursor: pointer;
`;
