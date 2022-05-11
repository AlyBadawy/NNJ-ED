import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "../../Contexts/AuthContext";
import HomePage from "../HomePage/HomePage";
import SignUp from "../sessions/SignUp";
import LogIn from "../sessions/LogIn";

import "./app.sass";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
