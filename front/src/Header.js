import React, { useEffect, useState } from 'react';
import { useNavigate} from "react-router-dom";
import Web3 from 'web3';

// TODO - 해더에 로고를 넣고 mint,mypage,지갑 버튼을 넣습니다.

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

//import NavDropdown from 'react-bootstrap/NavDropdown';

import { Link } from 'react-router-dom';

const Header = ({ connetWallet ,inputSearch}) => {

  const [ web, setWeb3 ] = useState();
  const [ input, setInput ] = useState("");
  const navigate = useNavigate();

  const handleButtonClick = (event) => {
    
    inputSearch(input);
    navigate("/search");
  };

  const handleChangeInput = (event) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    if (typeof Window.ethereum !== "undefind") {
      try {
        const web = new Web3(window.ethereum);
        setWeb3(web);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const conneectWallet = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    connetWallet(accounts[0]);
    inputSearch(accounts[0]);
  }


  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">OpenSee</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Form className="d-flex">
            <Form.Control
            value={input}
            onChange={handleChangeInput}
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            />
          <Button variant="outline-success" onClick={handleButtonClick} >Search</Button>
        </Form>
        </Nav>
          <Nav className="" activeKey="/home">
              <Nav.Item>
                <Nav.Link onClick={() => navigate("/mint")}>Mint</Nav.Link>
              </Nav.Item>
              <Nav.Item>
              <Nav.Link onClick={() => navigate("/mypage")}>Mypage</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  eventKey="link-2" 
                  onClick={() => conneectWallet()}>
                  Wallet
                </Nav.Link>
              </Nav.Item>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;