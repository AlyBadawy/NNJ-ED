import React from "react";
import { Container } from "react-bootstrap";
const CenterContainer = ({ children }) => {
  return (
    <Container className="d-flex align-items-center justify-content-center app-container">
      {children}
    </Container>
  );
};

export default CenterContainer;
