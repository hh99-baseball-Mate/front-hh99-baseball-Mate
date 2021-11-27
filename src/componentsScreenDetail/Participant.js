import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import { screenDetailCreators } from "../redux/modules/screenDetail";
import { getCookie } from '../shared/Cookie';

import host from "../shared/icon/groupDetail/host.svg"


const Participant = memo((props) => {
  const params = useParams()
  const history = useHistory()
  const groupId = params.screenId

  const IMAGES_BASE_URL = process.env.REACT_APP_IMAGES_BASE_URL
  // console.log("참여자컴포", props)
  // const {shape, src, size, pointer} = props;
  // flex="felx" justify="space-around"
  const dispatch = useDispatch()

  const ip = IMAGES_BASE_URL

  // 기본 로그인일 때 프로필 사진
  const profileImg = ip + props.createdUserProfileImg

  // kakaocdn (카카오 프사인지 확인)
  const kakaoCheck = props.createdUserProfileImg?.split(".")[1]
  const kakaoImg = props.createdUserProfileImg

  const cookie = getCookie("is_login");
  const id = props.id

  const mylist = useSelector((state) => state.screenDetail.screenMylist)
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
    if (!cookie) {
      window.alert("로그인 후 이용해주세요");
      return;
    }
    props.setJoin(true)
    dispatch(screenDetailCreators.screenApplyMW(id, my))
  }

  // 참석취소버튼
  const delapply = () => {
    if (
      window.confirm(
        "모임을 나가시겠습니까? 나가신 모임은 다시 참여 불가능합니다."
      ) === true
    ) {
      props.setJoin(false)
      dispatch(screenDetailCreators.delApplyMW(groupId, props.userid))
    }
  }

  const myJoin = props.appliedUserInfo?.findIndex(
    (list) => list.UserId === props.userid
  )
  // console.log("myJoin",myJoin)
  // 참석버튼 표시
  useEffect(() => {
    if (myJoin !== -1) {
      return props.setJoin(true)
    } else {
      return props.setJoin(false)
    }
  }, [props, props.join, myJoin])

  // const [ok, setOk] = useState(false);

  // 참석 확정/취소 버튼
  const confirm = () => {
    if (props.allowtype) {
      if (
        window.confirm(
          "모임 확정 시, 더이상 참여자를 모집할 수 없습니다.\n확정하시겠습니까?"
        )
      ) {
        dispatch(screenDetailCreators.confirmMW(groupId, !props.allowtype))
      }
    } else {
      dispatch(screenDetailCreators.confirmMW(groupId, !props.allowtype))
    }
  }

  // const confirm = () => {
  //   if(window.confirm("모임 확정 시, 더이상 참여자를 모집할 수 없습니다.")) {
  //     dispatch(screenDetailCreators.confirmMW(groupId, !props.allowtype))
  //   }
  // }

  // // 채팅방 생성 버튼
  // const chat = () => {
  //   dispatch(screenDetailCreators.chatMW(id))
  // }

  const me = props.createdUserId === props.userid
  // console.log("나다", me, props.allowtype)

  return (
    <React.Fragment>
      <Box padding="28px 20px 40px 20px" background="#fff">

        <div style={{width:"335px", margin:"auto" }}>
          <Warp wrap="wrap" align="center" start="space-around">
            {/* 방장 프사 */}

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

            {/* 파티원 프사 */}
            {props.appliedUserInfo?.map((list) => {
              return <PartyList key={list.UserInx} {...list} />
            })}
          </Warp>
        </div>

        <Warp flex="flex" direction="column" align="center" justify="center">
          {me ? (
            // 방장일 때 모임확정/취소, 내가 아니면 null
            props.allowtype ? (
              <ConfirmBtn onClick={confirm} background="#F25343">
                모임 확정하기
              </ConfirmBtn>
            ) : (
              <ConfirmBtn onClick={confirm} background="#ff8787">
                모임 확정 취소하기
              </ConfirmBtn>
            )
          ) : null}

          {!me && myJoin === -1 && props.allowtype && (
            // 방장이 아닐 때
            <ConfirmBtn
              onClick={() => {
                apply()
              }}
              background="#F25343"
            >
              모임 참여 신청하기
            </ConfirmBtn>
          )}

          {!me && myJoin !== -1 && (
            // 방장이 아닐 때
            <ConfirmBtn
              onClick={() => {
                delapply()
              }}
              background="#ff8787"
            >
              모임 나가기
            </ConfirmBtn>
          )}

          {!me && myJoin === -1 && !props.allowtype && (
            //방장아니고, 참가자 아니고, 모집마감일 때
            <ConfirmBtn disabled background="#e9ecef">
              모집이 마감되었습니다.
            </ConfirmBtn>
          )}
        </Warp>
      </Box>
    </React.Fragment>
  )
})

// 참여인원 컴포넌트
function PartyList(props) {

	const IMAGES_BASE_URL = process.env.REACT_APP_IMAGES_BASE_URL;
	const ip = IMAGES_BASE_URL;

	// 기본 로그인일 때 프로필 사진
	const image = ip + props.UserImage

	// kakaocdn (카카오 프사인지 확인)
	const kakaoCheck = props.UserImage?.split(".")[1]
	const kakaoImg = props.UserImage;


	// useEffect(() => {
	// 	dispatch(groupDetailCreators.mylistMW())
	// },[props])

	return (
		<CircleBox>
			<Circle 
				url={
					kakaoCheck === "kakaocdn" ?
					kakaoImg : image
				}
			/>
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
	/* box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2); */
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
	margin: 0 6px 20px 6px;
`;

const HostCircle = styled.div`
	width: 95px;
	height: 95px;
	border: 2px solid #F25343;
	border-radius: 50%;
	background: #FFFFFF;
	margin-bottom: 5px;
	background-image: url(${(props) => props.url});
  /* background-size: contain; */
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const Circle = styled.div`
	width: 95px;
	height: 95px;
	border: 1px solid #E7E7E7;
	border-radius: 50%;
	background: #FFFFFF;
	margin-bottom: 5px;
	background-image: url(${(props) => props.url});
  /* background-size: contain; */
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const ConfirmBtn = styled.button`
	width: 335px;
	height: 50px;
	margin: 10px 10px;
	/* margin-top: 10px; */
	background: ${(props) => props.background};
	border-radius: 80px;
	border: none;
	color: #fff;

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
