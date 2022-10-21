import React from 'react'
import imgA from './logo192.png';
export default function Item({ nft,clickNft }) {

  return (
    <div key={nft.tokenId} className="item" onClick={()=>clickNft(nft)}>
      <img className="item-img" src={imgA} alt={nft.tokenURI.name}></img>
      <span className="item-name">{nft.tokenURI.image}</span>
        <span className="item-price">{nft.tokenURI.description}</span>
    </div>
  )
}