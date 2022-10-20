import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Web3 from 'web3';

// TODO - 해더에 로고를 넣고 mint,mypage,지갑 버튼을 넣습니다.

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

//import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = ({ connetWallet, walletAccount, searchNFT  }) => {
  
  const navigate = useNavigate();

  const [ web, setWeb3 ] = useState();
  const [ inputData, setInputdata ] = useState(walletAccount);
  
  //최초 랜더링시 지갑과 연결합니다.
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
    setInputdata(accounts[0]);
  }

  const getNFT = async () =>{
    try {
      const isAdress = inputData.split('0x');
      //10진수(tokenId)를 입력시에 query에 tokenId를 담는다
      const query = (isAdress.length < 2) ? "tokenId" : "address";
      const url = `http://localhost:8080?${query}=${inputData}`
      // const result = await axios.get(url);
      //예상 result = {data: [{tokenId, tokenURI}] }
      if(query === "tokenId"){
        searchNFT("[{ inputData, result.data}]"); //tokenId로 검색하면 tokenURI 하나만 온다
        navigate('/detail');
      } else {
        searchNFT("result.data");
        navigate('/search');
      }
    } catch (err) {
      console.log(err)
      alert("계정 또는 토큰 아이디가 잘못 되었습니다.")
    }   
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
            placeholder="Search"
            value={inputData}
            className="me-2"
            aria-label="Search"
            onChange={(e)=>{setInputdata(e.target.value)}}
            />
          <Button 
            variant="outline-success"
            onClick={() => getNFT()}>
            Search
           </Button>
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