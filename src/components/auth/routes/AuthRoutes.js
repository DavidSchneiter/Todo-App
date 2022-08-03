import { Navigate, Route, Routes } from "react-router-dom";
import { LoginScreen } from "../LoginScreen";
import { RegisterScreen } from "../RegisterScreen";

export const AuthRoutes = () => {
  return (
    <div className="auth__main">
      <div className="auth__box-contaier">
        <Routes>
          <Route path="login" element={<LoginScreen />} />
          <Route path="register" element={<RegisterScreen />} />

          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
      </div>
    </div>
  );
};
