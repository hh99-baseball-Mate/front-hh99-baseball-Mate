import React from "react";
import styled from "styled-components";
import banner from "../shared/icon/logo/Banner.png";
import logo from "../shared/icon/logo/whiteLogo.png";
import { IoIosArrowForward } from "react-icons/io";
// import { VscBell } from "react-icons/vsc";

export const Banner = (props) => {
  const { children } = props;

  return (
    <BannerContainer>
      <Headers>
        <Logo src={logo} alt="로고이미지" />
        {/* <Icon size="24" color="#FFFFFF" /> */}
      </Headers>

      <TextBox>
        <HeaderText>OPEN EVENT</HeaderText>
        <Title>
          미트볼 서비스 오픈 기념 <br />
          회원가입 이벤트!
        </Title>
        <MoreBtn>
          자세히보기 <IoIosArrowForward />
        </MoreBtn>
      </TextBox>
    </BannerContainer>
  );
};
Banner.defaultProps = {
  children: null,
};

const BannerContainer = styled.div`
  background-image: url(${banner});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  height: 437px;
`;

const Headers = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  margin: 20px;
  width: 120px;
  color: #fff;
`;

// const Icon = styled(VscBell)`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 24px;
// `;

const TextBox = styled.div`
  position: absolute;
  bottom: 0px;
  margin: 30px;
`;

const HeaderText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
`;

const Title = styled.p`
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  margin: 3px 0 17px;
`;

const MoreBtn = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
  color: #fff5f5;
  display: flex;
  /* justify-content: center; */
  align-items: center;
`;
