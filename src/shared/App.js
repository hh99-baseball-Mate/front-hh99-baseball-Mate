import React, { useEffect } from "react";
import { ConnectedRouter } from "connected-react-router";
import { ClubChoice } from "../pages/ClubChoice";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import { history } from "../redux/configStore";
import { Route } from "react-router-dom";
import KAKAOhandle from "./SocialLogin/KAKAOhandle";
import { GlobalStyles } from "./GlobalStyles";
import Main from "../pages/Main";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "./Cookie";
import { actionCreators as userActions } from "../redux/modules/user";

import GroupList from "../pages/GroupList";
import GroupDate from "../pages/GroupDate";
import GroupThree from "../pages/GroupThree";
import groupDetailPage from "../pages/groupDetailPage";

function App() {
  const dispatch = useDispatch();
  // const loginCheck = useSelector((state) => state.user.is_login)
  // useEffect(() => {
  //   if (getCookie("is_login")) {
  //     dispatch(userActions.loginCheck())
  //   }
  // }, [])
  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <GlobalStyles />
        <Route path="/" exact component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/clubchoice" component={ClubChoice} />
        <Route path="/user/kakao/callback" component={KAKAOhandle} />
        <Route path="/grouplist" exact component={GroupList} />
        <Route path="/groupdate" exact component={GroupDate} />
        <Route path="/groupthree" exact component={GroupThree} />
        <Route path="/groupdetail" exact component={groupDetailPage} />
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
