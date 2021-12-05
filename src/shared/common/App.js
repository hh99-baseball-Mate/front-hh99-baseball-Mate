import React, { useEffect } from "react"
import { Route, Redirect, Switch } from "react-router-dom"
import { ConnectedRouter } from "connected-react-router"
import { history } from "../../redux/configStore"
import { KAKAOhandle } from "../SocialLogin/KAKAOhandle"
import { getCookie } from "./Cookie"
import styled from "styled-components"
import { GlobalStyles } from "../CSS/GlobalStyles"

import { useDispatch, useSelector } from "react-redux"
import { actionCreators as userActions } from "../../redux/modules/user"

import { Login } from "../../pages/Login/Login"
import { Signup } from "../../pages/Login/Signup"
import { ClubChoice } from "../../pages/Login/ClubChoice"
import { PhoneAuth } from "../../pages/Login/PhoneAuth"

import { MyGroup } from "../../pages/MyPage/MyGroup"
import { MyInfo } from "../../pages/MyPage/MyInfo"
import { MyPage } from "../../pages/MyPage/MyPage"
import { Notice } from "../../pages/MyPage/Notice"
import { Event } from "../../pages/MyPage/Event"

import { GroupList } from "../../pages/Group/GroupList"
import { GroupDate } from "../../pages/Group/GroupDate"
import { GroupAdd } from "../../pages/Group/GroupAdd"
import { GroupDetail } from "../../pages/Group/GroupDetail"
import { GroupEdit } from "../../components/recruit/GroupEdit"

import { ScreenList } from "../../pages/Screen/ScreenList"
import { ScreenAdd } from "../../pages/Screen/ScreenAdd"
import { ScreenDetail } from "../../pages/Screen/ScreenDetail"
import { ScreenEdit } from "../../components/recruit/ScreenEdit"

import { Community } from "../../pages/Community/Community"
import { CommunityAdd } from "../../pages/Community/CommunityAdd"
import { CommunityDetail } from "../../pages/Community/CommunityDetail"
import { EditCommunComment } from "../../components/community/EditCommunComment"

import { Goods } from "../../pages/Goods/Goods"
import { GoodsAdd } from "../../pages/Goods/GoodsAdd"

import ChatList from "../../pages/Chat/ChatList"
import { ChatRoom } from "../../components/chat/ChatRoom"

import { NotFound } from "../../pages/Common/NotFound"

import Alarm from "../../pages/Alarm/Alarm"

import { Loader } from "../../components/common/"

function App() {
  const dispatch = useDispatch()

  const is_loaded = useSelector((state) => state.user.is_loaded)
  const is_login = useSelector((state) => state.user.is_login)

  useEffect(() => {
    if (getCookie("is_login")) {
      dispatch(userActions.logInCheckMD())
    }
  }, [])

  // 로그인이 아닐때 보여지는 페이지들 구분 // 나머지는 notFound
  return (
    <>
      <Container>
        <ConnectedRouter history={history}>
          <GlobalStyles />
          {!is_login ? (
            <Switch>
              <Route exact path="/phoneAuth" component={PhoneAuth} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route path="/mygroup" exact component={MyGroup} />
              <Route path="/user/kakao/callback" component={KAKAOhandle} />
              <Route exact path="/login/clubchoice" component={ClubChoice} />
              <Route path="/" exact component={GroupList} />
              <Route path="/groupdate" exact component={GroupDate} />
              <Route path="/groupdetail/:id" exact component={GroupDetail} />
              <Route path="/screen" exact component={ScreenList} />
              <Route
                path="/screen/screendetail/:id"
                exact
                component={ScreenDetail}
              />
              <Route path="/community" exact component={Community} />
              <Route
                path="/community/communitydetail/:communityId"
                exact
                component={CommunityDetail}
              />
              <Route path="/goods" exact component={Goods} />
              <Route
                path="/alarm"
                render={() => <Alarm is_login={is_login} />}
              />
              <Route
                path="/mypage/:useridx"
                exact
                render={() => <MyPage is_login={is_login} />}
              />
              <Route path="/notice" component={Notice} />
              <Route path="/event" component={Event} />
              <Route
                path="/community/communitydetail/:communityId"
                exact
                component={CommunityDetail}
              />
              {/* 임시 */}
              <Route component={NotFound} />
              <Redirect from="*" to="/" />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/login/clubchoice" component={ClubChoice} />
              <Route path="/" exact component={GroupList} />
              <Route path="/groupdate" exact component={GroupDate} />
              <Route path="/grouplist/groupadd" exact component={GroupAdd} />
              <Route path="/groupdetail/:id" exact component={GroupDetail} />
              <Route path="/groupdedit/:id" exact component={GroupEdit} />

              <Route path="/screen" exact component={ScreenList} />
              <Route path="/screen/screenadd" exact component={ScreenAdd} />
              <Route
                path="/screen/screendetail/:id"
                exact
                component={ScreenDetail}
              />
              <Route path="/screenedit/:id" exact component={ScreenEdit} />

              <Route path="/community" exact component={Community} />
              <Route
                path="/community/communityadd"
                exact
                component={CommunityAdd}
              />
              <Route
                path="/community/communitydetail/:communityId"
                exact
                component={CommunityDetail}
              />
              <Route
                path="/community/communitydetail/editcommuncomment/:communityId"
                exact
                component={EditCommunComment}
              />
              <Route path="/goods" exact component={Goods} />
              <Route path="/goods/goodsadd" exact component={GoodsAdd} />
              <Route path="/chatlist" exact component={ChatList} />
              <Route path="/chatlist/chatroom/:id" exact component={ChatRoom} />
              <Route
                path="/alarm"
                render={() => <Alarm is_login={is_login} />}
              />
              <Route path="/mygroup" exact component={MyGroup} />
              <Route
                path="/mypage/:useridx"
                exact
                render={() => <MyPage is_login={is_login} />}
              />
              <Route path="/mypage/:useridx/update" exact component={MyInfo} />
              <Route path="/notice" component={Notice} />
              <Route path="/event" component={Event} />

              {/* 임시 */}
              {/* <Redirect */}
              <Route component={NotFound} />
            </Switch>
          )}
        </ConnectedRouter>
        {/* </div> */}
        {!is_loaded && <Loader type="bars" color="#F25343" />}
      </Container>
    </>
  )
}

export default App

const Container = styled.div`
  max-width: 425px;
  min-height: 100vh;
  background: #fff;
`
