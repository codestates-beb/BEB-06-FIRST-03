import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Detail.css';

// TODO - 상세보기 페이지를 작성합니다.
export default function Detail ({ selectedNft, walletAccount }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function trading(){
    //메타마스크에 연결하여 transaction를 생성합니다.
    //accout조회 
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts',
    });
  
    const tokenId = "3"; // .toString()으로 문자열로 변환 tokenId는 총 64자리
    const zero = "0000000000000000000000000000000000000000000000000000000000000000"; 
    
    //inputData는 64자리
    const from = (zero + accounts[0].split('0x')[1]).slice(-64); 
    // const to = (zero + to.split('0x')[1]).slice(-64); 
    const inputTokenID = (zero + tokenId).slice(-64); //tokenid 자리수만큼 앞에서 0을 잘라냄

    window.ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0], // 지갑주인만 transfer가능함.
          to: "0x00", /*보낼사람주소*/
          data: "0x42842e0e"+ //transfer methodId 해당문자열은 변경금지!
            from+
            // inputTo+
            inputTokenID,
        },
      ],
    })
    .then((txHash) => {
      console.log(txHash); //생성된 트랜젝션 해쉬값
      setShow(false); //성공시 창을 닫는다.
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className='container'>
    {!!selectedNft?
    <>
      <img src={selectedNft.image_url} className = 'img'></img>

      <div className='description'> 
        <div className='name'> {selectedNft.name} </div>
        <div className='tokenId'> {selectedNft.token_id} </div>
        <div className='address'> owner address </div>
        <p className='details'> {selectedNft.description} </p>
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