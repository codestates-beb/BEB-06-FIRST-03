import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Mint from "./pages/Mint";
import Empty from "./pages/Empty";

import styled from "styled-components";
import './App.css';

const Center = styled.div`
  height: 92vh;
  display: flex;
  flex-direction: row;
`

function App() {

  const [ walletAccount, setAccount] = useState(''); //현재지갑
  const [ nftGroup, setNftGroup] = useState([]); //가져온 데이터 [{tokenId:1, tokenURI:{ name, image....}}]
  const [loading, setloading] = useState(true);

  useEffect(()=> {
    callImage();
  },[]);

  const callImage = () => {
    const options = {
      method: 'GET',
      url: 'https://testnets-api.opensea.io/api/v1/assets?order_by=sale_count&order_direction=desc&offset=0&limit=20&include_orders=false'
    }
    setloading(true);
    axios.request(options)
      .then((res) => {
        searchNft(res.data.assets);
        setloading(false);
      })
      .catch((e) => {
        console.error(e);
        alert("서버와 연결이 원활하지 않습니다.");
      });
      
  }

  /**연결된 지갑 주소를 walletAccount state에 적용 */
  const connectWallet = (account) => {
    setAccount(account);
  }

  /**검색 결과를 search state에 적용 */
  const searchNft = (Nfts) => {
    setNftGroup(Nfts);
  }

  return (
    <div>
      {/*로고 등*/}
      <Header 
        connectWallet={connectWallet}
        walletAccount={walletAccount} 
        searchNft={searchNft}
      />
    
      {/*
          main   page /                 (search)
          detail page /detail/:tokenIdx (transfer)
          mint   page /mint             (mint)
          empty  page /*                (error handling)
      */}
      
      <Center>
        {/* Coingecko 차트*/}
        <Sidebar />
        <Routes>
          <Route path="/" element={
            <Main 
              searchNft={searchNft}
              nftGroup={nftGroup}
              loading={loading}
            />} 
          />
          <Route path="/detail/:tokenIdx" element={
            <Detail 
              walletAccount={walletAccount} 
              nftGroup={nftGroup}
            />} 
          />
          <Route path="/mint" element={
            <Mint 
              nftGroup={nftGroup}
            />} 
          />
          <Route path="*" element={<Empty />} />
        </Routes>
      {/* OpenSee 깃헙 페이지 홈정보 */}
      <Footer searchNft={searchNft} />
      </Center>
    </div>
  );
}

export default App;
