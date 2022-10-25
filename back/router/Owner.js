const express = require('express');
const router = express.Router();

const Contract = require('web3-eth-contract');
const abi = require('../contract/ABI');

require('dotenv').config();

router.get('/', async (req, res, next) => {
  const url = "https://goerli.infura.io/v3/" + process.env.INFURA_API_KEY;
  Contract.setProvider(url);
  const constract = new Contract(abi, process.env.SMARTCONTRACT_ADDRESS); 
  const tokenId = req.query.tokenId;

  if(tokenId){
    try{
      const owner = await constract.methods.ownerOf(tokenId).call();  
      return res.status(200).send(owner);
    } catch (err) { 
        console.log("잘못된 tokenId입니다.");
        return res.status(400).send({ message: "invalid tokenId"});
      }
  } else {
    console.log("Error! tokenId가 없습니다.");
    next(); //에러처리
  } 
})
module.exports = router;