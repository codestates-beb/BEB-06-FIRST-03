const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

  const tokenId = req.query.tokenId;
  const address = req.query.address;

  console.log(tokenId)
  console.log(address)

  if(tokenId){
    return res.status(200).send("tokenURI");
  } else if(address){
    return res.status(200).send("balance");
  } else return res.status(400).send("입력값이 없습니다.");
  
})

module.exports = router;