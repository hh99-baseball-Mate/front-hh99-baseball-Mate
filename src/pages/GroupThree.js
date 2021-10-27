import React, { useState } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FloatingLabel, Form } from "react-bootstrap";
import { useHistory } from "react-router";

const GroupThree = (props) => {
  const [contents, setContents] = useState("");
  const history = useHistory();

  function Back() {
    history.push("/grouptwo");
  }
  const changeContents = (e) => {
    setContents(e.target.value);
    console.log(e.target.value);
  };
  console.log(contents);
  return (
    <>
      <AiOutlineArrowLeft onClick={Back} />
      <Title>신규모임</Title>
      <span>완료</span>

      <>
        <FloatingLabel
          controlId="floatingTextarea"
          label="글제목"
          className="mb-3"
        >
          <Form.Control as="textarea" placeholder="Leave a comment here" />
        </FloatingLabel>
        <Form.Select size="lg">
          <option>일정선택</option>
        </Form.Select>
        <FloatingLabel
          controlId="floatingTextarea2"
          label="게시글 내용을 작성해주세요"
        >
          <Form.Control
            onChange={changeContents}
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: "100px" }}
          />
        </FloatingLabel>
      </>
    </>
  );
};
export default GroupThree;

const Title = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: 600;
`;
