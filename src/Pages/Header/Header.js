import { useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { LogOut } from "react-feather";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

function Header({ token, logout }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="primary" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand style={{ color: "white" }}>
            <h4>Todo List</h4>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Button variant="secondary" onClick={() => handleShow()}>
                <LogOut />
              </Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="text-center">
          <Modal.Title>Logout</Modal.Title>
          <p>Are you sure you want to logout?</p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            style={{ width: "130px" }}
            variant="secondary"
            onClick={handleClose}
          >
            No
          </Button>
          <Button
            style={{ width: "130px" }}
            variant="primary"
            onClick={() => {
              logout(token);
              handleClose();
              navigate("/");
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Header;
