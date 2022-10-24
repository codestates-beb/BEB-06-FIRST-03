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
      <Side>
        {/* TODO : About 메뉴 아이콘과 Mypage 메뉴 아이콘을 작성하고 Link 컴포넌트를 이용하여 경로(path)를 연결합니다. */}
          <NavLink to="/" style = {{backgroundColor : 'green'}}>main</NavLink>
          <NavLink to="/search" style = {{backgroundColor : 'red'}}>search</NavLink>
          <NavLink to="/detail" style = {{backgroundColor : 'gold'}}>detail</NavLink>
          <NavLink to="/mint" style = {{backgroundColor : 'gold'}}>mint</NavLink>
          <NavLink to="*" style = {{backgroundColor : 'gold'}}>emptyPage</NavLink>
      </Side>
  );
};

export default Sidebar;