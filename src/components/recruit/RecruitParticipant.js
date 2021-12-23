import React, { memo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import styled from "styled-components"
import { groupDetailCreators } from "../../redux/modules/groupDetail"
import { screenDetailCreators } from "../../redux/modules/screenDetail"
import { getCookie } from "../../shared/common/Cookie"

import host from "../../shared/icon/groupDetail/host.svg"
import { useCheckProfile } from "../customHook"

const Participant = memo((props) => {
  const params = useParams()
  const dispatch = useDispatch()
  const id = params.id

  // 유저 프로필사진
  const [checkProfile] = useCheckProfile(props.createdUserProfileImg)

  const cookie = getCookie("is_login")

  const mylist = useSelector((state) => state.groupDetail.mylist)
  const my = {
    UserImage: mylist.picture,
    UserId: mylist.userid,
    UserInx: mylist.useridx,
    Username: mylist.username,
  }

  // 참석버튼
  const apply = () => {
    if (!cookie) {
      window.alert("로그인 후 이용해주세요")
      return
    }

    props.setJoin(true)

    if (props.screen) {
      return dispatch(screenDetailCreators.screenApplyMW(id, my))
    } else {
      dispatch(groupDetailCreators.groupApplyMW(id, my))
    }
  }

  // 참석취소버튼
  const delapply = () => {
    if (
      window.confirm(
        "모임을 나가시겠습니까? 나가신 모임은 다시 참여 불가능합니다."
      ) === true
    ) {
      props.setJoin(false)

      if (props.screen) {
        return dispatch(screenDetailCreators.delApplyMW(id, props.userid))
      } else {
        dispatch(groupDetailCreators.delApplyMW(id, props.userid))
      }
    }
  }

  // 모임 확정/취소 버튼
  const confirm = () => {
    // 스야 컴포넌트일때
    if (props.screen) {
      if (props.allowtype) {
        if (
          window.confirm(
            "모임 확정 시, 더이상 참여자를 모집할 수 없습니다.\n확정하시겠습니까?"
          )
        ) {
          dispatch(screenDetailCreators.confirmMW(id, !props.allowtype))
        }
      } else {
        dispatch(screenDetailCreators.confirmMW(id, !props.allowtype))
      }
      return
    }

    // 직관 컴포넌트일때
    if (props.allowtype) {
      if (
        window.confirm(
          "모임 확정 시, 더이상 참여자를 모집할 수 없습니다.\n확정하시겠습니까?"
        )
      ) {
        dispatch(groupDetailCreators.confirmMW(id, !props.allowtype))
      }
    } else {
      dispatch(groupDetailCreators.confirmMW(id, !props.allowtype))
    }
  }

  // 내가 참여했는지 찾기
  const myJoin = props.appliedUserInfo?.findIndex(
    (list) => list.UserId === props.userid
  )

  // 참석버튼 표시
  useEffect(() => {
    if (myJoin !== -1) {
      return props.setJoin(true)
    } else {
      props.setJoin(false)
    }
  }, [props.appliedUserInfo])

  const me = props.createdUserId === props.userid

  return (
    <React.Fragment>
      <Box padding="28px 15px 40px 15px" background="#fff">
        <div style={{ maxWidth: "335px", width:"100%",  margin: "auto", display: "flex", justifyContent: "center" }}>

          <Grid>
            <CircleBox>
              {/* 방장 기본프사 & 카카오프사 */}
              <HostCircle name={props.createdUserName} url={checkProfile} />
              <Text>
                <img src={host} alt="host" /> {props.createdUserName}
              </Text>
            </CircleBox>

            {/* 참여자 프사 */}
            {props.appliedUserInfo?.map((list) => {
              return <PartyList key={list.UserInx} {...list} />
            })}
          </Grid>
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

          {props.screen
            ? // 스야컴포넌트 방장이 아닐 때
              !me &&
              myJoin === -1 &&
              props.myScreenWait === -1 &&
              props.allowtype && (
                <ConfirmBtn
                  onClick={() => {
                    apply()
                  }}
                  background="#F25343"
                >
                  모임 참여 신청하기
                </ConfirmBtn>
              )
            : // 직관컴포넌트 방장이 아닐 때
              !me &&
              myJoin === -1 &&
              props.myWait === -1 &&
              props.allowtype && (
                <ConfirmBtn
                  onClick={() => {
                    apply()
                  }}
                  background="#F25343"
                >
                  모임 참여 신청하기
                </ConfirmBtn>
              )}

          {props.screen
            ? // 스야 승인 대기중 표시
              props.myScreenWait !== -1 && (
                <ConfirmBtn disabled background="#ff8787">
                  방장의 승인을 기다리는 중입니다.
                </ConfirmBtn>
              )
            : // 직관 승인 대기중 표시
              props.myWait !== -1 && (
                <ConfirmBtn disabled background="#ff8787">
                  방장의 승인을 기다리는 중입니다.
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
  // console.log("참여인원 컴포넌트", props)

  // 참여유저 프로필 사진
  const [checkProfile] = useCheckProfile(props.UserImage)
  
  return (
    <CircleBox>
      <Circle url={checkProfile} />
      <Text>{props.Username}</Text>
    </CircleBox>
  )
}

Participant.defaultProps = {
  createdUserProfileImg: "sample.png",
}

export default Participant

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
`

const Warp = styled.div`
  display: flex;
  /* min-width: 300px; */
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
`

const Text = styled.div`
  max-width: 95px;
  font-size: 0.8em;
  /* font-size: ${(props) => props.size}; */
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  letter-spacing: ${(props) => props.spacing};
  margin: ${(props) => props.margin};
  cursor: ${(props) => props.pointer};
  text-align: center;
`

const CircleBox = styled.div`
  margin: 0 6px 20px 6px;
`

const HostCircle = styled.div`
  width: 95px;
  height: 95px;
  border: 2px solid #f25343;
  border-radius: 50%;
  background: #ffffff;
  margin-bottom: 5px;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  @media screen and (max-width: 360px) {
  width: 80px;
  height: 80px;
 }
`

const Circle = styled.div`
  width: 95px;
  height: 95px;
  border: 1px solid #e7e7e7;
  border-radius: 50%;
  background: #ffffff;
  margin-bottom: 5px;
  background-image: url(${(props) => props.url});
  /* background-size: contain; */
  background-size: cover;

  @media screen and (max-width: 360px) {
  width: 80px;
  height: 80px;
 }
`

const ConfirmBtn = styled.button`
  width: 90%;
  height: 50px;
  margin: 10px 10px;
  /* margin-top: 10px; */
  background: ${(props) => props.background};
  border-radius: 80px;
  border: none;
  color: #fff;
`

const DisableBtn = styled.button`
  margin: 10px 10px;
  width: 335px;
  height: 50px;
  background: #ced4da;
  border-radius: 80px;
  border: none;
  color: #fff;
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(95px, 1fr));
  place-items: center;
  /* gap: 15px; */
  margin: 0 auto;
  width: 100%;
`

