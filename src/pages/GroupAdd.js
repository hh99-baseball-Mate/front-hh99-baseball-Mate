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
import { useDispatch, useSelector } from "react-redux"
import { actionCreators as groupActions } from "../redux/modules/group"
import { history } from "../redux/configStore"
import axios from "axios"
import { img } from "../lib/axios"

export const GroupAdd = (props) => {
  const dispatch = useDispatch()

  const selectTeam_list = useSelector((state) => state.group.selectTeam_list)

  console.log(selectTeam_list)
  // 인풋 값 state
  const [inputValue, setInputValue] = useState({
    title: "",
    selectTeam: "",
    groupDate: "",
    peopleLimit: 0,
    content: "",
  })

  const [preview, setPreview] = useState("")

  const { content, peopleLimit, title, selectTeam, groupDate } = inputValue

  // 이미지 업로드 / 미리보기

  const imgPreview = async (e) => {
    setPreview(e.target.files[0])
  }

  // 미리보기 삭제,

  const deletePreview = () => {
    if (!preview.base64) {
      window.alert("삭제 할 사진이 없어요")
      return
    }

    setPreview("")
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

  useEffect(() => {
    if (selectTeam) {
      console.log(selectTeam, "asdasd")
      dispatch(groupActions.selectTeamMD(selectTeam))
    }
  }, [selectTeam])

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
    // const _emptyValue = Object.values(inputValue).map((e) => {
    //   if (!e) {
    //     return false
    //   }
    // })

    // const emptyValue = _emptyValue.includes(false)

    // if (emptyValue) {
    //   window.alert("빈란을 채워주세요")
    //   console.log("빈값있음")
    //   return
    // }

    const formData = new FormData()

    formData.append("title", inputValue.title)
    formData.append("groupDate", inputValue.groupDate)
    formData.append("content", inputValue.content)
    formData.append("peopleLimit", inputValue.peopleLimit)
    formData.append("selectTeam", inputValue.selectTeam)
    formData.append("file", preview)

    dispatch(groupActions.addGroupMD(formData))
    e.target.disabled = true
    // for (const keyValue of formData) console.log(keyValue)
  }

  return (
    <Container margin="0px auto">
      <ArrowBack>모임 생성</ArrowBack>

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
            {selectTeam && <InputCheck />}
          </Text>
          <Inputs
            name="selectTeam"
            value={selectTeam}
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
            {/* <Option value="">경기일정 선택</Option>
            <Option value="롯데">롯데</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option> */}
            {selectTeam_list.map((e) => (
              <Option>
                {e.awayteam}vs {e.hometeam}
              </Option>
            ))}
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
          <Picture basic onChange={imgPreview} name="file">
            {preview.base64 ? 1 : 0} / 1
          </Picture>
          <Preview
            src={preview ? URL.createObjectURL(preview) : props.defaultImg}
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
