import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// TODO - 상세보기 페이지를 작성합니다.
export default function Detail ({selectedNft}) {
    console.log(selectedNft);
  return (
    <div>
    {!!selectedNft?
    <div>
      <section>
        {selectedNft.tokenURI.image}
      </section>
      <section>
        <div>{selectedNft.tokenURI.name}</div>
        <div>{selectedNft.tokenId}</div>
        <div>{selectedNft.tokenURI.description}</div>
        {selectedNft.tokenURI.attributes.map((at)=>{
          return(<div key={Object.keys(at)[0]}>
            {at[Object.keys(at)[0]]}
          </div>);
        })}
      </section>
      
    </div>
    :<div>잘못된 접근입니다.</div>}
    </div>
  );
}