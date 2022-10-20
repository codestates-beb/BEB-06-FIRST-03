import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./Header";
import Sidebar from "./Sidebar";
//import Footer from "./Footer";

import Main from "./pages/Main";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Mypage from "./pages/Mypage";
import Mint from "./pages/Mint";
import Trade from "./pages/Trade";
import Empty from "./pages/Empty";

//import axios from "axios";
import { initialState } from './dummy/dummy';
import styled from "styled-components";
import './App.css';

const Center = styled.div`
  height: 92vh;
  display: flex;
  flex-direction: row;
`

function App() {

  const [items, setItems] = useState(initialState.items);
  const [search, setSearch] = useState("노른자 분리기");
  const [ walletAccount, setAccount] = useState('');

  const connetWallet = (account) => {
    setAccount(account);
  }
  /**검색 결과를 search state에 적용 */
  const inputSearch= (str)=>{
    setSearch(str);
  }

  //const navigate = useNavigate();

  return (
    <div>
      <Header connetWallet={connetWallet} inputSearch={inputSearch} />{/*로고 등*/}
      
      {/*
      /  : Main page
      /search : NFT조회 페이지 컴포넌트
      /detail :  nft 상세페이지
      /mypage : 마이페이지 컴포넌트
      /mint : 민트 페이지 컴포넌트
      /trade : 거래 페이지 컴포넌트
      * : emptyPage 컴포넌트*/}
      <Center>
      <Sidebar />{/*차트 넣기*/}
      <Routes>
        <Route path="/" element={<Main  />} />
        <Route path="/search" element={<Search items={items} search={search}/>} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mint" element={<Mint />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="*" element={<Empty />} />
      </Routes>
      </Center>
      {/*<Footer />깃헙 페이지 홈정보*/}

    
    </div>
  );
}

export default App;
