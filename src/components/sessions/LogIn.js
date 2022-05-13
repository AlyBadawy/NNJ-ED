import React from "react";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../Contexts/AuthContext";
import CenterContainer from "../UI/CenterContainer";

const LogIn = () => {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const { logIn } = useAuth();

  const [error, setError] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const nav = useNavigate();

  const submitHandler = (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    setError(null);

    logIn(emailRef.current.value, passwordRef.current.value)
      .then((res) => {
        nav("/", { replace: true });
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section>
      <CenterContainer>
        <div class="row gx-lg-5 align-items-center ">
          <div class="col-lg-6 mb-5 mb-lg-0">
            <h1 class="my-5 display-3 fw-bold ls-tight">
              The best offer <br />
              <span class="text-primary">for your business</span>
            </h1>
            <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
              itaque accusantium odio, soluta, corrupti aliquam quibusdam
              tempora at cupiditate quis eum maiores libero veritatis? Dicta
              facilis sint aliquid ipsum atque?
            </p>
          </div>
          <div class="col-lg-6 mb-5 mb-lg-0">
            <Card>
              <Card.Body className="py-5 px-md-5">
                <h2 className="text-center mb-4">Log In</h2>
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
                  {!isLoading && (
                    <Button className="w-100 mt-4" type="submit">
                      Log In!
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
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </CenterContainer>
    </section>
  );
};

export default LogIn;
