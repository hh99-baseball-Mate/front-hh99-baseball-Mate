import React, { useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { ArrowBack, Container } from "../../components/common"
import { Buttons, InputCheck, Inputs, Text } from "../../components/element"
import { Picture } from "../../components/group/Picture"
import { Preview } from "../../components/group/Preview"
import { useInputs, useS3Upload } from "../../components/customHook/"
import { actionCreators as goodsActions } from "../../redux/modules/goods"

const GoodsAdd = (props) => {
  const { defaultImg } = props

  const dispatch = useDispatch()

  const [preview, setPreview] = useState("")

  // 인풋 커스텀훅
  const [inputValue, onChange] = useInputs({
    goodsName: "",
    goodsContent: "",
  })

  const { goodsName, goodsContent } = inputValue

  // 이미지 미리보기
  const imgPreview = (e) => {
    setPreview(e.target.files[0])
  }

  // 이미지 미리보기 삭제
  const deletePreview = () => {
    if (!preview) {
      window.alert("삭제 할 사진이 없어요")
      return
    }
    setPreview("")
  }

  // 이미지 S3 저장 커스텀 훅 -> 이미지 / 저장경로 경로
  const [uploadFile, fileName] = useS3Upload(preview, "goods")

  // 입력체크
  const submitBtn = (e) => {
    const emptyValue = Object.values(inputValue).map((e) => {
      return !e ? false : true
    })
    if (emptyValue.includes(false) || !preview) {
      window.alert("굿즈는 사진이 필수입니다")
      // console.log("빈값있음")
      return
    }

    uploadFile(preview)

    const goodInfo = {
      goodsName,
      goodsContent,
      goodsPrice: null,
      filePath: preview ? fileName : "",
    }

    // 트랜잭션 하기

    dispatch(goodsActions.addGoodsMD(goodInfo))
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
          maxLength="500"
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

export default GoodsAdd

GoodsAdd.defaultProps = {
  defaultImg:
    "https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image-620x600.jpg",
}

const ImgBox = styled.div`
  display: flex;
  gap: 10px;
`
