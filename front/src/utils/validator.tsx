export const checkPassword = (password: string) => {
  const regExp = /(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,16}$)/;
  //비밀번호는 8자 이상 16자 이하의 문자열로
  //하나 이상의 영문자와 하나 이상의 숫자,
  //하나 이상의 특수문자
  return regExp.test(password);
};

export const checkEmail = (email: string) => {
  const regExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[comA-Z]{2,3}$/;

  return regExp.test(email);
};
