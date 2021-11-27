import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import styled from "styled-components";
import { history } from "../redux/configStore"

export const ArrowBack = (props) => {
  const { children, onClick, bg, background, fixed, margin } = props

  const styles = { onClick, bg, background }

  return (
    <React.Fragment>
      <Headers bg={bg} background={background} fixed={fixed}>
        <Icon {...styles} onClick={() => history.goBack()} />
        {children}
      </Headers>
      <MarginBottom margin={margin} />
    </React.Fragment>
  )
}

ArrowBack.defaultProps = {
  children: null,
  _onClick: () => {},
  bg: null,
  background: null,
  fixed: null,
  margin: null,
}

const Headers = styled.div`
  /* width: 335px; */
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 20px 0;
  font-size: 16px;
  font-weight: bold;

  ${(props) => (props.background ? "background-color: #FFF;" : null)}

  ${(props) =>
    props.bg
      ? "background-color:#EC5E4F; color:white; width:100%;  margin: 0 auto;"
      : null}

  ${(props) =>
    props.fixed
      ? `
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 425px;
    z-index : 1;
  `
      : `position: relative;`}
`

const Icon = styled(IoIosArrowBack)`
  position: absolute;
  left: 0px;
  margin-left: 20px;
`
const MarginBottom = styled.div`
  ${(props) => 
    props.margin ? 
      "margin-bottom: 58px;"
     : null
    }
 
`;