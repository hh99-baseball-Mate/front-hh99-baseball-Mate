import React, { useEffect, useRef } from "react";
import { Card, Carousel, Image } from "react-bootstrap";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import Button from "@restart/ui/esm/Button";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as groupCr } from "../redux/modules/group";

const GroupOne = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const group_list = useSelector((state) => state.group.group_list);
  console.log(group_list);
  function newPeople() {
    history.push("/groupthree");
  }

  function choose() {
    history.push("/grouptwo");
  }

  // useEffect(() => {
  //   dispatch(groupCr.getGroupAPI());
  // }, []);
  useEffect(() => {
    dispatch(groupCr.getGroupAPI());
  }, []);
  return (
    <div>
      <>
        <List>추천</List>
        <List>모임</List>
        <List>소식</List>
        <List>굿즈</List>
      </>
      <Broder />
      {/*swiper */}
      <>
        <Swiper
          watchSlidesProgress={true}
          slidesPerView={5}
          className="mySwiper"
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
          <SwiperSlide>Slide 10</SwiperSlide>
          <SwiperSlide>Slide 11</SwiperSlide>
        </Swiper>
      </>
      {/* dfd */}
      <div style={{ display: "block" }}>
        <strong>모임 전체</strong>
      </div>
      <span onClick={choose} style={{ cursor: "pointer" }}>
        일정선택
      </span>
      <Broder />
      {group_list.map((e) => {
        console.log(e);
        return (
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        );
      })}
      <Btn onClick={newPeople}></Btn>
    </div>
  );
};
export default GroupOne;

const Broder = styled.div`
  border: 0.5px solid gray;
  margin: 10px;
`;

const List = styled.span`
  padding: 10px;
`;

const Circle = styled.div`
  background: yellow;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  float: left;
  margin-left: 10px;
`;
const Btn = styled.button`
  border-radius: 50%;
  height: 50px;
  width: 50px;
  position: fixed;
  right: 10px;
  bottom: 0px;
  boder: none;
  background: yellow;
`;
