import React, { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { useNavigate } from 'react-router-dom';
import Item from '../components/Item';
// TODO - nft 조회 페이지를 작성합니다.
export default function Search ({ nftGroup,selectNft }) {
  const navigate = useNavigate();
  const clickNft=(nft)=>{
    console.log(nft);
    selectNft(nft);
    navigate("/detail");
  };
  return (
    <div id="item-list-container">
      <div id="item-list-body">
        <div id="item-list-title">검색 결과</div>
        <Container>
          {nftGroup.length===0?<div>검색 결과가 없습니다</div>:
          <Row>
          
          {nftGroup.map((nft, idx) => 
            
            <Item nft={nft} key={idx} clickNft={clickNft} />
          
          )}
          </Row>}
        </Container>
      </div>
    </div>
  );
}