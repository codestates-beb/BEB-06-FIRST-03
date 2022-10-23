import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate} from "react-router-dom";
import Web3 from 'web3';

// TODO - 해더에 로고를 넣고 mint,mypage,지갑 버튼을 넣습니다.

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

//import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = ({ connetWallet, walletAccount, searchNft ,selectNft }) => {
  
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
  /**지갑 연결합니다.*/
  const connectWallet = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    connetWallet(accounts[0]);
    setInputdata(accounts[0]);
  }
  /** http://localhost:8080?${query}=${inputData} 로 get요청을 보내 nftgoup 또는 selectednft를 성정합니다.*/
  const getNft = async () =>{
    try {
      const isAddress = inputData.slice(0,2);
      //10진수(tokenId)를 입력시에 query에 tokenId를 담는다
      const query = (isAddress!=="0x") ? "tokenId" : "address";
      const url = `http://localhost:8080/search?${query}=${inputData}`
      // http://localhost:8080/search?address=0x3AD254289688001fB5a427121AAf0bf77000e6D7
      const dum = await axios({
        method: "get",
        url: url,
        headers: {
          accept: "application/json",
        },
        withCredentials: true,
      });
      console.log(dum.data.data);
      if(query === "tokenId"){
        
        let result = {data:{"name":"첫번쨰 그림","description":"이건 첫번째임","image":"../images/egg.png","attributes":[{"background":"cyan"},{"chair":"lightwood"}]}};//search(tokenId)임시 더미 응답
        selectNft({tokenId: inputData ,tokenURI:result.data}); //tokenId로 검색하면 tokenURI 하나만 온다
        navigate('/detail');
      } else {
        let result = {data: [{tokenId:0, tokenURI:{"name":"첫번쨰 그림","description":"이건 첫번째임","image":"../images/egg.png","attributes":[{"background":"cyan"},{"chair":"lightwood"}]}},{tokenId:1, tokenURI:{"name":"두번쨰 그림","description":"이건 두번째임","image":"../images/egg.png","attributes":[{"background":"cyan"},{"chair":"lightwood"}]}},{tokenId:2, tokenURI:{"name":"세번쨰 그림","description":"이건 세번째임","image":"../images/egg.png","attributes":[{"background":"cyan"},{"chair":"lightwood"}]}}] };//search(address)임시 더미 응답
        searchNft(result.data);
        navigate('/search');
      }
    } catch (err) {
      if(err.response.data.message==="invalid address"){
        alert("없는 지갑계정 입니다.");
      }else if(err.response.data.message==="invalid tokenId"){
        alert("잘못된 tokenId입니다.")
      }else{
        alert("계정 또는 토큰 아이디가 잘못 되었습니다.");
      }
      
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
                  onClick={() => connectWallet()}>
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