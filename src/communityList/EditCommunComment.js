import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import Community from "../pages/Community";
import { actionCreators as actionCr } from "../redux/modules/community";
import { actionCreators as communityDetailCr } from "../redux/modules/communityDetail";

export const EditCommunComment = (props) => {
  const dispatch = useDispatch();

  const card_list = useSelector((state) => state.community.card_list);

  const ip = process.env.REACT_APP_S3_COMMU_URL;
  //상세페이지 정보 가져오기
  const detail_list = useSelector((state) => state.communityDetail.detail_list);
  const img = ip + detail_list.filePath;

  const communityId = props.match.params.communityId;

  const [preview, setPreview] = useState(img);
  // //인풋값 state
  const [inputValue, setInputValue] = useState({
    content: detail_list?.content,
    src: detail_list ? ip + detail_list.filePath : props.defaultImg,
  });

  const { content, src } = inputValue;

  //디테일 정보 가져오기
  // useEffect(() => {
  //   dispatch(communityDetailCr.getCommunDetailAPI(communityId));
  // }, [inputValue]);

  //이미지 업로드
  const imgPreview = (e) => {
    setPreview(e.target.files[0]);
  };

  //미리보기 삭제
  const deletePreview = () => {
    if (!preview) {
      window.alert("삭제할 사진이 없습니다.");
      return;
    }
    setPreview("");
  };

  const [uploadFile, fileName] = useS3Upload(preview, "commu");

  //인풋 값 추적
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  //입력체크
  const submitBtn = (e) => {
    uploadFile(preview);

    const commuEditInfo = {
      content: inputValue.content,
      myTeam: null,
      filePath: preview ? fileName : "",
    }

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
  );
};

EditCommunComment.defaultProps = {
  defaultImg:
    "https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image-620x600.jpg",
};

const Border = styled.div`
  width: 100%;
  border: 1px solid #e7e7e7;
  margin: ${(props) => props.margin};
`;

const ImgBox = styled.div`
  display: flex;
  gap: 10px;
`;
