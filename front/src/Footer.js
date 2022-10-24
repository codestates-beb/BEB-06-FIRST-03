import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import altImg from "./files/alt_img.png"

export default function Footer ({ searchNft }) {

  const navigate = useNavigate();

  const [ teamThirdNft, searchTeamThirdNft ] = useState([{ image_url:" image_url", name: "name" }]);
  const [ loading, setloading ] = useState(true);

  const teamTokenId = 4; //3조 nft tokenId를 넣습니다.
 
  useEffect(()=> {
    callTeamNft(teamTokenId);
    setloading(false);
  },[]);

  const callTeamNft = (teamTokenId) => {
    let url = `https://testnets-api.opensea.io/api/v1/assets?token_ids=${teamTokenId}&asset_contract_address=0x95b65C0456F9D3Db3d471b70d2b57E400832588B&order_direction=desc&offset=0&limit=20&include_orders=false`
    axios({
          method: 'GET',
          url: url,
          headers: {accept: 'applycation/json'},
          withCredential: true,
        })
      .then((res) => { 
        const asset = res.data.assets
        searchTeamThirdNft(asset);
      })
      .catch((e) => {
        console.error(e);
      });
    }

  return (
    <Container>
      <Row>
        {loading
          ? <>
             <Link 
               onClick={() => {
                 console.log(teamThirdNft)
               }}
             >
                Codestates BEB_6 Project_1 OpenSee
              </Link>
            </>
          :  <Card
              style={{ width: '18rem' }}       
              onClick={() => { 
                console.log(teamThirdNft.image_url)
              }}         
            >
              <Card.Img
                variant="top" 
                src={teamThirdNft[0].image_url ? teamThirdNft[0].image_url : altImg} 
                onClick={() => {
                  searchNft(teamThirdNft);
                  navigate('/details/0');
                }}
              />
              <Card.Body>
                <Card.Title>{teamThirdNft[0].name ? teamThirdNft[0].name : "Go to OpenSee GitHUB"}</Card.Title>
              </Card.Body>
            </Card>
        }
      </Row>
    </Container>
  )

}