import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Detail.css';

// TODO - 상세보기 페이지를 작성합니다.
export default function Detail ({selectedNft,walletAccount}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function trading(){
    const data={
      "to":"owner address",
      "from":walletAccount,
      "tokenId":selectedNft.tokenId
    };
    //아무튼 POST 요청 추가 예정
    console.log(data);
    setShow(false);
  }

  return (
    <div className='container'>
    {!!selectedNft?
    <>
      <div className = 'img'> {selectedNft.tokenURI.image} </div>

      <div className='description'> 
        <div className='name'> {selectedNft.tokenURI.name} </div>
        <div className='tokenId'> {selectedNft.tokenId} </div>
        <div className='address'> owner address </div>
        <p className='details'> {selectedNft.tokenURI.description} </p>
      </div>

      <button className='tradeBox' onClick={handleShow}> Trade </button>
      
      </>
      :<div>잘못된 접근입니다.</div>}
      <Offcanvas show={show} onHide={handleClose} placement='bottom'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Trade</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        owner address{"----->>>>"}{walletAccount}
          <Button type="submit" onClick={trading}>Buy</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}