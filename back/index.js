const express = require('express');
const cors = require('cors');
const port = 8080;
const app = express();

const searchRouter = require('./router/search')

// 라우터를 만들어주세요 searchRouter 참고
// app.use('/tranfer', transferRouter);
// app.use('/mint', mintRouter);

app.use( //cors설정
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "OPTIONS", "DELETE"],
    credentials: true
  })
)

app.use(express.json()); //json으로 이루어진 Request Body를 받는다.

app.use('/search', searchRouter);

app.post('/transfer', (req, res) => {
  return res.status(200).send("tranfer");
})

app.post('/mint', (req, res) => {
  return res.status(200).send("mint");
})

/* advance nft 삭제기능
*app.delete('/burn', (req, res) => {
*  return res.status(200).send("burn");
*})
*/

// 에러처리
app.use((err, req, res, next) => { //에러발생시 처리 next(err)
  console.error(err.stack)
  return res.status(400).send("something broke")
})

app.use((req, res, next) => { //잘못된 경로(path)접근시 에러처리
  return res.status(404).send("invalid path")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})