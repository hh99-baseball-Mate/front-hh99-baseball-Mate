import React, { useEffect, useState } from "react"
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
import { clubImageSrc } from "../shared/clubImage"
import { Preview } from "../componentsGroupAdd/Preview"
import { useDispatch, useSelector } from "react-redux"
import { actionCreators as groupActions } from "../redux/modules/group"
import { GroupAddModal } from "../componentsGroupAdd/GroupAddModal"
import { useVolumeBtn } from "../customHook/useVolumeBtn"
import { useInputs } from "../customHook/useInputs"
import { usePreview } from "../customHook/usePreview"

export const GroupAdd = (props) => {
  const dispatch = useDispatch()

  // 선택한 구단에 대한 경기일정 리스트 state
  const selectTeam_list = useSelector((state) => state.group.selectTeam_list)

  // 커스텀 훅 인풋
  const [inputValue, onChange] = useInputs({
    title: "",
    selectTeam: "",
    content: "",
  })

  const { content, title, selectTeam } = inputValue

  // + - 버튼 커스텀 훅
  const [plusBtn, minusBtn, onChangeBtn, peopleLimit] = useVolumeBtn(0)

  // 이미지 미리보기/ 삭제 커스텀훅
  const [imgPreview, deletePreview, preview] = usePreview("")

  // 모달 보기 state
  const [showModal, setShowModal] = useState(false)

  // 경기일정 state
  const [groupDate, setGroupDate] = useState("")

  const showModalBtn = () => {
    if (selectTeam) setShowModal(!showModal)
    else window.alert("직관하고싶은 구단을 먼저 선택해주세요")
  }

  // 입력체크
  const submitBtn = (e) => {
    const emptyValue = Object.values(inputValue).map((e) => {
      return !e ? false : true
    })

    if (emptyValue.includes(false) || !groupDate) {
      window.alert("빈란을 채워주세요")
      // console.log("빈값있음")
      return
    }

    const formData = new FormData()

    formData.append("title", title)
    formData.append("groupDate", groupDate)
    formData.append("content", content)
    formData.append("peopleLimit", peopleLimit)
    formData.append("selectTeam", selectTeam)
    formData.append("file", preview)

    dispatch(groupActions.addGroupMD(formData))
    e.target.disabled = true
    for (const keyValue of formData) console.log(keyValue)
  }

  useEffect(() => {
    // 선택한 구단을 파라미터로 넘겨서 get 요청
    dispatch(groupActions.selectTeamMD(selectTeam))
  }, [selectTeam])

  return (
    <Container>
      <ArrowBack>직관 모임 생성</ArrowBack>

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
          <TextBox>
            <Text>일정선택</Text>

            {/* 일정 정보 */}
            <GameDate>
              {groupDate && <Text margin="0 10px">{groupDate}</Text>}
              <AiOutlineDown color="777777" onClick={showModalBtn} />
            </GameDate>
          </TextBox>

          {/* 일정선택 모달창 props 전달 */}
          {showModal ? (
            <GroupAddModal
              selectTeam_list={selectTeam_list}
              setGroupDate={setGroupDate}
              setShowModal={setShowModal}
            ></GroupAddModal>
          ) : (
            ""
          )}
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

const Option = styled.option`
  text-align: center;
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