# 추가 내용
## Search.js
    NFT요소를 클릭 하면 detail 페이지로 연결된다.
    
## Detail.js
    search페이지에서 NFT를 클릭시 NFT상세 페이지로 이동한다.
    클릭된 NFT의 상세데이터(image, name, address, description, property)를 App.js에서 props로 가져온다.
    거래버튼을 누를시 거래컴포넌트가 상세컴포넌트 안에서 랜더링 되어야 한다.
    거래상세컴포넌트에서 props로 tokenId를 전달받는다.

## Mint.js
    name, imgURL, description을 입력할 수 있는 데이터를 작성한다.
    property는 여러가지가 들어갈 수 있으므로 +/- 버튼을 생성하여 갯수를 조절한다.

## Detail.js
    폼 입력 후 버튼을 누를시 서버로 post요청을 보낸다.
    특정 이미지와 상세정보가 없는 NFT에 대하여 대체 이미지와 대체 상세정보를 조건(삼항) 연산자로 구현한다.
    tokenIdx를 useParams를 사용하여 구현한다. 

## 기타
    일부 css가 적용 되었다.
    메타마스크 지갑 연결을 통해 transfer transaction 생성하는 방식으로 API가 수정되었다.

# 남은 목록
## Mint.js
    버튼을 누를시에 입력된 모든 값을 받아 post요청을 보낸다.



