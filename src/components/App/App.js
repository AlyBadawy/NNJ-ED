import { Container } from "react-bootstrap";
import { AuthProvider } from "../../Contexts/AuthContext";
import SignUp from "../sessions/SignUp";

import style from "./app.module.sass";

function App() {
  return (
    <AuthProvider>
      <Container
        className={`d-flex align-items-center justify-content-center ${style["app-container"]}`}
      >
        <div className={`w-100 ${style["app-wrapper"]}`}>
          <SignUp />
        </div>
      </Container>
    </AuthProvider>
  );
}

export default App;
