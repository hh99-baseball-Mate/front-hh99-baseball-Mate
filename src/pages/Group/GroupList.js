import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { actionCreators as groupCr } from "../../redux/modules/group"
import styled from "styled-components"
import { history } from "../../redux/configStore"

import {
  Container,
  Header,
  MarginBottom,
  NaviBar,
  GroupCard,
  NotGame,
  Banner,
  SelectIcon,
  OverFlow,
} from "../../components/common/"

import { HotCard } from "../../components/group/"
import SubText from "../../components/group/SubText"
import GroupLi from "../../components/group/GroupLi"

const GroupList = (props) => {
  const dispatch = useDispatch()

  // 선택 한 팀 값 저장
  const [team, setTeam] = useState("")

  const is_login = useSelector((state) => state.user.is_login)

  // 유저정보
  const user_info = useSelector((state) => state.user.user_info)

  //일정선택
  const day = useSelector((state) => state.group.date)

  //팀 별
  const team_list = useSelector((state) => state.group.team_list)

  // 일정 별
  const date_list = useSelector((state) => state.group.date_list)

  //  핫 그룹
  const hotGroup = useSelector((state) => state.group.hotGroup)

  // 일정선택에서 받아온 날짜 자르기
  const date = day.split(" ")[0]

  // 자른 날짜와 일치하는 값 필터로 array로 반환
  const dateList = team_list.filter((e) => {
    const timeCut = e.groupDate.split(" ")[0]
    return timeCut === date
  })

  // 글작성 페이지 이동 버튼
  const newPeople = (e) => {
    !is_login
      ? window.alert("로그인 후 이용해주세요")
      : history.push("/grouplist/groupadd")
    e.target.disabled = true
  }

  // 일정선택 페이지로 이동
  const datePageBtn = () => {
    history.push("/groupdate")
  }

  const selectTeam = (team) => {
    setTeam(team)
    console.log(team)
  }

  useEffect(() => {
    // 일정 선택이 되지 않았다면 모임전체 리스트 get 요청
    if (date === "") {
      // 전체모임리스트
      dispatch(groupCr.getTeamAPI(team))

      // 핫 그룹 요청
      dispatch(groupCr.hotGroupMW(user_info.myteam))
      return
    }

    // 해당날짜와 일치하는 경기들의 배열을 넣음
    dispatch(groupCr.getDateList(dateList))
  }, [team, date])

  return (
    <>
      <Box>
        {/* 헤더 */}
        <Header game />

        {/* 베너 */}
        <Banner />

        {/* 전체영역 */}
        <Container>
          {/* 소제목 */}
          <SubText
            title="롯데자이언츠 핫한 모임 🔥"
            desc="인원 모집 마감 임박! 어서 참여하세요!"
          />

          {/* 핫 한모임 */}

          <OverFlow>
            {hotGroup && hotGroup.length > 0 ? (
              hotGroup.map((e) => {
                return (
                  <HotCard
                    onClick={() => history.push(`/groupdetail/${e.groupId}`)}
                    key={e.groupId}
                    {...e}
                  />
                )
              })
            ) : (
              <NotGame>해당 구단의 경기모임이 없습니다.</NotGame>
            )}
          </OverFlow>
          {/* 구단별 검색 */}

          {/* 소제목 */}
          <SubText
            title="구단별 모임 조회 ⚾"
            desc="관심 구단 외에도 내가 참여하고싶은 구단을 조회해보세요!"
          />

          {/* 구단별 선택 */}
          <GroupLi selectTeam={selectTeam} />

          {/* 일정별 선택 */}
          <SubText
            title="일정별 조회 ⚾"
            desc="원하는 경기모임 일자를 선택해보세요!"
          />
          <SelectIcon margin="0 0 10px" enlargement moreBtn={datePageBtn}>
            {day ? day : "원하는 경기 일정을 선택해주세요"}
          </SelectIcon>
          {/* 선택 된 경기 날짜가 없다면 팀리스트를, 날짜가 있다면 날짜 기준으로 리스트를 렌더링 */}
          {!day
            ? team_list.map((e) => {
                return (
                  <GroupCard
                    onClick={() => history.push(`/groupdetail/${e.groupId}`)}
                    key={e.groupId}
                    {...e}
                  />
                )
              })
            : date_list.map((e) => {
                return (
                  <GroupCard
                    onClick={() => history.push(`/groupdetail/${e.groupId}`)}
                    key={e.groupId}
                    {...e}
                  />
                )
              })}

          {(team_list.length === 0 || date_list.length.length === 0) && (
            <NotGame>해당 팀 경기는 모임이 없습니다</NotGame>
          )}
        </Container>

        <MarginBottom />
        <NaviBar home writeBtn onClick={newPeople} />
      </Box>
    </>
  )
}

export default GroupList

const Box = styled.div``

