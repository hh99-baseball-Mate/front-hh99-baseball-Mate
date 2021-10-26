import React from "react"
import { ConnectedRouter } from "connected-react-router"
import { ClubChoice } from "../pages/ClubChoice"
import { Login } from "../pages/Login"
import { Signup } from "../pages/Signup"
import { history } from "../redux/configStore"
import { Route } from "react-router-dom"
import { KaKaoLogin } from "./SocialLogin/KaKaoLogin"
import { GlobalStyles } from "./GlobalStyles"
import Main from "../pages/Main"

function App() {
  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <GlobalStyles />
        <Route path="/" exact component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/clubchoice" component={ClubChoice} />
        <Route path="/user/kakao/callback" component={KaKaoLogin} />
      </ConnectedRouter>
    </React.Fragment>
  )
}

export default App
