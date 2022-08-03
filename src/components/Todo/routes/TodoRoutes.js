import { Navigate, Route, Routes } from "react-router-dom";
import { TodoScreen } from "../TodoScreen";

export const TodoRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TodoScreen />} />

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
