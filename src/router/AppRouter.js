import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../components/auth/routes/AuthRoutes";
import { TodoRoutes } from "../components/Todo/routes/TodoRoutes";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { CheckingAuth } from "../ui/CheckingAuth";

export const AppRouter = () => {
  const status = useCheckAuth();

  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<TodoRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
