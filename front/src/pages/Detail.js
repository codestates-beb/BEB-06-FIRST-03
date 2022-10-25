import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import altImg from "../files/alt_img.png"
import './Detail.css';

// TODO - 상세보기 페이지를 작성합니다.
export default function Detail ({ walletAccount, nftGroup }) {
  const { tokenIdx } = useParams();
  const navigate = useNavigate();
  const [ show, setShow ] = useState(false);
  const [ ownerAddress, setOwnerAddress ] = useState("Not minted by OpenSee") //OpenSee Server에서 owner를 조회
  const tokenId = Number(nftGroup[tokenIdx].token_id);
  const [ inputData, setInputData ] = useState(""); //transfer address 입력

  console.log("nftData", nftGroup);

  if( !tokenIdx || nftGroup.length < tokenIdx ) {
    navigate("/")}
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=> { //tokenId로 owner조회
    const options = {
      method: 'GET',
      url: `http://localhost:8001/owner?tokenId=${tokenId} `
    }
    axios.request(options)
      .then((res) => {
        setOwnerAddress(res.data.ownerAddress);
      })
      .catch((e) => {
        console.error(e);
        alert("OpenSee서버와 연결이 원활하지 않습니다.");
      });
  },[]);

  const trait = nftGroup[tokenIdx].traits;

  async function trading() {
    //메타마스크에 연결하여 transaction를 생성합니다.
    //accout조회 
    if (inputData) {
      if (!window.ethereum) alert("메타마스크에 연결되있지 않습니다.");
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts',
      });
    
      if (ownerAddress === accounts[0]) { //OpenSee NFT인지, 소유자인지 확인
        const zero = "0000000000000000000000000000000000000000000000000000000000000000"; 

        //inputData는 64자리
        const from = (zero + accounts[0].split('0x')[1]).slice(-64); 
        const to = (zero + inputData.split('0x')[1]).slice(-64); 

        const contractAdress = "0x95b65C0456F9D3Db3d471b70d2b57E400832588B"; //contract address
        const inputTokenID = (zero + tokenId.toString(16)).slice(-64); //16진수변환 tokenId는 총 64자리, tokenid 자리수만큼 앞에서 0을 잘라냄

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
      } else alert("NFT 소유자만 Transfer 가능합니다.");
    } else alert("Transfer할 address를 입력해주세요");
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
        <div className='name'>Name</div>
        <div className='nameBox'>
          {nftGroup[tokenIdx].name ? nftGroup[tokenIdx].name: "no_name"}
        </div>
        <div className='name'>Contract Name</div>
        <div className='nameBox'>
           {nftGroup[tokenIdx].asset_contract.name ? nftGroup[tokenIdx].asset_contract.name : "no_name"}
        </div>
        <div className='name'>TokenID</div>
        
        <Link className='tokenId' onClick={() => checkTokenURI()}>
        <p>{nftGroup[tokenIdx].token_id}</p>
        </Link>
        
        <div className='name'>Address</div>
        <div className='tokenId'>
          {ownerAddress}
        </div>
        <div className='name'>Description</div>
        <div className='details' >
          <p> {nftGroup[tokenIdx].description ? nftGroup[tokenIdx].description: "no_description"}</p>
          
        </div>
        <div className='name'>Traits</div>
        <div className='details'>
          {trait.map((attribute, idx) =>
            <div key={idx}>
              {attribute. trait_type} : {attribute.value}
            </div>
          )}
        </div>
      </div>
        
        <input //전송받는 사람 address 
          placeholder="To:0x00"
          className='tradeBox'
          onChange={(e) => setInputData(e.target.value)}>
        </input>
        
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
