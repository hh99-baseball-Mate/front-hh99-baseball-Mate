import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ArrowBack, Container, NaviBar, MarginBottom } from "../components";
import { history } from "../redux/configStore";
import { Modal } from "../components/Modal";
import Etc from "../shared/icon/Etc.png";
import { useDispatch, useSelector } from "react-redux";
import { Participation } from "../componentsGroupList/Participation";
// import { Wish } from "../componentsGroupList/Wish";
import { Write } from "../componentsGroupList/Write";
import { actionCreators as withCr } from "../redux/modules/with"
import Reciangle from "../shared/icon/Rectangle.png";

const MyGroup = (props) => {
  const dispatch = useDispatch();
  //참석
  const with_list = useSelector((state) => state.with.with_list);
  //작성
  const write_list = useSelector((state) => state.with.write_list);
  console.log(with_list, "테스트용");
  console.log(write_list, "작성에 대해");
  //모달

  const [showModal, setShowModal] = useState(false);

  //구분
  const [participation, setParticipation] = useState(true);
  const [write, setWrite] = useState(false);
  const [wish, setWish] = useState(false);

  console.log(participation, "확");
  console.log(write, "인");
  console.log(wish, "용");

  //카드
  useEffect(() => {
    dispatch(withCr.getWithAPI());
  }, []);
  console.log(with_list, "확인좀해보자");

  //작성
  useEffect(() => {
    dispatch(withCr.getWriteAPI());
  }, []);
  console.log(write_list, "피곤해");

  return (
    <All>
      <div
        style={{
          background: "#EC5E4F",
          color: "#FFFFFF",
          maxWidth: "375px",
          margin: " 0 auto",
        }}
      >
        <ArrowBack>내모임</ArrowBack>
      </div>
      <Container>
        <Group>
          <Button1
            onClick={() => {
              if (write === true || participation === false) {
                setWrite(false);
                setParticipation(true);
              }
            }}
          >
            참여모임
          </Button1>

          <Button1
            onClick={() => {
              if (participation === true) {
                setParticipation(false);
                setWrite(true);
              }
              setWrite(true);
            }}
          >
            작성모임
          </Button1>
          <Button1
            onClick={() => {
              setWish(true);
            }}
          >
            찜한모임
          </Button1>
        </Group>
      </Container>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "375px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <Up>내가 참여한 모임</Up>
        <Btn
          onClick={() => {
            setShowModal(true);
          }}
        >
          상세보기 <img src={Etc} alt="등등" />
        </Btn>
      </div>
      {/* 카드 */}
      {with_list.map((e, idx) => {
        console.log(e);

        return (
          <div style={{ margin: "20px" }}>
            {participation ? <Participation key={idx} {...e} /> : ""}
          </div>
        );
      })}

      {write_list.map((e, idx) => {
        console.log(e, "아직");

        return (
          <div style={{ margin: "20px" }}>
            {write && !participation ? <Write key={idx} {...e} /> : ""}
          </div>
        );
      })}

      {showModal ? (
        <Modal bottom btnConfirm height="180px" setShowModal={setShowModal}>
          <Cen>
            <img src={Reciangle} alt="등등" />
            <p>전체보기</p>
            <But>경기모임만</But>
            <br />
            <But>경기모임만</But>
          </Cen>
        </Modal>
      ) : (
        ""
      )}

      <MarginBottom/>
      <NaviBar sch/>
    </All>
  );
};

export default MyGroup;

const Button1 = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  margin-right: 0;
  padding-bottom: 10px;
  color: #777777;

  ${(props) =>
    props.nowBtn1 &&
    `
    border-bottom: 2px solid;
    font-weight: bold;
    color: #000000;
  `}
`;

const Group = styled.div`
  display: flex;
  justify-content: space-between;
  width: 250px;
  text-align: center;
  margin-left: 26px;
  margin-top: 20px;

  background-color: none;
  vertical-align: "middle";
`;

const Up = styled.p`
  size: 14px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Btn = styled.button`
  width: 90px;
  height: 30px;
  border-radius: 30px;
  background: none;
  border: 1px solid #e7e7e7;
  font-size: 14px;
  display: flex;
  font-weight: 500;
  color: #c4c4c4;
  text-align: center;
`;
const All = styled.div`
  align-items: center;
`;
const But = styled.button`
  font-weight: bold;
  background: none;
  border: none;
  font-size: 14px;
  color: #777777;
`;

const Cen = styled.div`
  text-align: left;
  width: 100px;
  margin: 0 auto;
  color: #777777;
  font-size: "14px";
`;
