import React, { useEffect } from "react"
import { ConnectedRouter } from "connected-react-router"
import { ClubChoice } from "../pages/ClubChoice"
import { Login } from "../pages/Login"
import { Signup } from "../pages/Signup"
import { history } from "../redux/configStore"
import { Route } from "react-router-dom"
import KAKAOhandle from "./SocialLogin/KAKAOhandle"
import { GlobalStyles } from "./GlobalStyles"
import GroupOne from "../pages/GroupOne"
import GroupTwo from "../pages/GroupTwo"
import GroupThree from "../pages/GroupThree"
import Main from "../pages/Main"
import { useDispatch, useSelector } from "react-redux"
import { getCookie } from "./Cookie"
import { actionCreators as userActions } from "../redux/modules/user"
import "bootstrap/dist/css/bootstrap.min.css"
import groupDetailPage from "../pages/groupDetailPage"
import TimelineList from "../pages/TimelineList"

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
        <Route path="/" exact component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/clubchoice" component={ClubChoice} />
        <Route path="/user/kakao/callback" component={KAKAOhandle} />
        <Route path="/groupone" exact component={GroupOne} />
        <Route path="/grouptwo" exact component={GroupTwo} />
        <Route path="/groupthree" exact component={GroupThree} />
        <Route path="/groupdetail" exact component={groupDetailPage} />
        <Route path="/timeline" exact component={TimelineList} />
      </ConnectedRouter>
    </React.Fragment>
  )
}

export default App
