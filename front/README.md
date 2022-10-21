# 추가 내용
## Search.js
    NFT요소를 클릭 하면 detail페이지로 연결된다
    
## Detail.js
    search페이지에서 NFT를 클릭시 NFT상세 페이지로 이동
    클릭된 NFT의 상세데이터를 App.js에서 props로 가져온다
    거래버튼을 누를시 거래컴포넌트가 상세컴포넌트 안에서 랜더링 되야합니다
    거래상세컴포넌트에서 props로 tokenId를 전달받습니다.
## Mint.js
    name, imaURL, description을 입력할수있는 데이터를 작성합니다.
    property는 여러가지가 들어갈수있으므로 +/- 버튼을 생성하여 갯수를 조절합니다.
## 기타
    일부 css가 적용 되었습니다.

# 남은 목록
## Mint.js
    버튼을 누를시에 입력된 모든 값을 받아 post요청을 합니다.
## Detail.js
    폼입력후 버튼을 누를시 서버로 post요청을 합니다.