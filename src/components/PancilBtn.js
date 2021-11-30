import Pancil from "../shared/icon/Pancil.png";
import styled from "styled-components";
import { memo } from "react"

const PancilBtn = memo((props) => {
  // 글작성 연필 아이콘
  const { onClick } = props

  const styles = { onClick }
  return (
    <>
      <Btn {...styles}>
        <img src={Pancil} alt="위치" />
      </Btn>
    </>
  )
})

export default PancilBtn;

PancilBtn.defaultProps = {
  _onClick: () => {},
};

const Btn = styled.button`
  border-radius: 50%;
  height: 45px;
  width: 45px;
  position: absolute;
  right: 0;
  bottom: 120px;
  transform: translate(-50%, -50%);
  background: #f25343;
  opacity: 0.8;
  border: 0;
  outline: 0;
  cursor: pointer;

  /* 연필 숨김 방지 */
  /* @media only screen and (max-width: 1024px) {
    position: fixed;
    right: 10px;
    bottom: 80px;
    transform: translate(-50%, -50%);
  }

  @media only screen and (max-width: 768px) {
    position: fixed;
    right: 10px;
    bottom: 80px;
    transform: translate(-50%, -50%);
  }
  @media only screen and (max-width: 375px) {
    position: fixed;
    right: 10px;
    bottom: 80px;
    transform: translate(-50%, -50%);
  } */
`
