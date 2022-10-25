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

  const teamTokenId = 14; //3조 nft tokenId를 넣습니다.
 
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
    <footer>
      <div className='footer_'>
    <Container>
      <Row>
        {loading
          ? <>
             <Link 
               onClick={() => {
                window.open("https://github.com/codestates-beb/BEB-06-FIRST-03") //token을 불러오지 못할때는 링크로 연결
               }}
             >
                Codestates BEB_6 Project_1 OpenSee
              </Link>
            </>
          :  <Card
              style={{ width: '18rem' }}       
              onClick={() => {
                searchNft(teamThirdNft);
                navigate('/detail/0');
              }}        
            >
              <Card.Img
                variant="top" 
                src={
                  ((teamThirdNft[0].image_url === "image_url") || !teamThirdNft[0].image_url)
                  ? altImg 
                  : teamThirdNft[0].image_url } 
              />
              <Card.Body>
                <Card.Title>{
                  ((teamThirdNft[0].name === "name") || !teamThirdNft[0].name)
                  ? "Go to OpenSee GitHUB" 
                  : teamThirdNft[0].name}
                </Card.Title>
              </Card.Body>
            </Card>
        }
      </Row>
    </Container>
    </div>
    </footer>
  )

}