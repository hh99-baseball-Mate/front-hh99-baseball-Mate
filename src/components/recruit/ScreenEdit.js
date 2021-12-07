import React, { useEffect, useState } from "react"
import styled from "styled-components"

import { Container, ArrowBack, Modal } from "../../components/common"
import { Inputs, Text, InputCheck, Buttons } from "../../components/element"
import {
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
  AiOutlineDown,
} from "react-icons/ai"
import { Picture, Preview } from "../../components/group/"
import { useDispatch, useSelector } from "react-redux"
import { KaKaoMap } from "../../components/screen/KaKaoMap"
import { screenDetailCreators } from "../../redux/modules/screenDetail"

import dayjs from "dayjs"
import "dayjs/locale/ko"

import DatePicker, { registerLocale } from "react-datepicker"
import { ko } from "date-fns/esm/locale"
import "react-datepicker/dist/react-datepicker.css"
import { useParams } from "react-router"
import {
  useS3Upload,
  useVolumeBtn,
  useInputs,
} from "../../components/customHook"

const ScreenEdit = (props) => {
  const params = useParams()
  const screenId = params.id

  const ip = process.env.REACT_APP_S3_SCREEN_URL
  const dispatch = useDispatch()

  const loadDetail = useSelector((state) => state.screenDetail.screenPage)
  const mylist = useSelector((state) => state.screenDetail.screenMylist)

  const img = ip + loadDetail.filePath
  // console.log("스야수정",loadDetail)
  // 날짜 datePicker 라이브러리

  // 날짜 datePicker 라이브러리
  const [startDate, setStartDate] = useState("")
  const [preview, setPreview] = useState(img)

  // datePicker 한글버전
  registerLocale("ko", ko)
  dayjs.locale("ko")

  // 사용자가 날짜 선택시 최소날짜 ~ 최대날짜 2주를 주기 위함
  const minDate = dayjs().add(1, "day").format("YYYY-MM-DD")
  const maxDate = dayjs().add(15, "day").format("YYYY-MM-DD")

  // 커스텀 훅 인풋
  const [inputValue, onChange] = useInputs({
    title: loadDetail.title,
    content: loadDetail.content,
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
  const [uploadFiles, fileName] = useS3Upload(preview, "screen")

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

    if (emptyValue.includes(false) || !location || !startDate) {
      window.alert("빈란이 있습니다")
      return
    } else {
      // 아니면 폼데이터 post 디스패치

      const formData = new FormData()

      const placeInfomation = roadAddress.substring(0, 2)

      uploadFiles(preview)

      const screenEditInfo = {
        title,
        groupDate,
        content,
        peopleLimit: loadDetail.peopleLimit,
        selectPlace: location,
        placeInfomation,
        filePath: preview ? fileName : "",
      }

      e.target.disabled = true

      dispatch(screenDetailCreators.editGroupPageMW(screenId, screenEditInfo))
    }
  }

  return (
    <Container>
      <ArrowBack>스크린야구 모임 수정</ArrowBack>

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
          <Modal bottom height="650px">
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
              {/* {startDate && <InputCheck />} */}
            </TextIcons>

            {/* DatePicker 영역 설정 */}
            <div style={{ width: "100px" }}>
              <SDatePicker
                locale="ko"
                minDate={new Date(minDate)}
                maxDate={new Date(maxDate)}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                // showTimeSelect
                // isClearable
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
          {/* <Preview
            src={preview ? URL.createObjectURL(preview) : props.defaultImg}
            name="preview"
            onClick={deletePreview}
          /> */}

          <Preview
            src={
              // 이미지가 받아온 이미지와 같으면 받아온 이미지
              preview === img
                ? preview
                : // 프리뷰가 빈값이면 빈이미지, 아니면 새로운 이미지
                preview === ""
                ? props.defaultImg
                : URL.createObjectURL(preview)
            }
            name="preview"
            onClick={deletePreview}
          />
        </ImgBox>
      </div>

      <ButtonBox>
        <Buttons complete _onClick={submitBtn}>
          모임수정
        </Buttons>
      </ButtonBox>
    </Container>
  )
}

export default ScreenEdit

ScreenEdit.defaultProps = {
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

const ButtonBox = styled.div`
  position: fixed;
  width: 335px;
  bottom: 20px;
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
