import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { ArrowBack, Container } from "../../components/common"
import { Buttons, InputCheck, Inputs, Text } from "../../components/element"
import { Picture, Preview } from "../../components/group/"
import { useS3Upload } from "../../components/customHook/"
import { actionCreators as communityDetailCr } from "../../redux/modules/communityDetail"

const EditCommunComment = (props) => {
  const dispatch = useDispatch()
  //사진
  const ip = process.env.REACT_APP_S3_COMMU_URL
  //상세페이지 정보 가져오기
  const detail_list = useSelector((state) => state.communityDetail.detail_list)

  //커뮤니티 사진
  const img = ip + detail_list.filePath
  //커뮤니티id
  const communityId = props.match.params.communityId
  //사진 값
  const [preview, setPreview] = useState(img)
  //인풋값 state
  const [inputValue, setInputValue] = useState({
    content: detail_list?.content,
    src: detail_list ? ip + detail_list.filePath : props.defaultImg,
  })

  const { content, src } = inputValue

  //이미지 업로드
  const imgPreview = (e) => {
    setPreview(e.target.files[0])
  }

  //미리보기 삭제
  const deletePreview = () => {
    if (!preview) {
      window.alert("삭제할 사진이 없습니다.")
      return
    }
    setPreview("")
  }
  //3S 사진
  const [uploadFile, fileName] = useS3Upload(preview, "commu")

  //인풋 값 추적
  const onChange = (e) => {
    const { name, value } = e.target
    setInputValue({
      ...inputValue,
      [name]: value,
    })
  }

  //입력체크
  const submitBtn = (e) => {
    uploadFile(preview)
    //편집 내용
    const commuEditInfo = {
      content: inputValue.content,
      myTeam: null,
      filePath: preview ? fileName : "",
    }
    // 업데이트 dispatch
    dispatch(communityDetailCr.updateCommunityAPI(communityId, commuEditInfo))
    e.target.disabled = true
  }

  return (
    <div>
      <ArrowBack>커뮤니티 글작성</ArrowBack>
      <Border />
      {/* 글작성 */}
      <Inputs
        textarea
        width="100%"
        name="content"
        value={content}
        maxLength="500"
        onChange={onChange}
        placeholder="내용을 입력해주세요."
        height="400px"
        // onChange={(e) => setCotent(e.target.value)}
      >
        {/* 안에 내용 */}
        {content && <InputCheck />}
      </Inputs>

      <Container>
        {/* 이미지 미리 */}
        <Text margin="7px 0">
          사진
          {preview && <InputCheck />}
        </Text>

        {/* 기본이미지 */}
        <ImgBox>
          <Picture basic onChange={imgPreview} name="file">
            {preview ? 1 : 0}/1
          </Picture>
          {/* 업로드 이미지 미리 */}
          <Preview
            //이미지가 받아온 이미지롸 같으면 받아온 이미지
            src={
              preview === img
                ? preview
                : //프리뷰가 빈값이면 빈이미지 또는 새로운 이미지
                preview === ""
                ? props.defaultImg
                : URL.createObjectURL(preview)
            }
            name="preview"
            onClick={deletePreview}
          />
        </ImgBox>
        <Buttons _onClick={submitBtn}>글 등록</Buttons>
      </Container>
    </div>
  )
}

export default EditCommunComment

//사진 빈값 기본이미지
EditCommunComment.defaultProps = {
  defaultImg:
    "https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image-620x600.jpg",
}

const Border = styled.div`
  width: 100%;
  border: 1px solid #e7e7e7;
  margin: ${(props) => props.margin};
`

const ImgBox = styled.div`
  display: flex;
  gap: 10px;
`
