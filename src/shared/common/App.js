import React, { lazy, Suspense, useEffect } from "react"
import { Route, Redirect, Switch } from "react-router-dom"
import { ConnectedRouter } from "connected-react-router"
import { history } from "../../redux/configStore"
import { KAKAOhandle } from "../SocialLogin/KAKAOhandle"
import { getCookie } from "./Cookie"
import styled from "styled-components"
import { GlobalStyles } from "../CSS/GlobalStyles"

import { useDispatch, useSelector } from "react-redux"
import { actionCreators as userActions } from "../../redux/modules/user"

import Loader from "../../components/common/Loader"

const Login = lazy(() => import("../../pages/Login/Login"))
const Signup = lazy(() => import("../../pages/Login/Signup"))
const ClubChoice = lazy(() => import("../../pages/Login/ClubChoice"))
const PhoneAuth = lazy(() => import("../../pages/Login/PhoneAuth"))
const MyGroup = lazy(() => import("../../pages/MyPage/MyGroup"))
const MyInfo = lazy(() => import("../../pages/MyPage/MyInfo"))
const MyPage = lazy(() => import("../../pages/MyPage/MyPage"))
const Notice = lazy(() => import("../../pages/MyPage/Notice"))
const Event = lazy(() => import("../../pages/MyPage/Event"))
const GroupList = lazy(() => import("../../pages/Group/GroupList"))
const GroupDate = lazy(() => import("../../pages/Group/GroupDate"))
const GroupAdd = lazy(() => import("../../pages/Group/GroupAdd"))
const GroupDetail = lazy(() => import("../../pages/Group/GroupDetail"))
const GroupEdit = lazy(() => "../../components/recruit/GroupEdit")
const ScreenList = lazy(() => import("../../pages/Screen/ScreenList"))
const ScreenAdd = lazy(() => import("../../pages/Screen/ScreenAdd"))
const ScreenDetail = lazy(() => import("../../pages/Screen/ScreenDetail"))
const ScreenEdit = lazy(() => import("../../components/recruit/ScreenEdit"))
const Community = lazy(() => import("../../pages/Community/Community"))
const CommunityAdd = lazy(() => import("../../pages/Community/CommunityAdd"))
const CommunityDetail = lazy(() =>
  import("../../pages/Community/CommunityDetail")
)
const EditCommunComment = lazy(() =>
  import("../../components/community/EditCommunComment")
)
const Goods = lazy(() => import("../../pages/Goods/Goods"))
const GoodsAdd = lazy(() => import("../../pages/Goods/GoodsAdd"))
const ChatList = lazy(() => import("../../pages/Chat/ChatList"))
const ChatRoom = lazy(() => import("../../components/chat/ChatRoom"))
const NotFound = lazy(() => import("../../pages/Common/NotFound"))
const Alarm = lazy(() => import("../../pages/Alarm/Alarm"))
// const Loader = lazy(() => import("../../components/common/Loader"))

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
      <Suspense fallback={<Loader />}>
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
                <Route
                  path="/chatlist/chatroom/:id"
                  exact
                  component={ChatRoom}
                />
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
                <Route
                  path="/mypage/:useridx/update"
                  exact
                  component={MyInfo}
                />
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
      </Suspense>
    </>
  )
}

export default App

const Container = styled.div`
  max-width: 425px;
  min-height: 100vh;
  background: #fff;
`
