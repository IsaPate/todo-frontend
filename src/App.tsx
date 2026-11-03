import { Routes, Route } from "react-router";
import Boards from "./Board/Boards";
import AddNewBoard from "./Board/AddNewBoard";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import RequireAuth from "./Auth/RequireAuth";

export default function App() {
  return (
    <div className="min-h-screen bg-muted/40">
      {/* Boards */}
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/boards" element={<Boards />} />
          <Route path="/boards/new" element={<AddNewBoard />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
