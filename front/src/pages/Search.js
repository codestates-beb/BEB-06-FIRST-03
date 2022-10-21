import React, { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { Link } from 'react-router-dom';
import Item from '../components/Item';
// TODO - nft 조회 페이지를 작성합니다.
export default function Search ({ items ,search}) {
  let filteredItems=items.filter((item)=>item.name===search);
  return (
    <div id="item-list-container">
      <div id="item-list-body">
        <div id="item-list-title">검색 결과</div>
        <Container>
          {filteredItems.length===0?<div>검색 결과가 없습니다</div>:
          <Row>
          
          {filteredItems.map((item, idx) => 
            
            <Item item={item} key={idx} />
          
          )}
          </Row>}
        </Container>
      </div>
    </div>
  );
}