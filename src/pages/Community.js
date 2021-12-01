import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CommunityCard from "../communityList/CommunityCard";
import { Container, Header, MarginBottom, NaviBar, Text } from "../components";
import { history } from "../redux/configStore";
import { actionCreators as actionCr } from "../redux/modules/community";
import eventBanner from "../shared/icon/logo/timeLineBanner.png";
const Community = (props) => {
  const dispatch = useDispatch()

  //카드 조회
  const card_list = useSelector((state) => state.community.card_list)
  const is_login = useSelector((state) => state.user.is_login)
  const newPeople = (e) => {
    !is_login
      ? window.alert("로그인 후 이용해주세요")
      : history.push("/community/communityadd")
    e.target.disabled = true
  }

  //카드 조회
  useEffect(() => {
    dispatch(actionCr.getCardAPI())
  }, [])

  // 모달 보여주기/숨기기
  const [showModal, setShowModal] = useState(false)

  // 삭제/수정 모달내용
  const modalData = {
    title: "굿즈 에디터",
    descriptionOne: "선택하신 굿즈를 삭제 하시겠습니까?",
    descriptionTwo: "삭제되면 다시 복원할 수 없습니다.",
    btnClose: "취소",
    btnUpdate: "삭제",
  }

  return (
    <>
      <Header community />
      <Banner src={eventBanner} alt="" />
      <Container MainContainer>
        <Text bold size="16px">
          우리 같이 이야기 해봐요!
        </Text>
        {card_list.map((e) => {
          return <CommunityCard key={e.communityId} {...e} />;
        })}
      </Container>

      <MarginBottom />
      <NaviBar home writeBtn onClick={newPeople} />
    </>
  )
}

export default Community;

const Banner = styled.img`
  width: 100%;
`;
