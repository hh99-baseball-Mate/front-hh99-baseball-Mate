import React from "react"
import styled from "styled-components"
import banner from "../../shared/icon/logo/Banners.png"
import logo from "../../shared/icon/logo/whiteLogo.png"
import { IoIosArrowForward } from "react-icons/io"
import { history } from "../../redux/configStore"
// import { VscBell } from "react-icons/vsc";

export const Banner = (props) => {
  const { children } = props

  return (
    <BannerContainer>
      <Logo src={logo} alt="로고이미지" />

      <TextBox>
        <HeaderText>OPEN EVENT</HeaderText>
        <Title>
          미트볼 사용하고 <br />
          스타벅스+홈런볼 받자!
        </Title>
        <MoreBtn onClick={() => history.push("/event")}>
          자세히보기 <IoIosArrowForward />
        </MoreBtn>
      </TextBox>
    </BannerContainer>
  )
}
Banner.defaultProps = {
  children: null,
}

const BannerContainer = styled.div`
  background-image: url(${banner});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  height: 200px;
  background-color: #000;
`
const Logo = styled.img`
  margin: 20px;
  color: #fff;
`

const TextBox = styled.div`
  position: absolute;
  bottom: 0px;
  margin: 20px;
`

const HeaderText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
`

const Title = styled.p`
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  margin: 3px 0 17px;
`

const MoreBtn = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
  color: #fff5f5;
  display: flex;
  /* justify-content: center; */
  align-items: center;
`
