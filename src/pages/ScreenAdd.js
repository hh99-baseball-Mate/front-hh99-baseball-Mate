import React, { useState } from "react"
import {
  Inputs,
  Text,
  InputCheck,
  Container,
  ArrowBack,
  Buttons,
} from "../components"
import {
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
  AiOutlineDown,
} from "react-icons/ai"
import { Picture } from "../componentsGroupAdd/Picture"
import styled from "styled-components"
import { Preview } from "../componentsGroupAdd/Preview"
import { useDispatch } from "react-redux"
import { actionCreators as screenAction } from "../redux/modules/screen"
import { KaKaoMap } from "../componentsScreen/KaKaoMap"
import { Modal } from "../components/Modal"

import dayjs from "dayjs"
import "dayjs/locale/ko"

import DatePicker, { registerLocale } from "react-datepicker"
import { ko } from "date-fns/esm/locale"
import "react-datepicker/dist/react-datepicker.css"
import { useInputs } from "../customHook/useInputs"
import { useVolumeBtn } from "../customHook/useVolumeBtn"
import { useS3Upload } from "../customHook/useS3Upload"

export const ScreenAdd = (props) => {
  const dispatch = useDispatch()

  // 날짜 datePicker 라이브러리
  const [startDate, setStartDate] = useState("")
  const [preview, setPreview] = useState("")

  // datePicker 한글버전
  registerLocale("ko", ko)
  dayjs.locale("ko")

  // 사용자가 날짜 선택시 최소날짜 ~ 최대날짜 2주를 주기 위함
  const minDate = dayjs().add(1, "day").format("YYYY-MM-DD")
  const maxDate = dayjs().add(15, "day").format("YYYY-MM-DD")

  // 커스텀 훅 인풋
  const [inputValue, onChange] = useInputs({
    title: "",
    content: "",
  })

  // + - 버튼 커스텀 훅
  const [plusBtn, minusBtn, onChangeBtn, peopleLimit] = useVolumeBtn(1)

  // 이미지 미리보기 /삭제하기 커스텀 훅

  const imgPreview = (e) => {
    setPreview(e.target.files[0])
  }

  const deletePreview = () => {
    if (!preview) {
      window.alert("삭제 할 사진이 없어요")
      return
    }
    setPreview("")
  }

  // 이미지 S3 저장 커스텀 훅 이미지 경로
  const [uploadFile, fileName] = useS3Upload(preview, "screen")

  const { content, title } = inputValue

  // 장소 설정 state
  const [location, setLocation] = useState("")
  const [roadAddress, setRoadAddress] = useState("")

  // 모달 보기 state
  const [showModal, setShowModal] = useState(false)

  // 입력체크
  const submitBtn = (e) => {
    // 입력 state 중에 빈값이 있으면 fasle 없으면 true
    const emptyValue = Object.values(inputValue).map((e) => {
      return !e ? false : true
    })

    const groupDate = dayjs(startDate).format("MM.DD (dd)")

    // 나머지 입력값 장소 / 시간에 대해서도 false를 포함하고 있다면 빈란이 있습니다 공지//

    if (emptyValue.includes(false) || !location || !startDate) {
      window.alert("빈란이 있습니다")
      return
    } else {
      // 아니면 폼데이터 post 디스패치

      const placeInfomation = roadAddress.substring(0, 2)

      uploadFile(preview)

      const screenInfo = {
        title,
        groupDate,
        content,
        peopleLimit,
        selectPlace: location,
        placeInfomation,
        filePath: preview ? fileName : "",
      }

      dispatch(screenAction.screenAddMD(screenInfo))
    }
  }

  return (
    <Container>
      <ArrowBack>스크린야구 모임 생성</ArrowBack>

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
          <TextBox onClick={() => setShowModal(true)}>
            <TextIcons>
              <Text>장소선택</Text>
              {location && <InputCheck />}
            </TextIcons>
            {/* 일정 정보 */}
            <GameDate>
              <Text margin="0 10px">{location}</Text>
              <AiOutlineDown color="777777" />
            </GameDate>
          </TextBox>
        </Grid>

        {/* 카카오지도 모달 */}
        {showModal ? (
          <Modal bottom height="80%" margin="0 -20px">
            <CloseBtn onClick={() => setShowModal(false)}>
              <Buttons>닫기</Buttons>
            </CloseBtn>
            <KaKaoMap
              setLocation={setLocation}
              setShowModal={setShowModal}
              setRoadAddress={setRoadAddress}
            />
          </Modal>
        ) : null}

        {/* 일정 선택 */}
        <Grid>
          <TextBox>
            <TextIcons>
              <Text>일정선택</Text>
              {startDate && <InputCheck />}
            </TextIcons>

            {/* DatePicker 영역 설정 */}
            <div style={{ width: "100px" }}>
              <SDatePicker
                locale="ko"
                minDate={new Date(minDate)}
                maxDate={new Date(maxDate)}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                popperPlacement="bottom"
                placeholderText="시간 선택"
                dateFormat="MM월 dd일 (eee)"
              />
            </div>
          </TextBox>
        </Grid>

        {/* <div>인원수 선택</div> */}
        <PeopleSelectContainer>
          <Text>인원수 선택</Text>
          {peopleLimit > 0 ? <InputCheck /> : null}

          {/* 인원수 + - 버튼 */}
          <PeopleSelect>
            <AiOutlineMinusCircle color="#498C9A" onClick={minusBtn} />
            <PeopleCount>
              <Text
                center
                size="18px"
                name="peopleLimit"
                onChange={onChangeBtn}
              >
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
          placeholder="모임소개를 해주세요 (최대길이 500자)"
          onChange={onChange}
          maxLength="500"
          height="147px"
        >
          모임소개
          {content && <InputCheck />}
        </Inputs>

        {/* 이미지 미리보기 */}
        <Text margin="20px 0">
          사진
          {preview && <InputCheck />}
        </Text>

        <ImgBox>
          {/* 기본이미지 */}
          <Picture basic onChange={imgPreview} name="file">
            {preview ? 1 : 0} / 1
          </Picture>

          {/* 업로드 이미지 미리보기 */}
          <Preview
            src={preview ? URL.createObjectURL(preview) : props.defaultImg}
            name="preview"
            onClick={deletePreview}
          />
        </ImgBox>
      </div>

      <Buttons _onClick={submitBtn}>모임생성</Buttons>
    </Container>
  )
}

ScreenAdd.defaultProps = {
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

const TextIcons = styled.div`
  display: flex;
  align-items: center;
`
const PeopleCount = styled.div`
  width: 50px;
`

const PeopleSelectContainer = styled.div`
  margin: 24px 0 40px;
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

const ImgBox = styled.div`
  display: flex;
  gap: 10px;
`
const TextBox = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  cursor: pointer;
  justify-content: space-between;
`

const GameDate = styled.div`
  display: flex;
`
const CloseBtn = styled.div`
  position: absolute;
  z-index: 99;
  top: 5px;
  width: 50px;
  background-color: transparent;
  border: none;
  opacity: 0.8;
  right: 5px;
`

const SDatePicker = styled(DatePicker)`
  width: 100px;
  font-size: 14px;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 0 5px;
  border: none;
  :focus {
    outline: none !important;
    /* border: 1px solid #f25343; */
  }
`
