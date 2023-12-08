import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
class Inicio extends Component {
  render() {
    return (
      <div>
        <Navbar expand="lg" variant="dark" bg="dark">
          <Container fluid>
            <Navbar.Brand href="#home">AgilePulseManager</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/inicio">Inicio</Nav.Link>
                <Nav.Link href="/calendario">Calendario</Nav.Link>
                <NavDropdown title="Paneles" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/panel">Board</NavDropdown.Item>
                  <NavDropdown.Item href="/sprints">Sprints</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <Nav.Link href="/">                  
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-white" />                  
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="contenedor-principal">
        </div>
      </div>
    );
  }
}

export default Inicio;
