import { Navigate, Route, Routes } from "react-router-dom"
import { TodoScreen } from "../../Todo/TodoScreen"
import { JournalScreen } from "../JournalScreen"


export const JournalRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <TodoScreen /> } />

        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )
}
