import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "../HomePage/HomePage";
import SignUp from "../sessions/SignUp";
import LogIn from "../sessions/LogIn";
import { useAuth } from "../../Contexts/AuthContext";

import "./app.sass";

function App() {
  const { currentUser } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        {!!currentUser && (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
        {!currentUser && (
          <>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
