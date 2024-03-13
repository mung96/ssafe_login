import { ChangeEvent, useState } from "react";

export const useInput = () => {
  const [inputValue, setInputValue] = useState("");

  const handleChage = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return [inputValue, handleChage] as const;
};
