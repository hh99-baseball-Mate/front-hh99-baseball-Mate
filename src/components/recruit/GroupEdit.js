import React, { useEffect, useState } from "react"
import { Container, ArrowBack } from "../../components/common"
import { Buttons, Inputs, InputCheck, Text } from "../../components/element"
import {
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
  AiOutlineDown,
} from "react-icons/ai"
import styled from "styled-components"
import { clubImageSrc } from "../../shared/CSS/clubImage"
import { useDispatch, useSelector } from "react-redux"
import { actionCreators as groupActions } from "../../redux/modules/group"
import { GroupAddModal, Picture, Preview } from "../../components/group/"
import { groupDetailCreators } from "../../redux/modules/groupDetail"
import { useParams } from "react-router"
import {
  useS3Upload,
  useVolumeBtn,
  useInputs,
} from "../../components/customHook/"

const GroupEdit = (props) => {
  const params = useParams()
  const groupId = params.id

  const IMAGES_BASE_URL = process.env.REACT_APP_S3_GROUP_URL
  const ip = IMAGES_BASE_URL
  const dispatch = useDispatch()

  const selectTeam_list = useSelector((state) => state.group.selectTeam_list)

  const loadDetail = useSelector((state) => state.groupDetail.groupPage)

  const img = ip + loadDetail.filePath

  // 구단선택
  // const team = loadDetail.groupDate?.split("vs")[1]

  // 모달 보기 state
  const [preview, setPreview] = useState(img)

  // 인풋 커스텀훅
  const [inputValue, onChange] = useInputs({
    title: loadDetail?.title,
    content: loadDetail?.content,
    src: loadDetail ? ip + loadDetail.filePath : props.defaultImg,
  })

  const { content, title, selectTeam } = inputValue

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
  const [uploadFiles, fileName] = useS3Upload(preview, "group")

  // + - 버튼 커스텀 훅
  const [plusBtn, minusBtn, onChangeBtn, peopleLimit] = useVolumeBtn(1)

  // 모달 보기 state
  const [showModal, setShowModal] = useState(false)

  // 경기일정 state
  const [groupDate, setGroupDate] = useState(loadDetail.groupDate)

  const showModalBtn = () => {
    if (selectTeam) setShowModal(!showModal)
    else window.alert("일정은 수정할 수 없습니다.")
  }

  // 입력체크
  const submitBtn = (e) => {
    const emptyValue = Object.values(inputValue).map((e) => {
      return !e ? false : true
    })
    if (emptyValue.includes(false) || !preview) {
      window.alert("빈 란을 채워주세요")
      // console.log("빈값있음")
      return
    }

    uploadFiles(preview)

    const groupEditData = {
      title,
      groupDate,
      content,
      peopleLimit,
      filePath: preview ? fileName : "",
    }

    dispatch(groupDetailCreators.editGroupPageMW(groupId, groupEditData))
  }

  useEffect(() => {
    if (selectTeam) {
      // console.log(selectTeam, "asdasd")
      dispatch(groupActions.selectTeamMD(selectTeam))
    }
  }, [selectTeam])

  return (
    <Container>
      <ArrowBack>모임 수정</ArrowBack>

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


        {/* 일정 선택 */}
        <Grid>
          <TextBox>
            <Text>일정선택</Text>

            {/* 일정 정보 */}
            <GameDate>
              {loadDetail ? (
                <Text margin="0 10px">{loadDetail.groupDate}</Text>
              ) : (
                ""
              )}
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
          모임 수정
        </Buttons>
      </ButtonBox>
    </Container>
  )
}
export default GroupEdit

GroupEdit.defaultProps = {
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
