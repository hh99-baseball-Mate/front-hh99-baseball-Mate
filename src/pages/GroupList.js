import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import styled from "styled-components";
import { history } from "../redux/configStore";
//swiper
import Swipers from "../components/Swipers";
import GroupCard from "../componentsGroupList/GroupCard";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as groupCr } from "../redux/modules/group";
import { baseUrl, clubImageSrc } from "../shared/clubImage";
import { SwiperSlide } from "swiper/react";
import {
  Container,
  Header,
  MoreContainer,
  Text,
  MarginBottom,
  NaviBar,
} from "../components";
// import Pancil from "../shared/icon/Pancil.png";
import PancilBtn from "../components/PancilBtn";
import { InfinityScroll } from "../components/InfinityScroll";
import { NotGame } from "../components/NotGame";

const GroupList = (props) => {
  const dispatch = useDispatch();

  const [team, setTeam] = useState("");
  // console.log(team);

  //일정선택
  const date = useSelector((state) => state.group.date);
  // console.log(date, "데이트");

  const is_login = useSelector((state) => state.user.is_login);
  // console.log(group_list);
  //팀별
  const team_list = useSelector((state) => state.group.team_list);
  const date_list = useSelector((state) => state.group.date_list);

  const dateList = team_list.filter((e) => {
    const timeCut = e.groupDate.split(" ")[0];
    // console.log(timeCut);
    return timeCut === date;
  });

  const [infinity, setInfinity] = useState({
    start: 0,
    next: 3,
  });

  function newPeople(e) {
    !is_login
      ? window.alert("로그인 후 이용해주세요")
      : history.push("/grouplist/groupadd");
    e.target.disabled = true;
  }

  function choose() {
    history.push("/groupdate");
  }

  // const onlyTeam = () => {
  //   dispatch(groupCr.getTeamAPI(team));
  // };
  //팀별
  useEffect(() => {
    if (date === "") {
      dispatch(groupCr.getTeamAPI(team));
    } else {
      dispatch(groupCr.getDateList(dateList));
    }
  }, [team]);

  return (
    <Box>
      <InfinityScroll
        callNext={() => {
          setInfinity({
            start: infinity.start,
            next: (infinity.next += 3),
          });
        }}
        // is_next={group_list > infinity.next}
        // loading={is_loading}
      >
        <Header game />
        <Container>
          <Broder />

          <div>
            <Swipers>
              <div style={{ marginRight: "10px" }}>
                <Image
                  onClick={() => {
                    setTeam("전체");
                  }}
                  style={{ width: "68px", height: "68px" }}
                  roundedCircle
                  src="https://blog.kakaocdn.net/dn/bvJWww/btqF1bBafWG/VwoCNfWLEUCmC2iPTrivj0/img.jpg"
                ></Image>
                <Text size="11px" center>
                  전체
                </Text>
              </div>

              {clubImageSrc.map((e) => (
                <SwiperSlide
                  key={e.id}
                  style={{ width: "68px", marginRight: "15px" }}
                  onClick={() => {
                    setTeam(e.name);
                    console.log(e.name);
                  }}
                >
                  <Image
                    src={baseUrl + e.img}
                    style={{ width: "100%" }}
                    roundedCircle
                  />
                  <Text size="11px" center>
                    {e.name}
                  </Text>
                </SwiperSlide>
              ))}
            </Swipers>
          </div>

          <MoreContainer>
            <div style={{ display: "block" }}>
              <strong>모임 목록</strong>
            </div>
            <div
              onClick={choose}
              style={{
                cursor: "pointer",
                fontSize: "13px",
                color: "#C4C4C4",
              }}
            >
              일정선택
            </div>
          </MoreContainer>
          <Broder />

          {!date
            ? team_list.map((e) => {
                // console.log(e)

                return <GroupCard key={e.groupId} {...e} />;
              })
            : date_list.map((e) => {
                return <GroupCard key={e.groupId} {...e} />;
              })}
        </Container>

        <MarginBottom />
        <NaviBar home writeBtn onClick={newPeople} />
      </InfinityScroll>
    </Box>
  );
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
  margin-top: 9px;
  margin-bottom: 20px;
`;
