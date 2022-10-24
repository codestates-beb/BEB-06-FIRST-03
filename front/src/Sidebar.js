import React from 'react';
// TODO - 코인 시세를 넣습니다. (임시적으로 모든 페이지 접근 버튼을 작성하였습니다.)
import { Link ,NavLink} from 'react-router-dom';
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
/*
      /  : Main page
      /search : NFT조회 페이지 컴포넌트
      /detail :  nft 상세페이지
      /mypage : 마이페이지 컴포넌트
      /mint : 민트 페이지 컴포넌트
      /trade : 거래 페이지 컴포넌트
      * : emptyPage 컴포넌트*/
const Sidebar = () => {
  return (
    <>
      <coingecko-coin-list-widget  
        coin-ids="bitcoin,ethereum,eos,ripple,litecoin" 
        currency="usd" 
        locale="ko" 
        width="100">
      </coingecko-coin-list-widget>
      <span>

      </span>
    </>
  );
};

export default Sidebar;