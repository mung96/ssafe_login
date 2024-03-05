import bcrypt from "bcrypt"; // 단방향 암호화
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { clientError, serverError } from "../errors/errorHandling.js";
import {
  addUser,
  findUser,
  saveRefreshToken,
  compareRefreshToken,
} from "../models/auth.js";
dotenv.config();

/**
 * 회원가입 컨트롤러
 */
const signupController = async (req, res) => {
  const { email, pw } = req.body;
  const encryptedPw = bcrypt.hashSync(pw, 10).toString();
  const signupInfo = [email, encryptedPw];

  try {
    await findUser(signupInfo, (user, err) => {
      if (err) {
        if (err.status == 400) {
          throw new serverError("이미 존재하는 이메일입니다.", 400);
        }
        throw new serverError(err, 400);
      }
      if (user && user.length > 0) {
        throw new serverError("이미 존재하는 이메일입니다.", 400);
      }
    });
    await addUser(signupInfo, (_, err) => {
      if (err) throw new serverError("db에 오류가 있습니다.", 500);
    });
    res.send({ message: "회원가입에 성공했습니다" });
  } catch (err) {
    console.error(err);
    res.status(err.status).json({ message: err.message });
  }
};

/**
 * 로그인 컨트롤러
 */
const loginController = async (req, res) => {
  const { email, pw } = req.body;

  await findUser([email], (user, err) => {
    try {
      if (err) throw new serverError("db에 오류가 있습니다.", 500);
      if (user.length > 0) {
        let same = bcrypt.compareSync(pw, user[0].pw.toString()); // 패스워드 비교값
        if (!same) throw new clientError("패스워드가 일치하지 않습니다.", 406);

        const refreshToken = jwt.sign({}, process.env.SECRET_KEY, {
          expiresIn: "10m",
        });
        const accessToken = jwt.sign({ email, pw }, process.env.SECRET_KEY, {
          expiresIn: "5m",
        });
        const tokenInfo = [refreshToken, email];
        saveRefreshToken(tokenInfo, (_, err) => {
          if (err) throw new serverError("db에 오류가 있습니다.", 500);
        });
        res.send({ accessToken, refreshToken, userInfo: { email } });
      } else {
        throw new clientError("존재하지 않는 유저입니다.", 406);
      }
    } catch (err) {
      console.error(err);
      res.status(err.status).json({ message: err.message });
    }
  });
};

const testController = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      throw new clientError("accessToken값이 없습니다.", 401);
    if (!req.headers["refresh-token"])
      throw new clientError("refreshToken값이 없습니다.", 401);
    const accessToken = req.headers.authorization.split("Bearer ")[1];
    const refreshToken = req.headers["refresh-token"];

    try {
      jwt.verify(accessToken, process.env.SECRET_KEY);
      res.send({ message: "권한이 확인되었습니다." });
    } catch (err) {
      try {
        const user = jwt.decode(accessToken, process.env.SECRET_KEY);
        jwt.verify(refreshToken, process.env.SECRET_KEY);
        compareRefreshToken([user && user.email], (token, err) => {
          if (err) throw new serverError("db에 오류가 있습니다.", 500);
          if ((token && token[0].refresh_token) === refreshToken) {
            const accessToken = jwt.sign(
              { email: user.email, pw: user.pw },
              process.env.SECRET_KEY,
              {
                expiresIn: "5m",
              }
            );
            res.send({
              accessToken,
              message:
                "refreshToken을 통해 권한이 확인되었고 accessToken이 재발급되었습니다.",
            });
          } else {
            throw new serverError("db에 오류가 있습니다.", 500);
          }
        });
      } catch (err) {
        if (err.message === "invalid token") {
          throw new serverError("유효하지 않은 토큰입니다.", 403);
        }
        res.status(err.status).json({ message: err.message });
      }
    }
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

export { signupController, loginController, testController };
