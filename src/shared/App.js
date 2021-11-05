import React, { useEffect } from "react";
import { ConnectedRouter } from "connected-react-router";
import { ClubChoice } from "../pages/ClubChoice";
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
import { GroupAdd } from "../pages/GroupAdd"
import { Goods } from "../pages/Goods"
import { GoodsAdd } from "../pages/GoodsAdd"
import MyGroup from "../pages/MyGroup"
import { Login } from "../pages/Login"
import { MyPage } from "../pages/MyPage"
import { PhoneAuth } from "../pages/PhoneAuth"
import { NotFound } from "../pages/NotFound"
import { Switch } from "react-router"

function App() {
  const dispatch = useDispatch()
  // const loginCheck = useSelector((state) => state.user.is_login)

  // useEffect(() => {
  //   if (getCookie("is_login")) {
  //     dispatch(userActions.logInCheckMD())
  //   } else {
  //     window.alert("로그인을 해주세요")
  //     history.replace("/login")
  //   }
  // }, [])

  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <GlobalStyles />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/clubchoice" component={ClubChoice} />
          <Route exact path="/phoneAuth" component={PhoneAuth} />
          <Route path="/user/kakao/callback" component={KAKAOhandle} />
          <Route path="/grouplist" exact component={GroupList} />
          <Route path="/groupdate" exact component={GroupDate} />
          <Route path="/groupadd" exact component={GroupAdd} />
          <Route path="/groupdetail/:groupId" exact component={GroupDetail} />
          <Route path="/timeline" exact component={TimelineList} />
          <Route path="/goods" exact component={Goods} />
          <Route path="/addgoods" exact component={GoodsAdd} />
          <Route path="/mygroup" exact component={MyGroup} />
          <Route path="/mypage" exact component={MyPage} />

          {/* 임시 */}
          <Route component={NotFound} />
        </Switch>
      </ConnectedRouter>
    </React.Fragment>
  )
}

export default App;
