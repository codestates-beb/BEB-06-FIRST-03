import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./Header";
import Sidebar from "./Sidebar";
//import Footer from "./Footer";

import Main from "./pages/Main";
import Search from "./pages/Search";
import Detail from "./pages/Detail";

import Mint from "./pages/Mint";

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

  const [items, setItems] = useState(initialState.items); //더미
  const [ walletAccount, setAccount] = useState(''); //현재지갑
  const [ nftGroup, setNftGroup] = useState([]); //가져온 데이터 [{tokenId:1, tokenURI:{ name, image....}}]
  const [selectedNft,setSelectedNft]=useState();//detail에 필요한 선택된 nft저장{tokenId: inputData ,tokenURI:result.data}
  const [search, setSearch] = useState("노른자 분리기");//더미
  
  /**연결된 지갑 주소를 walletAccount state에 적용 */
  const connetWallet = (account) => {
    setAccount(account);
  }

  /**검색 결과를 search state에 적용 */
  const searchNft = (Nfts) => {
    //console.log(Nfts)
    setNftGroup(Nfts);
  }
  /**선택된 단일 nft를 selectedNft state에 적용 */
  const selectNft =(Nft)=>{
    setSelectedNft(Nft);
  }

  const navigate = useNavigate();

  return (
    <div>
      {/*로고 등*/}
      <Header 
        connetWallet={connetWallet} 
        walletAccount={walletAccount} 
        selectNft={selectNft}
        searchNft={searchNft}
      />
    
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
        <Route path="/search" element={<Search nftGroup={nftGroup} selectNft={selectNft} />} />
        <Route path="/detail" element={<Detail selectedNft={selectedNft} walletAccount={walletAccount} />} />
        
        <Route path="/mint" element={<Mint />} />
        
        <Route path="*" element={<Empty />} />
      </Routes>
      </Center>
      {/*<Footer />깃헙 페이지 홈정보*/}

    
    </div>
  );
}

export default App;
