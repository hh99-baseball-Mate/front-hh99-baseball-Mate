import React from "react";
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
import { useInputs } from "../customHook/useInputs";
import { usePreview } from "../customHook/usePreview";
import { history } from "../redux/configStore";
import { actionCreators as actionCr } from "../redux/modules/community";
const CommunityAdd = (props) => {
  const dispatch = useDispatch();
  const { page, addPost } = useSelector((state) => state.community);
  const user_list = useSelector((state) => state.user.user_info.myteam);
  //이미지 미리보기 삭제 커스텀훅
  const [imgPreview, deletePreview, preview] = usePreview("");

  // 입력창
  const [inputValue, onChange] = useInputs({
    content: "",
    title: null,
    filePath: "",
    myTeam: "",
    userName: "",
    communityUserPicture: "",
  });

  const { content, title, filePath, myTeam, userName, communityUserPicture } =
    inputValue;

  //입력체크
  const submitBtn = (e) => {
    const emptyValue = Object.values(inputValue).map((e) => {
      return !e ? false : true
    })

    if (inputValue === null) {
      window.alert("빈란을 채워주세요")
      // console.log("빈값있음")
      return
    }

    if (inputValue !== null) {
      window.alert("작성하신 게시글은 커뮤니티에 올라갑니다.")
    }

    // const formData = new FormData();

    // formData.append("content", content);
    // formData.append("file", preview);

    dispatch(actionCr.postAddAPI(content))
    e.target.disabled = true
    // for (const keyValue of content) console.log(keyValue);
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
        page={page}
        addPost={addPost}
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
