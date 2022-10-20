import React, { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { Link } from 'react-router-dom';
import Item from '../components/Item';
// TODO - nft 조회 페이지를 작성합니다.
export default function Search ({ items }) {
  
  return (
    <div id="item-list-container">
      <div id="item-list-body">
        <div id="item-list-title">검색 결과</div>
        <Container>
        {items.map((item, idx) => 
            
            <Item item={item} key={idx} />
          
          )}
        </Container>
      </div>
    </div>
  );
}