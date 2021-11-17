import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ArrowBack, Container, NaviBar, MarginBottom } from "../components";
import { history } from "../redux/configStore";
import { Modal } from "../components/Modal";
import Etc from "../shared/icon/Etc.png";
import { useDispatch, useSelector } from "react-redux";
import { Participation } from "../componentsGroupList/Participation";
import { Wish } from "../componentsGroupList/Wish";
import { Write } from "../componentsGroupList/Write";
import { actionCreators as withCr } from "../redux/modules/with";
import Reciangle from "../shared/icon/Rectangle.png";
import { NotGame } from "../components/NotGame";

const MyGroup = (props) => {
  const dispatch = useDispatch();
  //참석
  const with_list = useSelector((state) => state.with.with_list);
  //작성
  const write_list = useSelector((state) => state.with.write_list);

  //찜하기
  const wish_list = useSelector((state) => state.with.with_list);
  //모달
  const [showModal, setShowModal] = useState(false);
  //스크린
  const screen_list = useSelector((state) => state.with.screen_list);
  const screen_write = useSelector((state) => state.with.writeId);

  const [allList, setAllList] = useState(true);
  const [screen, setScreen] = useState(false);
  const [games, setGames] = useState(false);

  // console.log(allList)
  //구분
  const [participation, setParticipation] = useState(true);
  const [write, setWrite] = useState(false);
  const [wish, setWish] = useState(false);
  //버튼

  const { nowBtn1, nowBtn2, nowBtn3 } = props;

  // console.log(games, screen);
  // console.log(nowBtn1, nowBtn2);

  const all_list = with_list.concat(screen_list);
  const all_write = write_list.concat(screen_write);
  //카드
  useEffect(() => {
    if (allList) {
      dispatch(withCr.getWithAPI());
      dispatch(withCr.getScreenAPI());
    }

    if (write) {
      dispatch(withCr.getWriteAPI());
    }
    if (wish) {
      dispatch(withCr.getWishGroupAPI());
    }

    // if (games) {
    //   // 경기관람 모임 리스트 부르기
    //   dispatch(withCr.getWithAPI());
    //   setShowModal(false);
    //   return;
    //   // setGames(false);
    // }
    // if (screen) {
    //   // console.log("스야관람")
    //   // 스야 모임 리스트 부르기
    //   dispatch(withCr.getScreenAPI());
    //   setShowModal(false);
    //   // setScreen(false);
    //   return;
    // }
  }, [write, wish, allList]);

  // //작성
  // useEffect(() => {
  //   if (write) {
  //     dispatch(withCr.getWriteAPI());
  //   } else if (wish) {
  //     dispatch(withCr.getWishGroupAPI());
  //   }
  // }, [write, wish]);

  return (
    <All>
      <div
        style={{
          background: "#EC5E4F",
          color: "#FFFFFF",

          margin: " 0 auto",
        }}
      >
        <ArrowBack>내모임</ArrowBack>
      </div>
      <Container>
        <Group>
          <Button1
            nowBtn1={nowBtn1}
            onClick={() => {
              if (write === true || participation === false || wish === true) {
                setWrite(false);
                setWish(false);
                setParticipation(true);
              }
            }}
          >
            참여모임
          </Button1>

          <Button2
            nowBtn2={nowBtn2}
            onClick={() => {
              if (participation === true || write === false || wish === true) {
                setParticipation(false);
                setWish(false);
                setWrite(true);
              }
              setWrite(true);
            }}
          >
            작성모임
          </Button2>
          <Button3
            nowBtn3={nowBtn3}
            onClick={() => {
              setWrite(false);
              setAllList(false);
              setWish(true);
            }}
          >
            찜한모임
          </Button3>
        </Group>
      </Container>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "375px",
          margin: "20px 25px",
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

      {allList
        ? all_list.map((e, idx) => {
            return (
              <div style={{ margin: "20px" }}>
                {participation ? (
                  <Participation key={e.idx} {...e} />
                ) : (
                  <NotGame>게임이없어요</NotGame>
                )}
              </div>
            );
          })
        : !wish
        ? with_list.map((e) => {
            return (
              <div style={{ margin: "20px" }}>
                {Participation || !wish || !e ? (
                  <Write key={e.groupId} {...e} />
                ) : (
                  // <NotGame>게임이없어요</NotGame>
                  ""
                )}
              </div>
            );
          })
        : with_list.map((e) => {
            return (
              <div style={{ margin: "20px" }}>
                {Participation || !write || !e ? (
                  <Wish key={e.groupId} {...e} />
                ) : (
                  // <NotGame>게임이없어요</NotGame>
                  ""
                )}
              </div>
            );
          })}
      {write
        ? write_list.map((e) => {
            return (
              <div style={{ margin: "20px" }}>
                {write && !wish ? <Write key={e.groupId} {...e} /> : ""}
              </div>
            );
          })
        : !wish
        ? with_list.map((e) => {
            return (
              <div style={{ margin: "20px" }}>
                {Participation || !wish || !e ? (
                  <Write key={e.groupId} {...e} />
                ) : (
                  // <NotGame>게임이없어요</NotGame>
                  ""
                )}
              </div>
            );
          })
        : with_list.map((e) => {
            return (
              <div style={{ margin: "20px" }}>
                {Participation || !write || !e ? (
                  <Wish key={e.groupId} {...e} />
                ) : (
                  // <NotGame>게임이없어요</NotGame>
                  ""
                )}
              </div>
            );
          })}

      {showModal ? (
        <Modal bottom btnConfirm height="244px" setShowModal={setShowModal}>
          <Cen>
            <img src={Reciangle} alt="등등" />
            <But
              onClick={() => {
                history.push("/mygroup");
              }}
            >
              전체보기
            </But>
            <But
              onClick={() => {
                history.push("/teamgroup");
              }}
            >
              경기 모임만
            </But>
            <But
              onClick={() => {
                history.push("/screengroup");
              }}
            >
              스야 모임만
            </But>
          </Cen>
        </Modal>
      ) : (
        ""
      )}

      <MarginBottom />
      <NaviBar sch />
    </All>
  );
};

MyGroup.defaultProps = {
  nowBtn1: false,
  nowBtn2: false,
  nowBtn3: false,
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
    color: red;
  `}
`;
const Button2 = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  margin-right: 0;
  padding-bottom: 10px;
  color: #777777;

  ${(props) =>
    props.nowBtn2 &&
    `
    border-bottom: 2px solid;
    font-weight: bold;
    color: #000000;
  `}
`;

const Button3 = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  margin-right: 0;
  padding-bottom: 10px;
  color: #777777;

  ${(props) =>
    props.nowBtn3 &&
    `
    border-bottom: 2px solid;
    font-weight: bold;
    color: #000000;
  `}
`;

const Group = styled.div`
  display: flex;
  justify-content: space-around;
  /* text-align: center; */
  padding: 20px 20px;
  border-bottom: 2px solid #e7e7e7;

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
  justify-content: center;
  align-items: center;
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
  margin-top: 30px;
`;

const Cen = styled.div`
  text-align: center;
  width: 100px;
  margin: 0 auto;
  color: #777777;
  font-size: "14px";
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;
