import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Detail.css';

// TODO - 상세보기 페이지를 작성합니다.
export default function Detail () {
  
  return (
    <div className='container'>

      <div className = 'img'> NFT Image </div>

      <div className='description'> 
      <div className='name'> NFT Name </div>
        <div className='tokenId'> tokenId </div>
        <div className='address'> owner address </div>
        <p className='details'> details </p>
      </div>

      <button className='tradeBox'> Trade </button>
    </div>
  );
}