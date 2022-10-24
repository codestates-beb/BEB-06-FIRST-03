import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Detail.css';

import altImg from "../files/alt_img.png"

// TODO - 상세보기 페이지를 작성합니다.
export default function Detail ({ selectedNft, walletAccount, nftGroup }) {
  const { tokenIdx } = useParams();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const trait = nftGroup[tokenIdx].traits;

  async function trading(){
    //메타마스크에 연결하여 transaction를 생성합니다.
    //accout조회 
    
    if (!window.ethereum) alert("메타마스크에 연결되있지 않습니다.");
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
    .catch((err) => {
      console.log(err);
      alert("트랜젝션 생성이 실패되었습니다.");
    });

    
  }

  return ( 

    <div className='container'>
    <>
      <img src={nftGroup[tokenIdx].image_url} className='img'></img>

      <div className='description'> 
        <div className='name'>{nftGroup[tokenIdx].name}</div>
        <div className='tokenId'>{nftGroup[tokenIdx].token_id}</div>
        <div className='address'>{nftGroup[tokenIdx].asset_contract.address}</div>
        <p className='details'>{nftGroup[tokenIdx].description}</p>

        {trait.map((attribute, idx) =>

        <div key={idx}>
        <div className='trait_typekey' > {attribute. trait_type} </div>
        <div className='value'> {attribute.value} </div>
        </div>

        )}
      </div>
      
      </>
        <>
        <img
            variant="top" 
            src={nftGroup[tokenIdx].image_url ? nftGroup[tokenIdx].image_url : altImg} 
            />
          <description>
            {nftGroup[tokenIdx].description ? nftGroup[tokenIdx].description: "no_description"}
          </description>
          <name>
            {nftGroup[tokenIdx].name ? nftGroup[tokenIdx].name: "no_name"}
          </name>
        </>

        <button className='tradeBox' onClick={handleShow}> Trade </button>

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
