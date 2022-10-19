import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

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
import './App.css';

function App() {

  const navigate = useNavigate();

  return (
    <div className="App">
      <Header />{/*로고 등*/}
      <Sidebar />{/*차트 넣기*/}
      {/*
      /  : Main page
      /search : NFT조회 페이지 컴포넌트
      /detail :  nft 상세페이지
      /mypage : 마이페이지 컴포넌트
      /mint : 민트 페이지 컴포넌트
      /trade : 거래 페이지 컴포넌트
      * : emptyPage 컴포넌트*/}
      <Routes>
        <Route path="/" element={<Main  />} />
        <Route path="/search" element={<Search />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mint" element={<Mint />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="*" element={<Empty />} />
      </Routes>

      {/*<Footer />깃헙 페이지 홈정보*/}

    </div>
  );
}

export default App;
