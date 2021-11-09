import Pancil from "../shared/icon/Pancil.png";
import styled from "styled-components";

const PancilBtn = (props) => {
  const { onClick } = props;

  const styles = { onClick };
  return (
    <>
      <Btn {...styles}>
        <img src={Pancil} alt="위치" />
      </Btn>
    </>
  );
};

export default PancilBtn;

PancilBtn.defaultProps = {
  _onClick: () => {},
};

const Btn = styled.button`
  border-radius: 50%;
  height: 61px;
  width: 61px;
  position: fixed;
  right: 10px;
  bottom: 0px;
  transform: translate(-50%, -50%);
  background: #f25343;
  border: 0;
  outline: 0;
  cursor: pointer;
`
