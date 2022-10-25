import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import altImg from "../files/alt_img.png"
import loadingImg from "../files/loading_img.png"


// TODO - 메인 페이지를 작성합니다.
export default function Main ({ nftGroup, loading }) {

  const navigate = useNavigate();

  return (
    
      <Row>
        {loading
          ? <>
             <Card.Img style={{ width: '18rem' }} src={loadingImg} />
            </>
          : nftGroup.map((asset,idx) =>
              <Card
                style={{ width: '18rem' }} 
                href="/detail"  
                key ={idx}              
                onClick={() => { 
                  console.log("현재 선택된 nft", idx);
                  navigate(`/detail/${idx}`);
                }
                }
              >
                <Card.Img
                  variant="top" 
                  src={asset.image_url ? asset.image_url : altImg} 
                />
                <Card.Body>
                  <Card.Title>{asset.name ? asset.name: "no_name"}</Card.Title>
                </Card.Body>
              </Card>
          )
        }
      </Row>
    
  );
}
