import { Navbar, NavbarBrand, Container } from "reactstrap";
import logo from "../assets/logo.png";

export const Header = () => {
  return (
    <Navbar color="dark" className="py-4" dark expand="md">
      <Container>
        <NavbarBrand href="/">
          <img src={logo} alt="Logo" height="40" className="me-2" />
          Feedback App
        </NavbarBrand>
      </Container>
    </Navbar>
  );
};