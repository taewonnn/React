// npx create-react-app my-app --template basic-react
// cd my-app
// npm install styled-components styled-reset


import { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import shoppingCart from './assets/icon-shopping-cart-white.svg'
import ProductHeart from './assets/icon-heart.svg'
import ProductHeartOn from './assets/icon-heart-on.svg'


const GlobalStyle = createGlobalStyle`
  /* reset코드 + 커스텀reset코드 + 유틸리티코드 */
  /* 한 줄 말줄임, 두 줄 말줄임... */
  ${reset}
  
  span {
    color: red;
    font-size: 12px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    cursor: pointer;
  }

  * {
    box-sizing: border-box;
  }
`

const ContainerMain = styled.main`
  display: flex;
  justify-content: center;
  margin-top: 160px;
`


const ContainerProductList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 60px;
  width: 1260px;
  margin-right: 60px;
`

const ItemProductLsit = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`

const ImgProduct = styled.img`
  width: 380px;
  height: 380px
  border-radius: 10px;
`

const IconShoppingCart = styled.a`
  background: #000 url(${shoppingCart}) no-repeat center / 40px 40px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: sticky;
  top: 60px;
`

const ProductDesc = styled.p`
  font-size: 18px;
  line-height: 22px;
  margin-top: 20px;
`


const ProductHearts = styled.a`
  background: url(${ProductHeart}) no-repeat center
`


const ProductPrice = styled.p`
  font-size: 24px;
  weight: 700;
  line-height: 30.05px;
`




// 데이터 받아올 때 -> fetch 사용  // components로 사용할게 아니라 requests R대문자로 안써도됨!
async function requests() {
  const response = await fetch('http://test.api.weniv.co.kr/mall');
  const data = await response.json();
  return data;
}


function ProductList() {
  const [ProductListData, setProductListData] = useState([])
  const [dataLoadSwitch, setDataLoadSwitch] = useState(true)

  if(dataLoadSwitch) {

    requests().then(productData => {
      setProductListData(productData)
      setDataLoadSwitch(false)
    })
  }


  // 무한반복됨!
  // requests().then(productData => setProductListData(productData))
  // console.log(ProductListData)


  return (
    <ContainerProductList>
    {ProductListData.map(item => 
      <ProductListItem 
        key={item.id} 
        productName ={item.productName}
        price ={item.price}
        thumbnailImg ={item.thumbnailImg}
        />
      )}
    </ContainerProductList>
  )
}


function ProductListItem({productName, price, thumbnailImg}) {
  return (
    <ItemProductLsit>
      <ImgProduct  
      src={"http://test.api.weniv.co.kr/" + thumbnailImg} 
      alt="{prdocutName}" 
      />
      <ProductDesc>{productName}</ProductDesc>
      <ProductHearts>하트</ProductHearts>
      <ProductPrice>{price}원</ProductPrice>
    </ItemProductLsit>
  )
}


function ShoppingCart() {
  return <IconShoppingCart href="#"></IconShoppingCart>
}


function App() {
  return (
    <ContainerMain>
      <GlobalStyle/>
      <ProductList/>
      <ShoppingCart/>
    </ContainerMain>
  );
}
export default App;
