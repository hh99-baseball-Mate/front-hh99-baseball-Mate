import React from "react"
import { AiOutlineLeft } from "react-icons/ai"
import styled from "styled-components"
import { history } from "../../redux/configStore"

export const ArrowBack = (props) => {
  // 뒤로가기 아이콘

  const { children, onClick, bg, background, fixed } = props

  const styles = { onClick, bg, background }

  return (
    <React.Fragment>
      <Headers bg={bg} background={background} fixed={fixed}>
        <Icon size="32" {...styles} onClick={() => history.goBack()} />
        {children}
      </Headers>
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
    max-width: 425px;
    width: 100%;
    z-index : 1;
  `
      : `position: relative;`}
`

const Icon = styled(AiOutlineLeft)`
  position: absolute;
  left: 0px;
  top: 13px;
  margin-left: 20px;
  padding: 8px;
`
