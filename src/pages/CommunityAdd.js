import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  ArrowBack,
  Buttons,
  Container,
  InputCheck,
  Inputs,
  Text,
} from "../components";
import { Picture } from "../componentsGroupAdd/Picture";
import { Preview } from "../componentsGroupAdd/Preview";
import { useS3Upload } from "../customHook/useS3Upload";
import { actionCreators as actionCr } from "../redux/modules/community";
const CommunityAdd = (props) => {
  const dispatch = useDispatch();

  // 입력창
  const [content, setCotent] = useState("");
  //사진
  const [preview, setPreview] = useState("");

  // 이미지 S3 저장 커스텀 훅 -> 이미지 / 저장경로 경로
  const [uploadFile, fileName] = useS3Upload(preview, "commu");

  //이미지수정
  const imgPreview = (e) => {
    setPreview(e.target.files[0]);
  };

  // 이미지 미리보기 삭제
  const deletePreview = () => {
    if (!preview) {
      window.alert("삭제 할 사진이 없어요");
      return;
    }
    setPreview("");
  };

  //입력체크
  const submitBtn = (e) => {
    if (!content) {
      window.alert("빈란을 채워주세요");
      // console.log("빈값있음")
      return;
    }
    //커뮤니티 수정될 정보
    const communityInfo = {
      content,
      myTeam: null,
      filePath: preview ? fileName : "",
    };

    // S3 업로드
    uploadFile(preview);

    //커뮤니티 수정정보 불러오기
    dispatch(actionCr.postAddAPI(communityInfo));
    e.target.disabled = true;
  };

  return (
    <div>
      <ArrowBack>커뮤니티 글작성</ArrowBack>
      <Border />
      {/* 글작성 */}
      <Inputs
        textarea
        width="100%"
        name="content"
        maxLength="500"
        value={content}
        placeholder="내용을 입력해주세요."
        height="400px"
        maxLength="500"
        onChange={(e) => setCotent(e.target.value)}
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
            src={preview ? URL.createObjectURL(preview) : props.defaultImg}
            name="preview"
            onClick={deletePreview}
          />
        </ImgBox>
        <Buttons _onClick={submitBtn}>글 등록</Buttons>
      </Container>
    </div>
  );
};
CommunityAdd.defaultProps = {
  defaultImg:
    "https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image-620x600.jpg",
};

export default CommunityAdd;

const Border = styled.div`
  width: 100%;
  border: 1px solid #e7e7e7;
  margin: ${(props) => props.margin};
`;

const ImgBox = styled.div`
  display: flex;
  gap: 10px;
`;
