import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import { groupDetailCreators } from "../redux/modules/groupDetail";

import host from "../shared/icon/groupDetail/host.svg"


const Participant = memo((props) => {
  const params = useParams()
  const history = useHistory()
  const groupId = params.groupId

  const IMAGES_BASE_URL = process.env.REACT_APP_IMAGES_BASE_URL
  console.log("참여자컴포", props)
  // const {shape, src, size, pointer} = props;
  // flex="felx" justify="space-around"
  const dispatch = useDispatch()

  const ip = IMAGES_BASE_URL

  // 기본 로그인일 때 프로필 사진
  const profileImg = ip + props.createdUserProfileImg

  // kakaocdn (카카오 프사인지 확인)
  const kakaoCheck = props.createdUserProfileImg?.split(".")[1]
  const kakaoImg = props.createdUserProfileImg

  const id = props.groupId

  const mylist = useSelector((state) => state.groupDetail.mylist)
  const my = {
    UserImage: mylist.picture,
    UserId: mylist.userid,
    UserInx: mylist.useridx,
    Username: mylist.username,
  }
  // const [join, setJoin] = useState(false);

  // console.log("나는",my)

  // 참석버튼
  const apply = () => {
    props.setJoin(true)
    dispatch(groupDetailCreators.groupApplyMW(id, my))
  }

  // 참석취소버튼
  const delapply = () => {
    if (
      window.confirm(
        "모임을 나가시겠습니까? 나가신 모임은 다시 참여 불가능합니다."
      ) === true
    ) {
      props.setJoin(false)
      dispatch(groupDetailCreators.delApplyMW(groupId, props.userid))
    }
  }

  const myJoin = props.appliedUserInfo?.findIndex(
    (list) => list.UserId === props.userid
  )
  // console.log("myJoin",myJoin)
  // 참석버튼 표시
  useEffect(() => {
    if (myJoin >= 0) {
      return props.setJoin(true)
    } else {
      props.setJoin(false)
    }
  }, [props.appliedUserInfo, props.join, myJoin])

  return (
    <React.Fragment>
      <Box padding="28px 10px 40px 10px" background="#fff">
        <Warp wrap="wrap" align="center" start="space-around">
          {/* 방장 */}
          <CircleBox>
            {/* 기본프사 & 카카오프사 */}
            <HostCircle
              name={props.createdUserName}
              url={kakaoCheck === "kakaocdn" ? kakaoImg : profileImg}
            />

            <Text>
              <img src={host} alt="host" /> {props.createdUserName}
            </Text>
          </CircleBox>

          {props.appliedUserInfo?.map((list, idx) => {
            return <PartyList key={idx} {...list} />
          })}
        </Warp>
        {
          // 글작성자랑 내아이디랑 같으면 버튼 안보임
          props.createdUserId === props.userid ? null : // 모집완료되면 모집마감
          props.close ? (
            <DisableBtn disabled> 모집 마감 </DisableBtn>
          ) : // 참여 했을 때 참여 취소버튼
          props.join ? (
            <ConfirmBtn
              onClick={() => {
                delapply()
              }}
              join={props.join}
            >
              참여 취소하기
            </ConfirmBtn>
          ) : (
            // 참여 안했을 때 참여버튼
            <ConfirmBtn
              onClick={() => {
                apply()
              }}
              join={props.join}
            >
              모임 참여하기
            </ConfirmBtn>
          )
        }
      </Box>
    </React.Fragment>
  )
})

// 참여인원 컴포넌트
function PartyList(props) {
  // console.log("참여인원 컴포넌트", props)

  const IMAGES_BASE_URL = process.env.REACT_APP_IMAGES_BASE_URL
  const ip = IMAGES_BASE_URL

  // 기본 로그인일 때 프로필 사진
  const image = ip + props.UserImage

  // kakaocdn (카카오 프사인지 확인)
  const kakaoCheck = props.UserImage?.split(".")[1]
  const kakaoImg = props.UserImage

  // useEffect(() => {
  // 	dispatch(groupDetailCreators.mylistMW())
  // },[props])

  return (
    <CircleBox>
      <Circle url={kakaoCheck === "kakaocdn" ? kakaoImg : image} />
      <Text>{props.Username}</Text>
    </CircleBox>
  )
}

Participant.defaultProps = {
	UserImage: ""
}

export default Participant;

const Box = styled.div`
	width: 100%;
	height: ${(props) => props.height};
	background: ${(props) => props.background};
	padding: ${(props) => props.padding};
	display: ${(props) => props.flex};
	flex-direction: ${(props) => props.direction};
	justify-content: ${(props) => props.justify};
	align-items: ${(props) => props.align};
	position: ${(props) => props.position};
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
`;

const Warp = styled.div`
	display: flex;
	width: ${(props) => props.width};
	flex-direction: ${(props) => props.direction};
	flex-wrap: ${(props) => props.wrap};
	justify-content: ${(props) => props.justify};
	align-items: ${(props) => props.align};
	align-content: ${(props) => props.start};
	margin-left: ${(props) => props.marginLeft};
	margin: ${(props) => props.margin};
	padding: ${(props) => props.padding};
	position: ${(props) => props.position};
	
`;

const Text = styled.div`
	font-size: ${(props) => props.size};
	font-weight: ${(props) => props.weight};
	color: ${(props) => props.color};
	letter-spacing: ${(props) => props.spacing};
	margin: ${(props) => props.margin};
	cursor: ${(props) => props.pointer};
	text-align: center;
`;

const CircleBox = styled.div`
	margin: 0 9px 20px 9px;
`;

const HostCircle = styled.div`
	width: 98px;
	height: 98px;
	border: 2px solid #F25343;
	border-radius: 50%;
	background: #FFFFFF;
	margin-bottom: 5px;
	background-image: url(${(props) => props.url});
  /* background-size: contain; */
  background-size: cover;
`;

const Circle = styled.div`
	width: 98px;
	height: 98px;
	border: 1px solid #E7E7E7;
	border-radius: 50%;
	background: #FFFFFF;
	margin-bottom: 5px;
	background-image: url(${(props) => props.url});
  /* background-size: contain; */
  background-size: cover;
`;

const ConfirmBtn = styled.button`
	width: 335px;
	height: 50px;
	margin: 10px 10px;
	/* margin-top: 10px; */
	background: #F25343;
	border-radius: 80px;
	border: none;
	color: #fff;

	${(props) =>
    props.join ?
    `background: #ff8787;`
		: `background: #F25343;`
	}
`;

const DisableBtn = styled.button`
	margin: 10px 10px;
	width: 335px;
	height: 50px;
	background: #ced4da;
	border-radius: 80px;
	border: none;
	color: #fff;
`;
