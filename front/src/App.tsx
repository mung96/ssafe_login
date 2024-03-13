import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
import ProtectedRouter from "./routes/ProtectedRouter";
import { Header } from "./components/header/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* 로그인 상관없음 */}
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/*로그인 유저만 접근가능  */}
        <Route element={<ProtectedRouter />}>
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
