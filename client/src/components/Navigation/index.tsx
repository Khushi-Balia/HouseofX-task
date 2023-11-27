import React, { useContext } from "react";
import { Navbar } from "reactstrap";
import { Link } from "react-router-dom";
import { Container, Nav, NavbarBrand, Button, NavbarText } from "reactstrap";
import UserContext, {initialUserState} from "../../contexts/user";

export interface INavigationProps {}

const Navigation: React.FunctionComponent<INavigationProps> = (props) => {
  const userContext = useContext(UserContext);
  const { user } = userContext.userState;

  const logout = () => {
    userContext.userDispatch({
      type: "logout",
      payload: initialUserState,
    });
  };

  return (
    <Navbar color="dark" sticky="top" expand="md">
    <Container>
        <NavbarBrand tag={Link} to='/'>📝Todo</NavbarBrand>
        <Nav className="mr-auto" navbar></Nav>
        <div>
                 <Button outline tag={Link} to="/edit">
                    <i className="far fa-sticky-note mr-2"></i>
                    Post a Task
                </Button>
                <NavbarText className="ml-2 mr-2">|</NavbarText>
                <Button outline size="sm" onClick={() => logout()}>
                    Logout
                </Button>
            </div>
        
            
            
        
    </Container>
</Navbar>
);
}


export default Navigation;
