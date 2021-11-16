import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import styled from "styled-components";
import { history } from "../redux/configStore";
//swiper
import Swipers from "../components/Swipers"
import GroupCard from "../componentsGroupList/GroupCard"
import { useDispatch, useSelector } from "react-redux"
import { actionCreators as groupCr } from "../redux/modules/group"
import { baseUrl, clubImageSrc } from "../shared/clubImage"
import { Container, Header, Text, MarginBottom, NaviBar } from "../components"
import { InfinityScroll } from "../components/InfinityScroll"
import { NotGame } from "../components/NotGame"
import { Banner } from "../components/Banner"
import { SubTitle } from "../components/SubTitle"
import { SelectIcon } from "../components/SelectIcon"

const GroupList = (props) => {
  const dispatch = useDispatch();

  const [team, setTeam] = useState("")

  const is_login = useSelector((state) => state.user.is_login)
  const [infinity, setInfinity] = useState({
    start: 0,
    next: 3,
  })
  //일정선택
  const day = useSelector((state) => state.group.date)

  //팀 별
  const team_list = useSelector((state) => state.group.team_list)
  const is_loading = useSelector((state) => state.group.is_loading)
  const list_length = useSelector((state) => state.group.list_length)
  console.log(list_length, is_loading)

  // 일정 별
  const date_list = useSelector((state) => state.group.date_list)

  const date = day.split(" ")[0]

  const dateList = team_list.filter((e) => {
    const timeCut = e.groupDate.split(" ")[0];
    // console.log(timeCut);
    return timeCut === date;
  });

  const newPeople = (e) => {
    !is_login
      ? window.alert("로그인 후 이용해주세요")
      : history.push("/grouplist/groupadd");
    e.target.disabled = true;
  }

  const moreBtn = () => {
    history.push("/groupdate")
  }

  const allTeam = () => {
    // 경기일정 날짜를 다시 빈 문자로 바꿔줌
    dispatch(groupCr.datePage(""))
    setTeam("전체")
  }

  // 구단별 중 전체 이미지
  const KBOIcon =
    "https://blog.kakaocdn.net/dn/bvJWww/btqF1bBafWG/VwoCNfWLEUCmC2iPTrivj0/img.jpg"

  useEffect(() => {
    if (date === "") {
      dispatch(groupCr.getTeamAPI(team, infinity))
      return
    }

    // 해당날짜와 일치하는 경기들의 배열을 넣음
    dispatch(groupCr.getTeamAPI(""))
    dispatch(groupCr.getDateList(dateList))
  }, [team, date, infinity])

  return (
    <Box>
      <InfinityScroll
        callNext={() => {
          console.log("되냐?")
          setInfinity({
            start: infinity.start,
            next: (infinity.next += 3),
          })
        }}
        is_next={list_length > infinity.next}
        loading={is_loading}
      >
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

          <SubTitle more>롯데자이언츠 핫한 모임 🔥</SubTitle>
          {/* 핫 한모임 */}
          <Swipers height="300px">
            <GroupCard></GroupCard>
            <GroupCard></GroupCard>
            <GroupCard></GroupCard>
            <GroupCard></GroupCard>
          </Swipers>
          <SelectIcon moreBtn={moreBtn}>
            {day ? day : "원하는 경기 일정을 선택해주세요"}
          </SelectIcon>
          {/* 선택 된 경기 날짜가 없다면 팀리스트를, 날짜가 있다면 날짜 기준으로 리스트를 렌더링 */}
          {!day
            ? team_list.map((e) => {
                return <GroupCard key={e.groupId} {...e} />
              })
            : date_list.map((e) => {
                return <GroupCard key={e.groupId} {...e} />
              })}
        </Container>

        <MarginBottom />
        <NaviBar home writeBtn onClick={newPeople} />
      </InfinityScroll>
    </Box>
  )
};
export default GroupList;

const Box = styled.div`
  /* width: 405px; */
  /* height: 177px; */
  /* margin: 15px auto; */
  /* display: ${(props) => props.flex}; */
  /* border: 1px solid; */
`;

const Broder = styled.div`
  border: 1px solid #e7e7e7;
  margin: 10px 0;
`
const ClubBox = styled.div`
  margin-right: 16px;
`

const ClubIcon = styled(Image)`
  width: 68px;
`
