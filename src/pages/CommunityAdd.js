import React from "react";
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
import { useInputs } from "../customHook/useInputs";
import { usePreview } from "../customHook/usePreview";

const CommunityAdd = (props) => {
  //이미지 미리보기 삭제 커스텀훅
  const [imgPreview, deletePreview, preview] = usePreview("");

  // 입력창
  const [inputValue, onChange] = useInputs({
    content: "",
  });

  const { content } = inputValue;

  //입력체크
  const submitBtn = (e) => {
    const emptyValue = Object.values(inputValue).map((e) => {
      return !e ? false : true;
    });

    if (!inputValue) {
      window.alert("빈란을 채워주세요");
      return;
    }
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
        value={content}
        placeholder="내용을 입력해주세요."
        height="400px"
        onChange={onChange}
      ></Inputs>
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
        {/* <Buttons _onClick={submitBtn}>글 등록</Buttons> */}
      </Container>
    </div>
  );
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
