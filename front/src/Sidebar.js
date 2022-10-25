import React from 'react';
import styled from "styled-components";
import "./App.css";

const Side = styled.div`
  display: flex;
  border-right: 1px solid #e0e0e0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10%;
`
const Sidebar = () => {
  return (
    <div className='sideCoingecko'>
      <Side>
        {/* TODO : About 메뉴 아이콘과 Mypage 메뉴 아이콘을 작성하고 Link 컴포넌트를 이용하여 경로(path)를 연결합니다. */}
        <coingecko-coin-list-widget  
          coin-ids="bitcoin,ethereum,eos,ripple,litecoin" 
          currency="usd" 
          locale="en" 
          width="40">
        </coingecko-coin-list-widget>
      </Side>
      </div>
  );
};

export default Sidebar;