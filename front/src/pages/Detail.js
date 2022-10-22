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
    //메타마스크에 연결하여 transaction를 생성합니다.
    //transfer전에 반드시 accout조회가 되어야함. 
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts',
    });

    const to = accounts[0].split('0x'); //0x뒤만 필요함, 지갑주인만 transfer가능함.

    //from과 tokebId는 더미로 작성됨
    const from = "0x00";
    const transferTokenId = "3"; // .toString()으로 문자열로 변환 tokenId는 총 64자리
    let zero = "0000000000000000000000000000000000000000000000000000000000000000";
    const setzero = zero.split("").slice(transferTokenId.length).join(""); // tokenId자리수만큼 0을 뺀다

    window.ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0],
          to: from, /*보낼사람주소*/
          data: "0x42842e0e"+ //transfer 함수호출 해당문자열은 변경금지!
            "000000000000000000000000"+to[1]+
            "000000000000000000000000"+from[1]+
            setzero+transferTokenId,
        },
      ],
    })
    .then((txHash) => {
      console.log(txHash);
      setShow(false); //성공시 창을 닫는다.
    })
    .catch((err) => console.log(err));
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