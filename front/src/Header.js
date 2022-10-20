import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

// TODO - 해더에 로고를 넣고 mint,mypage,지갑 버튼을 넣습니다.

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

//import NavDropdown from 'react-bootstrap/NavDropdown';

import { Link } from 'react-router-dom';

const Header = ({ connetWallet }) => {

  const [ web, setWeb3 ] = useState();
  const [ search, inputSearch ] = useState("Search");
  
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
            type="search"
            placeholder={search}
            className="me-2"
            aria-label="Search"
            />
          <Button variant="outline-success">Search</Button>
        </Form>
        </Nav>
          <Nav className="" activeKey="/home">
              <Nav.Item>
                <Nav.Link to='/mint'>Mint</Nav.Link>
              </Nav.Item>
              <Nav.Item>
              <Nav.Link to='/mypage'>Mypage</Nav.Link>
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