import React, { useState } from "react";
import styled from "styled-components";
import { ArrowBack, Container } from "../components";
import { history } from "../redux/configStore";
import { Modal } from "../componentsGroupAdd/Modal";
import Etc from "../shared/icon/Etc.png";
import { useSelector } from "react-redux";
import { Participation } from "../componentsGroupList/Participation";
import { Wish } from "../componentsGroupList/Wish";
import { Write } from "../componentsGroupList/Write";
const MyGroup = (props) => {
  //모달
  const selectTeam_list = useSelector((state) => state.group.selectTeam_list);
  const [inputValue, setInputValue] = useState({
    title: "",
    selectTeam: "",
    peopleLimit: 0,
    content: "",
  });
  const [showModal, setShowModal] = useState(false);

  const [groupDate, setGroupDate] = useState("");
  //구분
  const [participation, setParticipation] = useState(false);
  const [write, setWrite] = useState(false);
  const [wish, setWish] = useState(false);

  const { content, peopleLimit, title, selectTeam } = inputValue;
  console.log(participation, "확");
  console.log(write, "인");
  console.log(wish, "용");
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
          alignItems: "center",
          maxWidth: "375px",
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

      <div style={{ margin: "20px" }}>
        {participation ? <Participation /> : ""}
        {write ? <Write /> : ""}
      </div>

      {showModal ? (
        <Modal
          bottom
          height="180px"
          selectTeam_list={selectTeam_list}
          setGroupDate={setGroupDate}
          setShowModal={setShowModal}
        ></Modal>
      ) : (
        ""
      )}
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
  margin-top: 30px;
  width: 375;
  background-color: none;
`;

const Up = styled.p`
  size: 14px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Btn = styled.button`
  width: 75px;
  height: 25px;
  border-radius: 35%;
  background: none;
  border-color: #c4c4c4;
  font-size: 14px;
  display: flex;
`;

const All = styled.div`
  align-items: center;
`;
