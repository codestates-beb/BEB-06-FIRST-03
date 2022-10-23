import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// TODO - Mint 페이지를 작성합니다.
import styled from "styled-components";
const Mid = styled.form`
  margin-top: 10%;
  margin-top: 10%;
  margin-left: 10%;
  width: 60%;
  height: 70%;
  position:relative;
  
  
`

export default function Mint ({ nftGroup }) {
  const [imageUrl,setImageUrl]=useState("");
  const [nftName,setNftName]=useState("");
  const [description,setDescription]=useState("");
  const [categorys,setCategory]=useState([{"trait_type":"","value":""}]);

  function inputImageUrl(e) {
    setImageUrl(e.target.value); 
  }
  function inputNftName(e) {
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
  async function minting(e){
    // const data={
    //   "name":nftName,
    //   "description":description,
    //   "image":imageUrl,
    //   "attributes":categorys
    // };

    e.preventDefault(); //새로고침 안되게


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
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts',
    });
    const from = accounts[0].split('0x')[1];
    const to = "0x95b65C0456F9D3Db3d471b70d2b57E400832588B" //contract account
    const tokenURI = "test" //더미
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
    })
    .catch((err) => console.log(err));
  }

  function addInput() {
    const input = {			  // 새로운 인풋객체를 하나 만들고,
      "trait_type":"",
      "value":""			  // 내용은 빈칸으로 만들자
    };

    setCategory([...categorys, input]); // 기존 값에 새로운 인풋객체를 추가해준다.
  }

  // 삭제
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
          <Form.Control type="email" placeholder="http:/" onChange={inputImageUrl} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          NFT 이름
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="email" placeholder="NFT-Name" onChange={inputNftName} />
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
                <Form.Control placeholder="Type" onChange={(e)=>inputCategoryType(e,idx)}/>
              </Col>
              <Col sm={4}>
                <Form.Control placeholder="name" onChange={(e)=>inputCategoryValue(e,idx)}/>
              </Col>
            </Row>
          );
        })}
        <Col >
        <Button variant="outline-primary" onClick={addInput}>+</Button>
        </Col>
        <Col>
        <Button variant="outline-danger" onClick={deleteInput}>-</Button>
        </Col>
        
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit" onClick={(e)=>minting(e)}>Mint</Button>
        </Col>
      </Form.Group>
    </Form>
    
  );
}