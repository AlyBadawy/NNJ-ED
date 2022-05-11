import React from "react";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { useAuth } from "../../Contexts/AuthContext";

const SignUp = () => {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const passwordConfRef = React.useRef();
  const callSignRef = React.useRef();

  const { signUp, currentUser } = useAuth();

  const [error, setError] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const submitHandler = (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    setError(null);
    if (passwordRef.current.value !== passwordConfRef.current.value) {
      setError("Password confirmation doesn't match password");
      return;
    }
    signUp(
      emailRef.current.value,
      passwordRef.current.value,
      callSignRef.current.value
    )
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form onSubmit={submitHandler}>
            {!!error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mt-4">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                id="email"
                type="email"
                required
                placeholder="iLove@nnj-ed.org"
                ref={emailRef}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                id="password"
                type="password"
                required
                ref={passwordRef}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label htmlFor="password_confirmation">
                Password Confirmation
              </Form.Label>
              <Form.Control
                id="password_confirmation"
                type="password"
                required
                ref={passwordConfRef}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label htmlFor="callsign">Callsign:</Form.Label>
              <Form.Control
                id="callsign"
                type="text"
                required
                ref={callSignRef}
              ></Form.Control>
            </Form.Group>
            {!isLoading && (
              <Button className="w-100 mt-4" type="submit">
                Sign up!
              </Button>
            )}
            {isLoading && (
              <>
                <Button variant="primary" className="w-100 mt-4" disabled>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span> Loading...</span>
                </Button>
              </>
            )}
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? Log In
      </div>
      {!!currentUser && currentUser.displayName}
    </>
  );
};

export default SignUp;
