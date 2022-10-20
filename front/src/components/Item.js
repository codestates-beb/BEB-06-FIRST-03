import React from 'react'
import imgA from './logo192.png';
export default function Item({ item }) {

  return (
    <div key={item.id} className="item">
      <img className="item-img" src={imgA} alt={item.name}></img>
      <span className="item-name">{item.name}</span>
        <span className="item-price">{item.price}</span>
    </div>
  )
}