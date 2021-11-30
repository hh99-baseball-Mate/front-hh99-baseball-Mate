import React, { useEffect } from "react";
import { ConnectedRouter } from "connected-react-router";
import { ClubChoice } from "../pages/ClubChoice";
import { Signup } from "../pages/Signup";
import { history } from "../redux/configStore";
import { Route } from "react-router-dom";
import KAKAOhandle from "./SocialLogin/KAKAOhandle";
import { GlobalStyles } from "./GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "./Cookie";
import { actionCreators as userActions } from "../redux/modules/user";
import TimelineList from "../pages/TimelineList";
import GroupList from "../pages/GroupList";
import GroupDate from "../pages/GroupDate";
import GroupDetail from "../pages/GroupDetail";
import { GroupEdit } from "../componentsGroupDetail/GroupEdit";
import { GroupAdd } from "../pages/GroupAdd";
import { GoodsAdd } from "../pages/GoodsAdd";
import MyGroup from "../pages/MyGroup";
import { Login } from "../pages/Login";
import { MyPage } from "../pages/MyPage";
import { PhoneAuth } from "../pages/PhoneAuth";
import { NotFound } from "../pages/NotFound";
import { Redirect, Switch } from "react-router";
import Alarm from "../pages/Alarm";
import { MyInfo } from "../pages/MyInfo";
import { ScreenList } from "../pages/ScreenList";
import { ScreenAdd } from "../pages/ScreenAdd";
import styled from "styled-components";
import ScreenDetail from "../pages/ScreenDetail";
import { ScreenEdit } from "../componentsScreenDetail/ScreenEdit";
import { Loading } from "../components/Loading";
import ChatList from "../pages/ChatList";
import ChatRoom from "../componentsChat/ChatRoom";
import Community from "../pages/Community";
import { CommunityDetail } from "../pages/CommunityDetail";
import CommunityAdd from "../pages/CommunityAdd";
import { Goods } from "../pages/Goods";
import { Notice } from "../pages/Notice";
import { Event } from "../pages/Event";
import EditCommunComment from "../communityList/EditCommunComment"

function App() {
  const dispatch = useDispatch()

  const is_login = useSelector((state) => state.user.is_login)

  useEffect(() => {
    if (getCookie("is_login")) {
      dispatch(userActions.logInCheckMD())
    } else {
      getCookie("is_login")
    }
  }, [])

  // 로그인이 아닐때 보여지는 페이지들 // 나머지는 notFound

  // 어스 라우트 콤포넌트 쿠키 유무를 판단하고 그걸로
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
              <Route path="/user/kakao/callback" component={KAKAOhandle} />
              <Route exact path="/login/clubchoice" component={ClubChoice} />
              <Route path="/" exact component={GroupList} />
              <Route path="/groupdate" exact component={GroupDate} />
              <Route
                path="/groupdetail/:groupId"
                exact
                component={GroupDetail}
              />
              <Route path="/groupdedit/:groupId" exact component={GroupEdit} />
              <Route path="/timeline" exact component={TimelineList} />
              <Route path="/goods" exact component={Goods} />
              <Route path="/mygroup" exact component={MyGroup} />
              <Route path="/community" exact component={Community} />
              <Route path="/communityadd" exact component={CommunityAdd} />
              <Route
                path="/alarm"
                render={() => <Alarm is_login={is_login} />}
              />
              <Route
                path="/mypage/:useridx"
                exact
                render={() => <MyPage is_login={is_login} />}
              />
              <Route path="/screen" exact component={ScreenList} />
              <Route
                path="/screen/screendetail/:screenId"
                exact
                component={ScreenDetail}
              />
              <Route
                path="/community/editcommuncomment/:communityId"
                exact
                component={EditCommunComment}
              />
              <Route path="/notice" component={Notice} />
              <Route path="/event" component={Event} />
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
              <Route
                path="/groupdetail/:groupId"
                exact
                component={GroupDetail}
              />
              <Route path="/groupdedit/:groupId" exact component={GroupEdit} />
              <Route path="/timeline" exact component={TimelineList} />
              <Route path="/goods" exact component={Goods} />
              <Route path="/goods/goodsadd" exact component={GoodsAdd} />
              <Route path="/mygroup" exact component={MyGroup} />
              <Route
                path="/alarm"
                render={() => <Alarm is_login={is_login} />}
              />
              <Route
                path="/mypage/:useridx"
                exact
                render={() => <MyPage is_login={is_login} />}
              />
              <Route path="/mypage/:useridx/update" exact component={MyInfo} />
              <Route path="/screen" exact component={ScreenList} />
              <Route path="/screen/screenadd" exact component={ScreenAdd} />
              <Route
                path="/community/communitydetail/editcommuncomment/:communityId"
                exact
                component={EditCommunComment}
              />

              <Route
                path="/screenedit/:screenId"
                exact
                component={ScreenEdit}
              />
              <Route path="/loading" exact component={Loading} />
              <Route path="/chatlist" exact component={ChatList} />
              <Route path="/chatlist/chatroom/:id" exact component={ChatRoom} />
              <Route path="/community" exact component={Community} />
              <Route
                path="/community/communitydetail/:communityId"
                exact
                component={CommunityDetail}
              />
              <Route
                path="/community/communityadd"
                exact
                component={CommunityAdd}
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
      </Container>
    </>
  )
}

export default App;

const Container = styled.div`
  max-width: 425px;
  min-height: 100vh;
  background: #fff;
`;
