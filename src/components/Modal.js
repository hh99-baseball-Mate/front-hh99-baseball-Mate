import React, { useEffect } from "react"
import styled, { keyframes } from "styled-components"
import { Text } from "."

export const Modal = (props) => {
  const {
    children,
    bottom,
    center,
    setShowModal,
    height,
    getOut,
    three,
    margin,
    modalData,
    updataBtn,
    deleteBtn,
  } = props

  // 모달 오버레이에서 스크롤 방지
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`
    return () => {
      const scrollY = document.body.style.top
      document.body.style.cssText = ""
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1)
    }
  }, [])

  // const styles = { margin }

  if (bottom) {
    return (
      <ModalBottom margin={margin}>
        <ModalBottomContent height={height}>{children}</ModalBottomContent>
      </ModalBottom>
    )
  }

  if (center) {
    return (
      <ModalCenter>
        <ModalContent>
          {/* 제목 */}
          <Title>
            <Text size="16px">{modalData.title}</Text>
          </Title>

          {/* 내용 */}
          <Discription>
            <DiscriptionText>
              {modalData.descriptionOne} <br />
              {modalData.descriptionTwo}
            </DiscriptionText>
          </Discription>

          {/* 버튼 */}
          <BtnBox>
            <ModalCloseeBtn onClick={() => setShowModal(false)}>
              <P>{modalData.btnClose}</P>
            </ModalCloseeBtn>
            <ModalConfirmBtn onClick={deleteBtn}>
              <P>{modalData.btnUpdate}</P>
            </ModalConfirmBtn>
          </BtnBox>
        </ModalContent>
      </ModalCenter>
    )
  }

  if (three) {
    return (
      <ModalCenter>
        <ModalContent>
          {/* 제목 */}
          <Title>
            <Text size="16px">{modalData.title}</Text>
          </Title>

          {/* 내용 */}
          <Discription>
            <DiscriptionText>
              {modalData.descriptionOne} <br />
              {modalData.descriptionTwo}
            </DiscriptionText>
          </Discription>

          {/* 버튼 */}
          <BtnBox>
            <ModalCloseeBtn onClick={() => setShowModal(false)}>
              <P>{modalData.btnClose}</P>
            </ModalCloseeBtn>
            <ModalUpdataBtn onClick={updataBtn}>
              <P>{modalData.btnConfirm}</P>
            </ModalUpdataBtn>
            <ModalConfirmBtn onClick={deleteBtn}>
              <P>{modalData.btnUpdate}</P>
            </ModalConfirmBtn>
          </BtnBox>
        </ModalContent>
      </ModalCenter>
    )
  }
}

Modal.defaultProps = {
  children: null,
  bottom: false,
  center: false,
  three: false,
  title: "모임나가기",
  descriptionOne: "내용작성",
  descriptionTwo: "줄바뀐 내용작성",
  btnClose: "취소",
  btnConfirm: "나가기",
  btnUpdate: "수정",
  height: "",
  margin: "",
}

const ModalBottom = styled.div`
  width: 425px;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99;
  position: fixed;
  bottom: 0;
  margin: ${(props) => props.margin};
`
const ModalCenter = styled.div`
  width: 425px;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const showModal = keyframes`
  0%{
    transform: translateY(80%);
  }50%{
    transform: translateY(0%);
  }
`

const ModalBottomContent = styled.div`
  width: 425px;
  height: ${(props) => props.height};
  background-color: #ffffff;
  position: absolute;
  bottom: 0px;
  border-radius: 10px 10px 0px 0px;
  animation: ${showModal} 1.2s ease-out;
  overflow-y: auto;
`

const ModalContent = styled.div`
  width: 275px;
  height: 165px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 10px;
`
const Title = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e7e7e7;
`

const Discription = styled.div`
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DiscriptionText = styled.div`
  font-size: 14px;
  text-align: center;
  color: #c4c4c4;
  line-height: 1.5;
`

const BtnBox = styled.div`
  display: flex;
`

const ModalCloseeBtn = styled.button`
  background: #c4c4c4;
  border-radius: 0px 0px 0px 10px;
  width: 50%;
  height: 46px;
  border: none;
  cursor: pointer;
`

const ModalUpdataBtn = styled.button`
  border-radius: 0px 0px 0px 0px;
  width: 50%;
  height: 46px;
  background-color: #140c2d;
  border: none;
  cursor: pointer;
`

const ModalConfirmBtn = styled.button`
  border-radius: 0px 0px 10px 0px;
  width: 50%;
  height: 46px;
  background-color: #f25343;
  border: none;
  cursor: pointer;
`

const P = styled.p`
  font-size: 14px;
  color: #fff;
`
