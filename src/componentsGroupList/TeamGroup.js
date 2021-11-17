import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TeamGroup = (props) => {
  const dispatch = useDispatch();
  //참석
  const with_list = useSelector((state) => state.with.with_list);
  //작성
  const write_list = useSelector((state) => state.with.write_list);
  //찜하기
  const wish_list = useSelector((state) => state.with.with_list);
  //모달
  const [showModal, setShowModal] = useState(false);
  return <div>플레이스</div>;
};

export default TeamGroup;
