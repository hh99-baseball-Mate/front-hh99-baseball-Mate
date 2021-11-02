import React, { useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import {
  Buttons,
  Container,
  Header,
  InputCheck,
  Inputs,
  Text,
} from "../components"
import { Picture } from "../componentsGroupAdd/Picture"
import { Preview } from "../componentsGroupAdd/Preview"
import { history } from "../redux/configStore"
import { actionCreators as goodsActions } from "../redux/modules/goods"

export const GoodsAdd = (props) => {
  const { defaultImg } = props

  const dispatch = useDispatch()

  const [inputValue, setInputValue] = useState({
    goodsName: "",
    goodsContent: "",
    goodsImg: {
      name: "",
      size: 0,
      base64: "",
      type: "",
    },
  })

  const imgPreview = (e) => {
    const img = e.target.files[0]

    let reader = new FileReader()

    reader.onloadend = () => {
      setInputValue({
        ...inputValue,
        goodsImg: {
          name: img.name,
          size: img.size,
          base64: reader.result,
          type: img.type,
        },
      })
    }
    if (img) {
      reader.readAsDataURL(img)
    }
  }

  const deleteImg = () => {
    if (!goodsImg.base64) {
      window.alert("삭제 할 사진이 없어요")

      return
    }
    setInputValue({
      ...inputValue,
      goodsImg: {
        name: "",
        size: "",
        type: 0,
        base64: "",
      },
    })
  }

  const { goodsName, goodsContent, goodsImg } = inputValue

  const onChange = (e) => {
    const { name, value } = e.target
    setInputValue({
      ...inputValue,
      [name]: value,
    })
  }

  const submitBtn = (e) => {
    const _emptyValue = Object.values(inputValue).map((e) => {
      if (!e || e.base64 === "") {
        return false
      }
    })

    const emptyValue = _emptyValue.includes(false)

    if (emptyValue) {
      window.alert("빈란을 채워주세요")
      console.log("빈값있음")
      return
    }
    dispatch(goodsActions.addGoodsMD(inputValue))
    e.target.disabled = true
    console.log("빈값이 없음")
  }

  return (
    <Container>
      <Header
        onClick={() => {
          history.goBack()
        }}
      >
        굿즈 등록
      </Header>
      <Text margin="30px 0 7px 0">
        대표 이미지
        {goodsImg.base64 && <InputCheck />}
      </Text>
      <ImgBox>
        <Picture basic onChange={imgPreview}>
          {goodsImg.base64 ? 1 : 0} / 1
        </Picture>
        <Preview
          name="goodsImg"
          src={goodsImg.base64 ? goodsImg.base64 : defaultImg}
          onClick={deleteImg}
        ></Preview>
      </ImgBox>

      <Inputs
        name="goodsName"
        placeholder="내 굿즈의 이름을 적어주세요!"
        value={goodsName}
        onChange={onChange}
      >
        굿즈 이름
        {goodsName && <InputCheck />}
      </Inputs>
      <Inputs
        name="goodsContent"
        textarea
        placeholder="내 굿즈를 마음껏 소개해 주세요(최대500자)"
        value={goodsContent}
        onChange={onChange}
      >
        굿즈 내용
        {goodsContent && <InputCheck />}
      </Inputs>

      <ButtonBox>
        <Buttons complete _onClick={submitBtn}>
          굿즈 등록
        </Buttons>
      </ButtonBox>
    </Container>
  )
}

const ImgBox = styled.div`
  display: flex;
  gap: 10px;
`

GoodsAdd.defaultProps = {
  defaultImg:
    "https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image-620x600.jpg",
}

const ButtonBox = styled.div`
  position: fixed;
  width: 335px;
  bottom: 20px;
`
