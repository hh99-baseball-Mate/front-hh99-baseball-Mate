import React, { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import { screenDetailCreators } from "../redux/modules/screenDetail";
import Progress from "../components/Progress";
import { getCookie } from '../shared/Cookie';

import heart_join from "../shared/icon/groupDetail/heart_join.svg"
import heart_null from "../shared/icon/groupDetail/heart_null.svg"
import calendar from "../shared/icon/calendar.svg"
import location from "../shared/icon/location.svg"
import colorUsers from "../shared/icon/colorUsers.svg"
import users from "../shared/icon/users.svg"



const Info = memo((props) => {
  const IMAGES_BASE_URL = process.env.REACT_APP_IMAGES_BASE_URL
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()
  const screenId = params.screenId

  // 사진 ip주소 + 사진이름 조합
  const ip = IMAGES_BASE_URL
  const img = props.filePath
  const imageUrl = ip + img

  // 기본 로그인일 때 프로필 사진
  const profileImg = ip + props.createdUserProfileImg

  // kakaocdn (카카오 프사인지 확인)
  const kakaoCheck = props.createdUserProfileImg?.split(".")[1]
  const kakaoImg = props.createdUserProfileImg


  const cookie = getCookie("is_login");
  // 게시글 좋아요 누른것 표시
  // useEffect(() => {
  //   if (props.likePost !== -1) {
  //     props.setHeart(true)
  //     return
  //   } else {
  //     props.setHeart(false)
  //   }
  // }, [props.likePost])

  // console.log("찜", props.heart, myScreenLikesList)

  // 모집마감 표시
  // useEffect(() => {
  //   if (props.dday < 1) {
  //     props.setClose(true)
  //   } else {
  //     props.setClose(false)
  //   }
  // }, [props])

  // console.log("props.heart", props?.heart)

  // 찜(하트) 버튼
  const heartBtn = () => {
    if (!cookie) {
      window.alert("로그인 후 이용해주세요");
      return;
    }
    props.setHeart(!props?.heart)
    dispatch(screenDetailCreators.likePostMW(props.id, props?.heart))
  }

  // 수정버튼
  const editBtn = () => {
    history.push(`/screenedit/${screenId}`)
  }

  // 삭제버튼
  const delBtn = () => {
    if (window.confirm("정말 삭제하시겠습니까?") === true) {
      dispatch(screenDetailCreators.delScreenPageMW(props.id))
    }
  }

  // console.log("받아오기", props)

  return (
    <Container>
      <Box position="relative">
        {/* 배경사진 */}
        <Img url={imageUrl} />

        {/* 찜버튼 */}
        <JoinCircle onClick={heartBtn}>
          {props?.heart ? (
            <img src={heart_join} alt="Heart" style={{ cursor: "pointer" }} />
          ) : (
            <img
              src={heart_null}
              alt="nullHeart"
              style={{ cursor: "pointer" }}
            />
          )}
        </JoinCircle>
      </Box>

      {/* 타이틀 */}
      <TitleBox>
        <Warp margin="0 0 11px 0" justify="space-between">
          <Warp>
            {!props.allowtype || props.canApplyNum === 0 ? (
              <Ellipse
                borderColor="#C4C4C4"
                background="#C4C4C4"
                color="#FFFFFF"
              >
                마감
              </Ellipse>
            ) : (
              <Ellipse
                borderColor="#F25343"
                background="#F25343"
                color="#FFFFFF"
              >
                모집중
              </Ellipse>
            )}

            {/* 모임 중이고, 마감이 안됬을 때 디데이 숨기기 */}
            {props.allowtype && !props.close && (
              <Ellipse borderColor="#498C9A" color="#498C9A" marginLeft="6px">
                D-{props.dday}
              </Ellipse>
            )}
          </Warp>

          <Warp>
            {/* 마감되면 수정불가능 그 외 가능 수정버튼  */}
            {props.allowtype && props.createdUserId === props.userid ? (
              <p onClick={editBtn} style={{ cursor: "pointer" }}>
                📝
              </p>
            ) : (
              ""
            )}

            {/* 마감되더라도 삭제 가능 */}
            {props.createdUserId === props.userid ? (
              <p
                onClick={delBtn}
                style={{ marginLeft: "5px", cursor: "pointer" }}
              >
                ❌
              </p>
            ) : (
              ""
            )}
          </Warp>
        </Warp>

        <Text
          size="16px"
          weight="bold"
          width="295px"
          height="46px"
          lineHeight="23px"
        >
          {props.title}
        </Text>

        <Warp justify="space-between" align="center" marginT="11px">
          {/* 인원 상태바 */}
          <Progress {...props} />
          <Warp flex="flex">
            <img src={colorUsers} alt="users" />
            <Text size="12px" color="#F25343" weight="bold" spacing="-0.03em;">
              &nbsp;{props.canApplyNum}명&nbsp;
            </Text>
            <Text size="12px" color="#F25343" spacing="-0.03em;">
              남음
            </Text>
          </Warp>
        </Warp>
      </TitleBox>

      {/* 모임 정보 */}
      <Box
        height="163px"
        background="rgba(247, 247, 247, 0.5)"
        position="relative"
        margin="20px"
      >
        <Warp
          width="100%"
          justify="space-around"
          align="center"
          position="absolute"
          padding="0 40px 0 40px"
          style={{ top: "78%" }}
        >
          <img src={calendar} alt="calendar" />
          <Text color="#777777" size="12px">
            {props.groupDate}
          </Text>
          <Slice> &ensp;|&ensp; </Slice>
          <img src={location} alt="location" />
          <Text color="#777777" size="12px">
            {props.placeInfomation}
          </Text>
          <Slice> &ensp;|&ensp; </Slice>
          <img src={users} alt="users" />
          <Text color="#777777" size="12px">
            최대 {props.peopleLimit}명
          </Text>
        </Warp>
      </Box>

      {/* 유저정보 */}
      <Box
        height="80px"
        background="#fff"
        flex="flex"
        align="center"
        padding="10px 30px"
      >
        <Warp width="55px" height="55px">
          {/* 일반프사 & 카카오프사 */}
          <Circle url={kakaoCheck === "kakaocdn" ? kakaoImg : profileImg} />
        </Warp>
        <Warp direction="column" marginLeft="12px">
          <Text size="14px" weight="bold" margin="1px">
            {props.createdUserName}
          </Text>
          <Text size="12px" color="#C4C4C4" margin="1px">
            {props.createdUserId}
          </Text>
        </Warp>
      </Box>

      {/* 모임소개 */}
      <Box
        minHeight="121px"
        maxHeight="auto"
        background="#F2FAFC"
        padding="20px 30px"
      >
        <Text size="16px" weight="bold" margin="0 0 15px 0 ">
          모임소개
        </Text>
        <Text size="14px" color="#333333">
          {props.content}
        </Text>

        {/* 댓글 전체 보기
        <Text onClick={moreBtn} style={{cursor: "pointer"}} size="14px" color="#adb5bd" >
          더보기 
        </Text> */}
      </Box>

      <Rectangle />
    </Container>
  )
})

Info.defaultProps = {
  id: "",
  myScreenLikesList: [],
  // appliedUserInfo: [{UserImage: 'sample.png', Username: '', UserId: '', UserInx: ''}],
  UserImage: "sample.png"
}

export default Info;

const Container = styled.div`
  width: 425px;
  /* background-size: cover; */
  /* height: auto; */
  margin: 0 auto;
  position: relative;
  z-index: 0;
`;

const Box = styled.div`
  width: 100%;
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight};
  max-height: ${(props) => props.maxHeight};
  background: ${(props) => props.background};
  padding: ${(props) => props.padding};
  display: ${(props) => props.flex};
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  position: ${(props) => props.position};
`;

const Img = styled.div`
  width: 100%;
  height: 375px;
  background-color: #c4c4c4;
  background: url(${(props) => props.url});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const JoinCircle = styled.div`
  position: absolute;
  width: 28px;
  height: 28px;
  border-radius: 50px;
  background: rgba(0, 0, 0, 0.5);
  left: 360px;
  top: 298px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleBox = styled.div`
  position: absolute;
  left: 50%;
  top: 345px;
  transform: translateX(-50%);
  width: 335px;
  height: 139px;
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 16px;
  z-index: 1;
`;

const Warp = styled.div`
  display: flex;
  width: ${(props) => props.width};
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  margin-left: ${(props) => props.marginLeft};
  margin-top: ${(props) => props.marginT};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  position: ${(props) => props.position};
`;

const Ellipse = styled.div`
  width: 55px;
  height: 24px;
  background: ${(props) => props.background};
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 1px;
  margin-left: ${(props) => props.marginLeft};
  font-weight: bold;
  font-size: 12px;
  color: ${(props) => props.color};
`;

const Text = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  letter-spacing: ${(props) => props.spacing};
  margin: ${(props) => props.margin};
  line-height: ${(props) => props.lineHeight};

`;

const Circle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #c4c4c4;
  border: 1px solid #E7E7E7;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const Slice = styled.div`
  color: #d8d8d8;
  font-size: 12px;
`;

const Rectangle = styled.div`
	background: #E7E7E7;
	width: 100%;
	height: 6px;
`;