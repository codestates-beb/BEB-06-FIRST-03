import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import altImg from "../files/alt_img.png"
import loadingImg from "../files/loading_img.png"

// TODO - 메인 페이지를 작성합니다.
export default function Main ({ nftGroup, searchNft, selectNft }) {

  const [loading, setloading] = useState(true);

  const navigate = useNavigate();
  
  useEffect(()=> {
    callImage();
  },[])

  const callImage = () => {
    const options = {
      method: 'GET',
      url: 'https://testnets-api.opensea.io/api/v1/assets?order_by=sale_count&order_direction=desc&offset=0&limit=20&include_orders=false'
    }
    setloading(true);
    axios.request(options)
      .then((res) => {
        searchNft(res.data.assets);
        setloading(false);
      })
      .catch((e) => {
        console.error(e);
        alert("서버와 연결이 원활하지 않습니다.");
      });
      
  }

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
                  selectNft(idx);
                  navigate("/detail");
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
