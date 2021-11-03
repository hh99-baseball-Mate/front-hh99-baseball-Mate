import React, { useEffect } from "react";
import styled from "styled-components";
import { Buttons, Container, ArrowBack, Text } from "../components";

import { useDispatch, useSelector } from "react-redux";
import group from "../redux/modules/group";
import Position from "../shared/icon/Vector.png";
import { history } from "../redux/configStore";
import { Image } from "react-bootstrap";
// 스와이퍼
// import Swipers from "../components/Swipers";
import { SwiperSlide, Swiper } from "swiper/react";

const GroupDate = (props) => {
  const dispatch = useDispatch();

  function BackGo() {
    history.push("/GroupList");
  }

  const play_list = useSelector((state) => state.group.play_list);
  console.log(play_list);
  // useEffect(() => {
  //   dispatch(playCr.getPlayAPI());
  // }, []);
  return (
    <Container margin="0px auto">
      <ArrowBack
        onClick={() => {
          history.push("/grouplist");
        }}
      >
        일정선택
      </ArrowBack>
      {/* 여기서부터 카드 */}
      {/* {play_list.map((e, i) => (
        <div key={i}> */}
      <Time>날짜와 요일</Time>

      {/* <Swiper>
        <SwiperSlide> */}
      <div style={{ overflowX: "auto", display: "flex" }}>
        <Box>
          <Local>
            <Text bold margin="0 0 7px">
              시간 강
            </Text>
            <img
              src={Position}
              alt="위치"
              style={{
                marginRight: "6px",
              }}
            />
            위치
          </Local>

          <Card>
            <Col>
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUHouNAtA1H98cZK9ZdkNoxzGmNhDCF4pzMQ&usqp=CAU"
                roundedCircle
                style={{
                  width: "37px",
                  height: "37px",
                  background: "#FFFFFF",
                  border: "1px solid #E7E7E7",
                  boxSizing: "border-box",
                  borderRadius: "50%",
                  marginRight: "4px",
                }}
              />
              <div>구단명</div>
            </Col>
            <Col>
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUHouNAtA1H98cZK9ZdkNoxzGmNhDCF4pzMQ&usqp=CAU"
                roundedCircle
                style={{
                  width: "37px",
                  height: "37px",
                  background: "#FFFFFF",
                  border: "1px solid #E7E7E7",
                  boxSizing: "border-box",
                  borderRadius: "50%",
                  marginRight: "4px",
                }}
              />
              <div>구단명</div>
            </Col>
          </Card>
        </Box>
        <Box>
          <Local>
            <Text bold margin="0 0 7px">
              시간 강
            </Text>
            <img
              src={Position}
              alt="위치"
              style={{
                marginRight: "6px",
              }}
            />
            위치
          </Local>

          <Card>
            <Col>
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUHouNAtA1H98cZK9ZdkNoxzGmNhDCF4pzMQ&usqp=CAU"
                roundedCircle
                style={{
                  width: "37px",
                  height: "37px",
                  background: "#FFFFFF",
                  border: "1px solid #E7E7E7",
                  boxSizing: "border-box",
                  borderRadius: "50%",
                  marginRight: "4px",
                }}
              />
              <div>구단명</div>
            </Col>
            <Col>
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUHouNAtA1H98cZK9ZdkNoxzGmNhDCF4pzMQ&usqp=CAU"
                roundedCircle
                style={{
                  width: "37px",
                  height: "37px",
                  background: "#FFFFFF",
                  border: "1px solid #E7E7E7",
                  boxSizing: "border-box",
                  borderRadius: "50%",
                  marginRight: "4px",
                }}
              />
              <div>구단명</div>
            </Col>
          </Card>
        </Box>
        <Box>
          <Local>
            <Text bold margin="0 0 7px">
              시간 강
            </Text>
            <img
              src={Position}
              alt="위치"
              style={{
                marginRight: "6px",
              }}
            />
            위치
          </Local>

          <Card>
            <Col>
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUHouNAtA1H98cZK9ZdkNoxzGmNhDCF4pzMQ&usqp=CAU"
                roundedCircle
                style={{
                  width: "37px",
                  height: "37px",
                  background: "#FFFFFF",
                  border: "1px solid #E7E7E7",
                  boxSizing: "border-box",
                  borderRadius: "50%",
                  marginRight: "4px",
                }}
              />
              <div>구단명</div>
            </Col>
            <Col>
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUHouNAtA1H98cZK9ZdkNoxzGmNhDCF4pzMQ&usqp=CAU"
                roundedCircle
                style={{
                  width: "37px",
                  height: "37px",
                  background: "#FFFFFF",
                  border: "1px solid #E7E7E7",
                  boxSizing: "border-box",
                  borderRadius: "50%",
                  marginRight: "4px",
                }}
              />
              <div>구단명</div>
            </Col>
          </Card>
        </Box>
        <Box>
          <Local>
            <Text bold margin="0 0 7px">
              시간 강
            </Text>
            <img
              src={Position}
              alt="위치"
              style={{
                marginRight: "6px",
              }}
            />
            위치
          </Local>

          <Card>
            <Col>
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUHouNAtA1H98cZK9ZdkNoxzGmNhDCF4pzMQ&usqp=CAU"
                roundedCircle
                style={{
                  width: "37px",
                  height: "37px",
                  background: "#FFFFFF",
                  border: "1px solid #E7E7E7",
                  boxSizing: "border-box",
                  borderRadius: "50%",
                  marginRight: "4px",
                }}
              />
              <div>구단명</div>
            </Col>
            <Col>
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUHouNAtA1H98cZK9ZdkNoxzGmNhDCF4pzMQ&usqp=CAU"
                roundedCircle
                style={{
                  width: "37px",
                  height: "37px",
                  background: "#FFFFFF",
                  border: "1px solid #E7E7E7",
                  boxSizing: "border-box",
                  borderRadius: "50%",
                  marginRight: "4px",
                }}
              />
              <div>구단명</div>
            </Col>
          </Card>
        </Box>
      </div>
      {/* </SwiperSlide>
      </Swiper> */}

      <div style={{ position: "fixed", width: "335px", bottom: "20px" }}>
        <Buttons complete>선택완료</Buttons>
      </div>
      {/* </div>
      ))} */}
    </Container>
  );
};

export default GroupDate;

const Box = styled.div`
  width: 275px;
  height: 177px;
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 20px;
`;

const Local = styled.div`
  color: #777777;
  font-size: 12px;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Card = styled.div`
  margin-top: 21px;
`;

const Time = styled.div`
  font-weight: bold;
  font-size: 17px;
  line-height: 20px;
  margin-top: 25px;
  margin-bottom: 11px;
`;
