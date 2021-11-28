import React, { useState } from "react";
import { useDispatch } from "react-redux";

const EditCommunComment = (props) => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState(props.comment);
  return <div></div>;
};

export default EditCommunComment;
