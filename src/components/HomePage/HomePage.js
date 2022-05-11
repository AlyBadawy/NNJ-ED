import React from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import CenterContainer from "../UI/CenterContainer";

const HomePage = () => {
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const { currentUser, logOut } = useAuth();
  const nav = useNavigate();

  const logOutHandler = (evt) => {
    evt.preventDefault();
    setError(null);
    setIsLoading(true);
    logOut()
      .then((res) => {
        nav("/login", { replace: true });
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
    logOut();
  };
  return (
    <CenterContainer>
      <div className="w-100 app-wrapper">
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {!!error && <Alert variant="danger">{error}</Alert>}
            <p>
              <strong>Email: </strong>
              {currentUser.email}
            </p>
            <p>
              <strong>Callsign: </strong>
              {currentUser.displayName}
            </p>
            <Link to="/profile" className="btn btn-primary w-100 mt-3">
              Update Profile
            </Link>
          </Card.Body>
        </Card>
        <Button onClick={logOutHandler} className="mt-4" variant="danger">
          Log Out
        </Button>
      </div>
    </CenterContainer>
  );
};

export default HomePage;
