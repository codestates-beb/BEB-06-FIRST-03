import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Web3 from 'web3';

// TODO - 해더에 로고를 넣고 mint,mypage,지갑 버튼을 넣습니다.

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

//import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = ({ walletAccount, connectWallet, searchNft ,selectNft }) => {
  
  const navigate = useNavigate();

  const [ web, setWeb3 ] = useState();
  const [ inputData, setInputdata ] = useState(walletAccount);
  
  /**최초 랜더링시 지갑과 연결합니다.*/
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

  const opentWallet = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    connectWallet(accounts[0]);
    setInputdata(accounts[0]);
  }

  const getNft = async () =>{
    const options = {
      method: 'GET',
      url: `https://testnets-api.opensea.io/api/v1/assets?owner=${inputData}&order_direction=desc&offset=0&limit=20&include_orders=false`
    }
    axios.request(options)
      .then((res) => {
        searchNft(res.data.assets);
      })
      .catch((err) =>  {
        if(err.name==='AxiosError'){
          alert('   It\'s not address\nplease enter address(ex:0x123456789...)');
        }
      });
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
            placeholder="0x00"
            value={inputData}
            className="me-2"
            aria-label="Search"
            onChange={(e)=>{setInputdata(e.target.value)}}
            />
          <Button 
            variant="outline-success"
            onClick={() => getNft()}>
            Search
           </Button>
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
                  onClick={() => {opentWallet()}}>
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