import React, { useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import {
  ArrowBack,
  Buttons,
  Container,
  InputCheck,
  Inputs,
  Text,
} from "../components"
import { Picture } from "../componentsGroupAdd/Picture"
import { Preview } from "../componentsGroupAdd/Preview"
import { useInputs } from "../customHook/useInputs"
import { usePreview } from "../customHook/usePreview"
import { history } from "../redux/configStore"
import { actionCreators as goodsActions } from "../redux/modules/goods"

export const GoodsAdd = (props) => {
  const { defaultImg } = props

  const dispatch = useDispatch()

  // 인풋 커스텀훅
  const [inputValue, onChange] = useInputs({
    goodsName: "",
    goodsContent: "",
  })

  const { goodsName, goodsContent } = inputValue

  // 이미지 미리보기 /삭제 커스텀훅
  const [imgPreview, deletePreview, preview] = usePreview("")

  const submitBtn = (e) => {
    const emptyValue = Object.values(inputValue).map((e) => {
      return !e ? false : true
    })

    if (emptyValue.includes(false)) {
      window.alert("빈란을 채워주세요")
      // console.log("빈값있음")
      return
    }

    const formData = new FormData()

    formData.append("goodsName", goodsName)
    formData.append("goodsContent", goodsContent)
    formData.append("goodsPrice", null)
    formData.append("file", preview)

    dispatch(goodsActions.addGoodsMD(formData))
    e.target.disabled = true
    for (const keyValue of formData) console.log(keyValue)
  }

  return (
    <>
      <Container>
        <ArrowBack>
          <Text size="16px" center>
            굿즈 등록
          </Text>
        </ArrowBack>

        <Text margin="30px 0 7px 0">
          대표 이미지
          {preview && <InputCheck />}
        </Text>

        {/* 이미지 미리보기 */}
        <ImgBox>
          <Picture basic onChange={imgPreview}>
            {preview ? 1 : 0} / 1
          </Picture>
          <Preview
            name="goodsImg"
            src={preview ? URL.createObjectURL(preview) : defaultImg}
            onClick={deletePreview}
          ></Preview>
        </ImgBox>

        {/* 굿즈 타이틀 */}
        <Inputs
          name="goodsName"
          placeholder="내 굿즈의 이름을 적어주세요!"
          value={goodsName}
          onChange={onChange}
        >
          굿즈 이름
          {goodsName && <InputCheck />}
        </Inputs>

        {/* 굿즈 내용 */}
        <Inputs
          name="goodsContent"
          textarea
          placeholder="내 굿즈를 마음껏 소개해 주세요(최대500자)"
          value={goodsContent}
          onChange={onChange}
          height="147px"
        >
          굿즈 내용
          {goodsContent && <InputCheck />}
        </Inputs>

        <Buttons _onClick={submitBtn}>굿즈 등록</Buttons>
      </Container>
    </>
  )
}

GoodsAdd.defaultProps = {
  defaultImg:
    "https://lh3.googleusercontent.com/proxy/WEGePtNT0Kg0dwUYlFOdMR23NOcxunhlZL5opUfUeZN_IDr3id47Uj1ZX1P4xs1wOsm8E6wPkH3j02d5v2FUtj0wDZw-z_VN3dNozsZUGPKkdxw_4It4QNqdWUuNsTGZnF7pzD_anFXLxREOWVX0-78LTD2pmoIi",
}

const ImgBox = styled.div`
  display: flex;
  gap: 10px;
`