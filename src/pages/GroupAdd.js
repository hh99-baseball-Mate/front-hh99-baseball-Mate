import React, { useEffect, useState } from "react"
import {
  Inputs,
  Text,
  InputCheck,
  Container,
  ArrowBack,
  Buttons,
} from "../components"
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai"
import { Picture } from "../componentsGroupAdd/Picture"
import styled from "styled-components"
import { clubImageSrc } from "../shared/clubImage"
import { Preview } from "../componentsGroupAdd/Preview"
import { useDispatch } from "react-redux"
import { actionCreators as groupActions } from "../redux/modules/group"
import { history } from "../redux/configStore"

export const GroupAdd = (props) => {
  const dispatch = useDispatch()

  // 인풋 값 state
  const [inputValue, setInputValue] = useState({
    title: "",
    choiceClub: "",
    groupDate: "",
    peopleLimit: 0,
    content: "",
    preview: {
      name: "",
      size: 0,
      type: "",
      base64: "",
    },
  })

  const { content, peopleLimit, title, choiceClub, groupDate, preview } =
    inputValue

  // 이미지 업로드 / 미리보기

  const imgPreview = (e) => {
    const img = e.target.files[0]

    let reader = new FileReader()

    reader.onloadend = () => {
      setInputValue({
        ...inputValue,
        preview: {
          name: img.name,
          size: img.size,
          type: img.type,
          base64: reader.result,
        },
      })
    }
    if (img) {
      reader.readAsDataURL(img)
    }
  }

  // 미리보기 삭제,

  const deletePreview = () => {
    if (!inputValue.preview.base64) {
      window.alert("삭제 할 사진이 없어요")
      return
    }

    setInputValue({
      ...inputValue,
      preview: {
        name: "",
        size: 0,
        type: "",
        base64: "",
      },
    })
    console.log("삭제를 해야되는데..")
  }

  // 인풋 입력 값 추적 e.target.value 대행

  const onChange = (e) => {
    const { name, value } = e.target
    setInputValue({
      ...inputValue,
      [name]: value,
    })
  }

  //  인원수 + 버튼
  const plusBtn = () => {
    if (peopleLimit < 8) {
      setInputValue({
        ...inputValue,
        peopleLimit: peopleLimit + 1,
      })
    } else {
      window.alert("8명 이상은 안됩니다")
      return
    }
  }

  // 인원수 - 버튼
  const minusBtn = () => {
    if (peopleLimit !== 0) {
      setInputValue({
        ...inputValue,
        peopleLimit: peopleLimit - 1,
      })
    } else {
      window.alert("0이하는 선택불가")
    }
  }

  // 입력체크
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

    dispatch(groupActions.addGroupMD(inputValue))
    e.target.disabled = true
    console.log("빈값이 없음")
  }

  return (
    <Container margin="0px auto">
      <ArrowBack onClick={() => {
        history.goBack()
      }}>모임 생성</ArrowBack>

      {/* 모임 타이틀 */}
      <div style={{ marginTop: "15px" }}>
        <Inputs
          value={title}
          name="title"
          onChange={onChange}
          placeholder="모임명을 입력해주세요"
        >
          모임명
          {title && <InputCheck />}
        </Inputs>

        {/* 구단선택 */}
        <Grid>
          <Text>
            구단선택
            {choiceClub && <InputCheck />}
          </Text>
          <Inputs
            name="choiceClub"
            value={choiceClub}
            dropdown
            onChange={onChange}
          >
            <Option value="">구단선택</Option>
            {clubImageSrc.map((e) => (
              <Option key={e.id} value={e.name}>
                {e.name}
              </Option>
            ))}
          </Inputs>
        </Grid>

        {/* 일정 선택 */}
        <Grid>
          <Text>
            일정선택
            {groupDate && <InputCheck />}
          </Text>
          <Inputs
            dropdown
            name="groupDate"
            value={groupDate}
            onChange={onChange}
          >
            <Option value="">경기일정 선택</Option>
            <Option value="롯데">롯데</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
          </Inputs>
        </Grid>

        {/* <div>인원수 선택</div> */}
        <PeopleSelectContainer>
          <Text>인원수 선택</Text>
          {peopleLimit > 0 ? <InputCheck /> : null}

          {/* 인원수 + - 버튼 */}
          <PeopleSelect>
            <AiOutlineMinusCircle color="#498C9A" onClick={minusBtn} />
            <PeopleCount>
              <Text center size="18px" name="peopleLimit" onChange={onChange}>
                {peopleLimit}
              </Text>
            </PeopleCount>
            <AiOutlinePlusCircle color="#498C9A" onClick={plusBtn} />
          </PeopleSelect>
        </PeopleSelectContainer>

        {/* 모임소개 글 */}
        <Inputs
          textarea
          name="content"
          value={content}
          placeholder="모임소개를 해주세요"
          onChange={onChange}
        >
          모임소개
          {content && <InputCheck />}
        </Inputs>

        {/* 이미지 미리보기 */}
        <Text margin="20px 0">
          사진
          {preview.base64 && <InputCheck />}
        </Text>

        <ImgBox>
          <Picture basic onChange={imgPreview} name="fileList">
            {preview.base64 ? 1 : 0} / 1
          </Picture>
          <Preview
            src={preview.base64 ? preview.base64 : props.defaultImg}
            name="preview"
            onClick={deletePreview}
          />
        </ImgBox>
      </div>

      <ButtonBox>
        <Buttons complete _onClick={submitBtn}>
          모임생성
        </Buttons>
      </ButtonBox>
    </Container>
  )
}

GroupAdd.defaultProps = {
  defaultImg:
    "https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image-620x600.jpg",
}

const Grid = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e7e7e7;
`

const ButtonBox = styled.div`
  position: fixed;
  width: 335px;
  bottom: 20px;
`

const PeopleCount = styled.div`
  width: 50px;
`

const PeopleSelectContainer = styled.div`
  margin: 24px 0;
  display: flex;
  position: relative;
  align-items: center;
`

const PeopleSelect = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0px;
`

const Option = styled.option`
  text-align: center;
`

const ImgBox = styled.div`
  display: flex;
  gap: 10px;
`
