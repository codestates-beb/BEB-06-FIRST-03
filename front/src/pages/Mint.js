import React, { useState,useEffect } from 'react';
import { create as ipfsHttpClient } from 'ipfs-http-client';
//import { Link } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// TODO - Mint 페이지를 작성합니다.
import styled from "styled-components";
const Mid = styled.form`
  margin-top: 2%;
  margin-left: 10%;
  width: 60%;
  height: 70%;
  position:relative;
`
const ipfs = ipfsHttpClient('/ip4/127.0.0.1/tcp/5001');

export default function Mint ({ nftGroup }) {
  const [imageUrl,setImageUrl]=useState("");
  const [nftName,setNftName]=useState("");
  const [description,setDescription]=useState("");
  const [categorys,setCategory]=useState([{"trait_type":"","value":""}]);
  const [tokenUrl,setTokenUrl]=useState('');
  const [disabled,setDisabled]=useState(true);
  const [mintDisabled,setMintDisabled]=useState(true);

  /* form 데이터를 세팅하는 함수들*/

  function inputImageUrl(e) {
    
    setImageUrl(e.target.value); 
  }
  function inputNftName(e) {
    if(e.target.value!==""){
      setMintDisabled(false);
    }else{
      setMintDisabled(true);
    }
    setNftName(e.target.value); 
  }
  function inputDescription(e) {
    setDescription(e.target.value); 
  }
  function inputCategoryType(e,idx) {
    let updateCate=categorys.slice();
    updateCate[idx].trait_type=e.target.value;
    setCategory(updateCate); 
  }
  function inputCategoryValue(e,idx) {
    let updateCate=categorys.slice();
    updateCate[idx].value=e.target.value;
    setCategory(updateCate); 
  }
  function inputTokenUrl(e) {
    
    setTokenUrl(e.target.value); 
  }
  /** ipfs에 tokenId의 내용을 추가함*/
  async function addIpfs() {
    try{
      const data={
        "name":nftName,
        "description":description,
        "image_url":imageUrl,
        "attributes":categorys
      };
      //console.log(ipfs);
      const jsonData=JSON.stringify(data);
      const added = await ipfs.add(jsonData);
      setDisabled(true);
      setTokenUrl(`https://ipfs.io/ipfs/${added.path}?filename=${added.path}`);
      
    }catch(err){
      console.log(err);
      setDisabled(false);
      setTokenUrl("ipfs업로드에 실패 했습니다. 직접 url을 입력해 주세요");
    }
  }
  async function minting(e){
    
    
    e.preventDefault(); //새로고침 안되게

    let tokenId="https://ipfs.io/ipfs/"+addIpfs();

    String.prototype.hexEncode = function(){
      var hex, i;   
      var encode = "";
      for (i=0; i<this.length; i++) {
          hex = this.charCodeAt(i).toString(16); //문자 -> 유니코드(10진수) -> 16진수
          encode += hex;
      }
      return encode;
    }

    Number.prototype.addZero = function(){  
      var length = this;
      var zeroCount = 0;
      var addZeroData = ""
      while (length%64 != 0) { //64개씩 떨어지게 할때 필요한 "0"
        length += 1;
        zeroCount++;
        addZeroData += "0"
      }
      return addZeroData;
    }
    
    //메타마스크에 연결하여 transaction를 생성합니다.
    //account 조회

    if (!window.ethereum) alert("메타마스크에 연결되있지 않습니다.");
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts',
    });
    console.log(accounts)

    const from = accounts[0].split('0x')[1];
    const to = "0x95b65C0456F9D3Db3d471b70d2b57E400832588B"; //contract account
    const tokenURI = tokenUrl;//
    const zero = "0000000000000000000000000000000000000000000000000000000000000000"; 
    const inputfrom = (zero + from).slice(-64); 
    let hexLength = tokenURI.hexEncode().length;
    const dataLength = (zero+((hexLength)/2).toString(16)).slice(-64);
    
    //mint 트랜젝션 생성
    window.ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0], //지갑주인만 mint가능함.
          to: to,
          data: "0xeacabe14"+ //mint methodId 해당문자열은 변경금지!
            inputfrom+
            "0000000000000000000000000000000000000000000000000000000000000040"+
            dataLength+
            tokenURI.hexEncode()+
            hexLength.addZero()
        },
      ],
    })
    .then((txHash) => {
      console.log(txHash); //생성된 트랜젝션 해쉬값
      alert("트랜젝션이 생성되었습니다.")
    })
    .catch((err) => {
      console.error(e);
      alert("트랜젝션 생성이 실패되었습니다.");
    })
  }

  function addInput() {
    const input = {			  // 새로운 인풋객체를 하나 만들고,
      "trait_type":"",
      "value":""			  // 내용은 빈칸으로 만들자
    };

    setCategory([...categorys, input]); // 기존 값에 새로운 인풋객체를 추가해준다.
  }

  // category삭제
  function deleteInput() {    // 인덱스 값을 받아서
    setCategory(categorys.slice(0,categorys.length-1)); // 인덱스 값과 같지 않은 애들만 남겨둔다
  }

  return (
    
    <Form as={Mid} >
      <h1>Mint Your NFT</h1>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          이미지 url
        </Form.Label>
        <Col sm={10}>
          <Form.Control  placeholder="http:/" onChange={inputImageUrl} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          NFT 이름
        </Form.Label>
        <Col sm={10}>
          <Form.Control  placeholder="NFT-Name" onChange={inputNftName} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          Description
        </Form.Label>
        <Col sm={10}>
          <Form.Control as="textarea" placeholder="text" rows={3} onChange={inputDescription} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          Category
        </Form.Label>
        {categorys.map((cate,idx)=>{
          return(
            <Row key={idx}>
              
              <Col sm={4}>
                <Form.Control placeholder="Type" onChange={(e) => inputCategoryType(e,idx)}/>
              </Col>
              <Col sm={4}>
                <Form.Control placeholder="name" onChange={(e) => inputCategoryValue(e,idx)}/>
              </Col>
            </Row>
          );
        })}
        <Col >
        <ButtonGroup aria-label="Basic example">
          <Button variant="outline-success" onClick={addInput} >+</Button>
          <Button variant="outline-danger" onClick={deleteInput}>-</Button>
        </ButtonGroup>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          tokenUrl
        </Form.Label>
        <Col sm={10}>
          <Form.Control as="textarea" placeholder="http://" rows={3} value={tokenUrl} onChange={inputTokenUrl} disabled={disabled} />
        </Col>
        <Col sm={{ span: 10, offset: 2 }}>
          <Button variant="outline-secondary" onClick={addIpfs}>make ipfs</Button>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit" onClick={(e)=>minting(e)} disabled={mintDisabled} >Mint</Button>
        </Col>
      </Form.Group>
    </Form>
    
  );
}