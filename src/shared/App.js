
import React, { useEffect } from "react"
import { ConnectedRouter } from "connected-react-router"
import { ClubChoice } from "../pages/ClubChoice"
import { Signup } from "../pages/Signup"
import { history } from "../redux/configStore"
import { Route } from "react-router-dom"
import KAKAOhandle from "./SocialLogin/KAKAOhandle"
import { GlobalStyles } from "./GlobalStyles"
import Main from "../pages/Main"
import { useDispatch, useSelector } from "react-redux"
import { getCookie } from "./Cookie"
import { actionCreators as userActions } from "../redux/modules/user"
import TimelineList from "../pages/TimelineList"
import GroupList from "../pages/GroupList"
import GroupDate from "../pages/GroupDate"
import GroupDetail from "../pages/GroupDetail"
import { GroupEdit } from "../componentsGroupDetail/GroupEdit"
import { GroupAdd } from "../pages/GroupAdd"
import { Goods } from "../pages/Goods"
import { GoodsAdd } from "../pages/GoodsAdd"
import MyGroup from "../pages/MyGroup"
import { Login } from "../pages/Login"
import { MyPage } from "../pages/MyPage"
import { PhoneAuth } from "../pages/PhoneAuth"
import { NotFound } from "../pages/NotFound"
import { Switch } from "react-router"
import Alarm from "../pages/Alarm"
import { MyInfo } from "../pages/MyInfo"
import { ScreenList } from "../pages/ScreenList"
import { ScreenAdd } from "../pages/ScreenAdd"
import styled from "styled-components"
import ScreenDetail from "../pages/ScreenDetail"
import { ScreenEdit } from "../componentsScreenDetail/ScreenEdit"
import { Loading } from "../components/Loading"
import { Helmet } from "react-helmet"
import favicon from "../shared/icon/favicon.ico"
import img from "../shared/icon/image.jpg"


function App() {
  const dispatch = useDispatch();


  const is_login = useSelector((state) => state.user.is_login)
  // const user_info = useSelector((state) => state.user.user_info)


  // console.log(user_info)
  useEffect(() => {
    if (getCookie("is_login")) {
      dispatch(userActions.logInCheckMD());
    } else {
      getCookie("is_login");
    }
  }, [is_login]);

  // 로그인이 아닐때 보여지는 페이지들 // 나머지는 notFound



  return (
    <Container>
      <ConnectedRouter history={history}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>미트 볼</title>
          <link rel="icon" href={favicon} />

          <meta property="og:type" content="mobile" />
          <meta property="og:title" content="미트 볼" />
          <meta property="og:image" content={img} />
          <meta property="og:locale" content="ko_KR" />
          <meta property="og:description" content="우리 같이 직관가자!" />
        </Helmet>
        <GlobalStyles />
        {!is_login ? (
          <Switch>
            <Route path="/" exact component={Main} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/phoneAuth" component={PhoneAuth} />
            <Route path="/user/kakao/callback" component={KAKAOhandle} />
            <Route exact path="/login/clubchoice" component={ClubChoice} />
            <Route path="/grouplist" exact component={GroupList} />
            <Route path="/groupdate" exact component={GroupDate} />
            <Route path="/groupdetail/:groupId" exact component={GroupDetail} />
            <Route path="/groupdedit/:groupId" exact component={GroupEdit} />
            <Route path="/timeline" exact component={TimelineList} />
            <Route path="/goods" exact component={Goods} />
            <Route path="/mygroup" exact component={MyGroup} />
            <Route path="/alarm" render={() => <Alarm is_login={is_login} />} />
            <Route
              path="/mypage/:useridx"
              exact
              render={() => <MyPage is_login={is_login} />}
            />
            <Route path="/screen" exact component={ScreenList} />

            {/* 임시 */}
            <Route component={NotFound} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Main} />
            {/* <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} /> */}
            <Route exact path="/login/clubchoice" component={ClubChoice} />
            {/* <Route exact path="/phoneAuth" component={PhoneAuth} /> */}
            {/* <Route path="/user/kakao/callback" component={KAKAOhandle} /> */}
            <Route path="/grouplist" exact component={GroupList} />
            <Route path="/groupdate" exact component={GroupDate} />
            <Route path="/grouplist/groupadd" exact component={GroupAdd} />
            <Route path="/groupdetail/:groupId" exact component={GroupDetail} />
            <Route path="/groupdedit/:groupId" exact component={GroupEdit} />
            <Route path="/timeline" exact component={TimelineList} />
            <Route path="/goods" exact component={Goods} />
            <Route path="/goods/goodsadd" exact component={GoodsAdd} />
            <Route path="/mygroup" exact component={MyGroup} />
            <Route path="/alarm" render={() => <Alarm is_login={is_login} />} />
            <Route
              path="/mypage/:useridx"
              exact
              render={() => <MyPage is_login={is_login} />}
            />
            <Route path="/mypage/:useridx/update" exact component={MyInfo} />
            <Route path="/screen" exact component={ScreenList} />
            <Route path="/screen/screenadd" exact component={ScreenAdd} />
            <Route path="/screendetail/:screenId" exact component={ScreenDetail} />
            <Route path="/screenedit/:screenId" exact component={ScreenEdit} />
            <Route path="/loading" exact component={Loading} />

            {/* 임시 */}
            <Route component={NotFound} />
          </Switch>


        )}
      </ConnectedRouter>
      {/* </div> */}
    </Container>
  )
}


export default App


const Container = styled.div`
  width: 375px;
  min-height: 100vh;
  margin: auto;
  background: #fff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
`;
