[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fcodestates-beb%2FBEB-06-FIRST-03&count_bg=%232372CC&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=VISIT&edge_flat=false)](https://github.com/codestates-beb/BEB-06-FIRST-03)</br>

### 👋introduce
&nbsp;&nbsp;&nbsp; 코드스테이츠 BEB 6기 3조입니다!<br/>
&nbsp;&nbsp; 지난 4개월여간 우리가 배워온 지식들과 실제 서비스중인 **OpenSea**를 분석하여<br/>
&nbsp;&nbsp; NFT를 발행하고 서로주고 받을 수 있는 웹어플리케이션을 구현하고자 합니다.<br/>
&nbsp;&nbsp; 스마트컨트랙트를 블록체인네트워크에 배포하고 <br/>
&nbsp;&nbsp; web3라이브러리와 연동하여 서버를 구축하고 <br/>
&nbsp;&nbsp; 우리가 만들어낸 서버로와 통신하는 웹페이지를 구현하는것은<br/>
&nbsp;&nbsp; 팀원 모두에게 있어서 첫번째 도전입니다.<br/>
&nbsp;&nbsp; 이번 프로젝트를 통해 블록체인을 다루는 개발자로서 한발을 내딛어<br/>
&nbsp;&nbsp; 저희의 장래의 가능성을 열어볼(**OpenSee**) 것입니다.
<br/>

<br/>

### 📝Roles
||||
|---|---|---|
**이민욱** | 프론트엔드(팀장) | https://github.com/yiminwook 
**조은석** |프론트엔드 |https://github.com/noncontact
**양지영** |백엔드&스마트컨트랙트 | https://github.com/Risio1016
**한은진** |백엔드&스마트컨트랙트 | https://github.com/eunjh3

<br/>

### 📒Rules
&nbsp;&nbsp; 회의는 오전 11시에 진행<br/>
&nbsp;&nbsp; 커밋은 한글로 간결하게 작성하고, 기능구현시마다 작성<br/>
&nbsp;&nbsp; 고민이 될때는 항상 팀원들과 상담!
<br/>
<br/>


### ♻️Workflow
 [workFlowIMG](https://github.com/codestates-beb/BEB-06-FIRST-03)
 
 <br/>
 
### 🛠Workframe
 [workFrameIMG](https://github.com/codestates-beb/BEB-06-FIRST-03)

<br/>
 

### 📌Achieve goals

- Bare Minimum
  - Client
    - 조회페이지
    - NFT필터링 기능
    - 거래페이지
    - 민팅페이지
    - emptyPage
  - Server
    - Search 기능
    - tranferFrom 기능
    - Mint 기능
    - 올바르지 않은 경로로 접근시 err send
- Recommended
  - 클라이언트에 웹지갑(메타마스크)을 연결하여 address 받아오기
  - 사용자(address)가 가지고 있는 모든 NFT정보(tokenId, tokenURI) 받아오기
  - 클라이언트 서버 간 HTTPS통신
  - 팀원들의 깃허브 정보를 Footer에 정리
  - NFT Burn(삭제) 기능
- Advanced
  - 최신 NFT랭킹정보 받아오기
  - 외부 NFT검색기능

### 📞API Docs.
|function|method|input|output
|---|---|---|---|
Search(address) | GET | query(?address="") |data{tokenId, tokenURI}|
Search(TokenId) | GET | query(?tokenId="") |data{tokenURI}|
Transfer | POST |data:{to,from,tokenId}|{message:"OK"}|
Mint | POST | data:{name, description, image, attributes}|{message:"OK", data{tokenId}}|
Burn | DELETE | data:{address, tokenId}|{message:"OK"}|

<br/>
 

---
> ### 📦Version 
---
<pre >
<img src="https://img.shields.io/badge/React ^18.2.0-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <br/>
<img src="https://img.shields.io/badge/React_Router ^18.2.0-CA4245?style=for-the-badge&logo=React Router&logoColor=white"><br/>
<img src="https://img.shields.io/badge/React_Router_dom ^6.4.0-CA4245?style=for-the-badge&logo=React Router&logoColor=white"><br/>
<img src="https://img.shields.io/badge/Express ^4.18.2-000000?style=for-the-badge&logo=Express&logoColor=white"><br/>
<img src="https://img.shields.io/badge/axios ^1.1.3-5A29E4?style=for-the-badge&logo=axios&logoColor=white"><br/>
<img src="https://img.shields.io/badge/Web3.js ^1.8.0-F16822?style=for-the-badge&logo=Web3.js&logoColor=white"><br/>
</pre>