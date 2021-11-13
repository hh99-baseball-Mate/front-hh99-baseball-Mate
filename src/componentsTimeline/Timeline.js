import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { timelineCreators } from "../redux/modules/timeline";
import { mainCreators } from "../redux/modules/mainPage";

const Timeline = React.memo((props) => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user.user_info)

  const likelist = props.likelist
  const [like, setLike] = useState(false)
  const idx = props.idx

  useEffect(() => {
    dispatch(timelineCreators.loadTimelineMW())
  }, [])

  // 좋아요 누른거 가져와서 표시
  useEffect(() => {
    const likeIdx = likelist.indexOf(props.timelineId)
    if (likeIdx >= 0) {
      setLike(true)
    }
  }, [likelist])

  // 본인 아이디 확인
  const Me = user.username
  // console.log("내아이디", Me)
  // console.log("내정보", user)

  const delTimeline = () => {
    // const timeLineId = props.id
    if (window.confirm("정말 삭제하시겠습니까?") === true) {
      dispatch(timelineCreators.deleteTimelineMW(props.timelineId))
    }
  }

  const likeToggle = () => {
    setLike(!like)
    dispatch(timelineCreators.likeTimelineMW(props.timelineId, like))
  }

  return (
    <React.Fragment>
      <TimeLineCard idx={idx}>
        <Box>
          <Warp justify="space-between" align="center" bottom="7px">
            <Warp align="flex-end">
              <Text size="14px" weight="bold" marginR="10px">
                {props.userName}
              </Text>
              <Text color="#C4C4C4" size="12px">
                {props.dayBefore}
              </Text>
            </Warp>

            <Warp>
              {Me === props.userName ? (
                <Text
                  size="10px"
                  onClick={() => {
                    delTimeline()
                  }}
                >
                  ❌
                </Text>
              ) : (
                ""
              )}
            </Warp>
          </Warp>

          <Text size="14px" style={{ overflowWrap: "break-word" }}>
            {props.content}
          </Text>

          <Warp justify="flex-end">
            <Text
              size="12px"
              onClick={() => {
                likeToggle()
              }}
            >
              {like ? `😍` : `😶`}
            </Text>
            <Text size="12px" marginL="5px">
              {props.likecount}
            </Text>
          </Warp>
        </Box>
      </TimeLineCard>
    </React.Fragment>
  )
});


export default Timeline;



const TimeLineCard = styled.div`
	${(props) => props.idx % 2 === 0 ? `background: #FFF0EE;`: `background: #F2FAFC;`}
	border: 1px solid #E7E7E7;
	margin-bottom: 10px;
	border-radius: 10px;
	padding: 12px 14px;
`;

const Warp = styled.div`
	/* width: 100%; */
	/* display: ${(props) => props.flex}; */
	display: flex;
	flex-direction: ${(props) => props.direction};
	justify-content: ${(props) => props.justify};
	align-items: ${(props) => props.align};
	margin-left: ${(props) => props.marginLeft};
	margin-bottom: ${(props) => props.bottom};
	margin: ${(props) => props.margin};
	padding: ${(props) => props.padding};
	position: ${(props) => props.position};
`;

const Box = styled.div`
	width: 100%;
	height: ${(props) => props.height};
	background: ${(props) => props.background};
	padding: ${(props) => props.padding};
	margin: ${(props) => props.margin};
	display: ${(props) => props.flex};
	flex-direction: ${(props) => props.direction};
	justify-content: ${(props) => props.justify};
	align-items: ${(props) => props.align};
	position: ${(props) => props.position};
`;

const Text = styled.p`
	font-size: ${(props) => props.size};
	font-weight: ${(props) => props.weight};
	color: ${(props) => props.color};
	letter-spacing: ${(props) => props.spacing};
	margin: ${(props) => props.margin};
	margin-right: ${(props) => props.marginR};
	margin-left: ${(props) => props.marginL};
	cursor: ${(props) => props.pointer};
	line-height: ${(props) => props.height};
	/* text-align: center; */
`;

const Circle = styled.div`
	width: 29px;
	height: 29px;
	border-radius: 50%;
	background: #C4C4C4;
	margin-top: ${(props) => props.marginT};
	margin-right: 10px;
`;
