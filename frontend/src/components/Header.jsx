import { Navbar, NavbarBrand, Container, Nav, NavItem, NavLink } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../hooks/useAuth";

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header>
      <Navbar color="dark" dark expand="md" className="py-4">
        <Container className="d-flex justify-content-between align-items-center">
          <NavbarBrand tag={Link} to="/">
            <img src={logo} alt="Logo" height="40" className="me-2" />
            Feedback App
          </NavbarBrand>

          <Nav className="ms-auto" navbar>
            {!user ? (
              <NavItem>
                <NavLink tag={Link} to="/login" className="text-light">
                  Login
                </NavLink>
              </NavItem>
            ) : (
              <>
                <NavItem>
                  <NavLink tag={Link} to="/admin" className="text-light">
                    Dashboard
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag="span"
                    role="button"
                    onClick={handleLogout}
                    className="text-light ms-3 text-decoration-none"
                    style={{ cursor: 'pointer' }}
                  >
                    Logout
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};