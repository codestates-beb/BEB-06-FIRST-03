import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Detail.css';

import altImg from "../files/alt_img.png"

// TODO - 상세보기 페이지를 작성합니다.
export default function Detail ({ walletAccount, nftGroup }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [ inputData, setInputData ] = useState("");
  const { tokenIdx } = useParams();
  if( !tokenIdx || nftGroup.length<tokenIdx ) {
    navigate("/")}
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(nftGroup)

  const trait = nftGroup[tokenIdx].traits;

  async function trading() {
    //메타마스크에 연결하여 transaction를 생성합니다.
    //accout조회 
    
    if (!window.ethereum) alert("메타마스크에 연결되있지 않습니다.");
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts',
    });

    if(nftGroup[tokenIdx].creator.address === accounts[0]) { //소유자인지 확인
      const zero = "0000000000000000000000000000000000000000000000000000000000000000"; 

      //inputData는 64자리
      const from = (zero + accounts[0].split('0x')[1]).slice(-64); 
      const to = (zero + inputData.split('0x')[1]).slice(-64); 
      console.log(to)
      const contractAdress = "0x95b65C0456F9D3Db3d471b70d2b57E400832588B"; //contract address
      const tokenId = nftGroup[tokenIdx].token_id.toString(); // .toString()으로 문자열로 변환 tokenId는 총 64자리
      const inputTokenID = (zero + tokenId).slice(-64); //tokenid 자리수만큼 앞에서 0을 잘라냄

      window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: accounts[0], // 지갑주인만 transfer가능함.
            to: contractAdress, /*보낼사람주소*/
            data: "0x42842e0e"+ //transfer methodId 해당문자열은 변경금지!
              from+
              to+
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
    } else alert("NFT 소유자가 아닙니다.");
  }

  const checkTokenURI = () =>{
    if(nftGroup[tokenIdx].token_metadata) { //tokenURI가 있을때 새창을 연다.
     window.open(nftGroup[tokenIdx].token_metadata)
    }
  }

  return (
    <div className='container'>
      <img src={nftGroup[tokenIdx].image_url ? nftGroup[tokenIdx].image_url : altImg} className='img'></img>
      <div className='description'> 
        <div className='name'>
          Name: {nftGroup[tokenIdx].name ? nftGroup[tokenIdx].name: "no_name"}
        </div>
        <div className='contract_name'>
          Contract Name: {nftGroup[tokenIdx].asset_contract.name ? nftGroup[tokenIdx].asset_contract.name : "no_name"}
        </div>
        <Link className='tokenId' onClick={()=>checkTokenURI()}>
          TokenID: {nftGroup[tokenIdx].token_id}
        </Link>
        <div className='address'>
          Address: {nftGroup[tokenIdx].creator.address}
        </div>
        <div className='details'>
          <p>Description: {nftGroup[tokenIdx].description ? nftGroup[tokenIdx].description: "no_description"}</p>
          {trait.map((attribute, idx) =>
            <div key={idx}>
              <div className='trait_typekey' >{attribute. trait_type}</div>
              <div className='value'>{attribute.value}</div>
            </div>
          )}
        </div>
      <div>
        <input //전송받는 사람 address 
          placeholder="0x00"
          onChange={(e)=>setInputData(e.target.value)}>
        </input>
      </div>
      </div>
        <button className='tradeBox' onClick={handleShow}>Trade</button>
     
      <Offcanvas show={show} onHide={handleClose} placement='bottom'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Transfer</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        owner address{"----->>>>"}{walletAccount}
          <Button type="submit" onClick={trading}>Transfer</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
