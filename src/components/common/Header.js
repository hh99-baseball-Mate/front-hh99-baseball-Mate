import React, { useEffect } from "react"
import styled from "styled-components"
import { useHistory } from "react-router-dom"
import bell from "../../shared/icon/bell.svg"
import { useDispatch, useSelector } from "react-redux"
import { alarmCreators } from "../../redux/modules/alarm"

export const Header = (props) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const { game, screen, goods, community } = props

  const is_login = useSelector((state) => state.user.is_login)
  const alarm = useSelector((state) => state.alarm.alarmList)
  const user_info = useSelector((state) => state.user.user_info)

  const { useridx, username } = user_info

  useEffect(() => {
    if (is_login) {
      dispatch(alarmCreators.load_alarmMW())
    }
  }, [])

  const alramBtn = () => {
    if (!is_login) {
      window.alert("로그인 후 이용해주세요")
      history.push("/login")
    } else {
      history.push("/alarm")
    }
  }

  return (
    <Container minWidth="370px">
      <Box>
        <Ul>
          <Game game={game} onClick={() => history.push("/")}>
            경기모임
          </Game>

          <Screen screen={screen} onClick={() => history.push("/screen")}>
            스야모임
          </Screen>

          <Community
            community={community}
            onClick={() => history.push("/community")}
          >
            커뮤니티
          </Community>

          <Goods goods={goods} onClick={() => history.push("/goods")}>
            굿즈자랑
          </Goods>
        </Ul>

        <LoginIcon>
          {is_login ? (
            <P onClick={() => history.push(`/mypage/${useridx}`)}>
              {username}님
            </P>
          ) : (
            <LoginBtn onClick={() => history.push("/login")}>로그인</LoginBtn>
          )}

          {/* 알림 */}
          <AlarmIcon src={bell} alt="alert" onClick={alramBtn} />
          {alarm.length === 0 ? null : <RedDot />}
        </LoginIcon>
      </Box>

      {/* 구분선 */}
      <Rectangle />
    </Container>
  )
}

Header.defaultProps = {
  _onClick: () => {},
  nowBtn: false,
  Game: false,
  screen: false,
  timeline: false,
  goods: false,
}


const Container = styled.div`
  max-width: 425px;
  margin: auto;
  padding: 0;
  position: relative;
`

const Ul = styled.ul`
  display: flex;
`

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  height: 60px;
  align-items: center;
`

const Game = styled.li`
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  margin-right: 0;
  background: none;
  color: rgba(0, 0, 0, 0.5);
  margin-right: 8px;
  ${(props) =>
    props.game &&
    `
    border-bottom: 2px solid;
    font-weight: bold;
    color: #F25343;
  `}
  @media screen and (max-width : 365px) {
    font-size: 12px;
  }
`

const Screen = styled.li`
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  background: none;
  color: rgba(0, 0, 0, 0.5);
  margin-right: 8px;
  ${(props) =>
    props.screen &&
    `
    border-bottom: 2px solid;
    font-weight: bold;
    color: #F25343;
  `}
  @media screen and (max-width : 365px) {
    font-size: 12px;
  }
`

const Timeline = styled.li`
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  background: none;
  color: rgba(0, 0, 0, 0.5);
  margin-right: 8px;
  ${(props) =>
    props.timeline &&
    `
    border-bottom: 2px solid;
    font-weight: bold;
    color: #F25343;
  `}
  @media screen and (max-width : 365px) {
    font-size: 12px;
  }
`

const Community = styled.li`
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  background: none;
  color: rgba(0, 0, 0, 0.5);
  margin-right: 8px;
  ${(props) =>
    props.community &&
    `
    border-bottom: 2px solid;
    font-weight: bold;
    color: #F25343;
  `}
  @media screen and (max-width : 365px) {
    font-size: 12px;
  }
`

const Goods = styled.li`
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  background: none;
  color: rgba(0, 0, 0, 0.5);
  margin-right: 8px;
  ${(props) =>
    props.goods &&
    `
    border-bottom: 2px solid;
    font-weight: bold;
    color: #F25343;
  `}
  @media screen and (max-width : 360px) {
    font-size: 12px;
  }
`

const Rectangle = styled.div`
  background: #e7e7e7;
  width: 100%;
  height: 1px;
`

const LoginIcon = styled.div`
  display: flex;
  align-items: center;
`

const LoginBtn = styled.div`
  border: none;
  font-size: 14px;
  cursor: pointer;
  background: none;
  color: rgba(0, 0, 0, 0.5);
  margin: 0 10px;
`

const AlarmIcon = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
`

const RedDot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50px;
  background: #f25343;
  position: absolute;
  right: 20px;
`

const P = styled.p`
  font-size: 12px;
  text-align: center;
  color: #3d4abcab;
  font-weight: 700px;
  margin-right: 5px;
  cursor: pointer;
  @media screen and (max-width: 360px) {
    font-size: 10px;
  }
`