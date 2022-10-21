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

export default function Mint () {
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
  async function minting(){
    const data={
      "name":nftName,
      "description":description,
      "image":imageUrl,
      "attributes":categorys
    };
    //아무튼 POST 요청 추가 예정
    console.log(data);
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
          <Button type="submit" onClick={minting}>Mint</Button>
        </Col>
      </Form.Group>
    </Form>
    
  );
}