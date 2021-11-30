import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import styled from "styled-components";
import { history } from "../redux/configStore"
import Swipers from "../components/Swipers"
import { GroupCard } from "../components/GroupCard"
import { useDispatch, useSelector } from "react-redux"
import { actionCreators as groupCr } from "../redux/modules/group"
import { baseUrl, clubImageSrc } from "../shared/clubImage"
import { Container, Header, Text, MarginBottom, NaviBar } from "../components"
import { NotGame } from "../components/NotGame"
import { Banner } from "../components/Banner"
import { SubTitle } from "../components/SubTitle"
import { SelectIcon } from "../components/SelectIcon"
import { HotCard } from "../components/HotCard"
import { Helmet } from "react-helmet"
import favicon from "../shared/icon/logo/favicon.ico"
import img from "../shared/icon/image.jpg"

import { actionCreators as userActions } from "../redux/modules/user";
import Loader from "../components/Loader"

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

  const allTeam = () => {
    // 경기일정 날짜를 다시 빈 문자로 바꿔줌
    dispatch(groupCr.datePage(""))
    setTeam("전체")
  }

  // const is_loaded = useSelector((state) => state.user.is_loaded)
  // useEffect(() => {
  //   dispatch(userActions.isLoaded(false))
  // },[])

  // 구단별 중 전체 이미지
  const KBOIcon =
    "https://blog.kakaocdn.net/dn/bvJWww/btqF1bBafWG/VwoCNfWLEUCmC2iPTrivj0/img.jpg"

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
    // dispatch(groupCr.getTeamAPI(""))
    dispatch(groupCr.getDateList(dateList))
  }, [team, date])

  return (
    <>
      {/* {!is_loaded && <Loader type="bars" color="#F25343"/>} */}
      <Helmet>
        <title> 미트볼</title>
        <meta property="og:title" content="미트볼 || 경기모임" />
        <meta property="og:description" content="우리 같이 직관가자!" />
      </Helmet>
      <Box>
        <Banner />
        <Header game />

        <Container>
          {/* overFlow 로 커스텀 한 Swipers */}
          <Swipers>
            {/* 기본 전체 */}
            <ClubBox>
              <ClubIcon
                onClick={allTeam}
                roundedCircle
                src={KBOIcon}
              ></ClubIcon>
              <Text size="11px" center>
                전체
              </Text>
            </ClubBox>

            {clubImageSrc.map((e) => (
              //  구단 별 swipers
              <ClubBox
                key={e.id}
                onClick={() => {
                  dispatch(groupCr.datePage(""))
                  setTeam(e.name)
                }}
              >
                <ClubIcon src={baseUrl + e.img} roundedCircle />
                <Text size="11px" center>
                  {e.name}
                </Text>
              </ClubBox>
            ))}
          </Swipers>

          <SubTitle more>
            {user_info && user_info.myteam ? user_info.myteam : "지금"} 핫한
            모임 🔥
          </SubTitle>
          {/* 핫 한모임 */}
          <Swipers height="350px">
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
          </Swipers>
          <SelectIcon enlargement moreBtn={datePageBtn}>
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

          {/* {console.log(team_list.length, "team")}
        {console.log(date_list.length, "date")} */}
        </Container>

        <MarginBottom />
        <NaviBar home writeBtn onClick={newPeople} />
      </Box>
    </>
  )
}
export default GroupList

const Box = styled.div`

`

const ClubBox = styled.div`
  margin-right: 16px;
  cursor: pointer;
`

const ClubIcon = styled(Image)`
  width: 68px;
`
