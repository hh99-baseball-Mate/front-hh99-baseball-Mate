import GroupOne from "../pages/GroupOne";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configStore";
import GroupTwo from "../pages/GroupTwo";
import GroupThree from "../pages/GroupThree";

function App() {
  return (
    <div className="App">
      <>
        <ConnectedRouter history={history}>
          <Route path="/groupone" exact component={GroupOne} />
          <Route path="/grouptwo" exact component={GroupTwo} />
          <Route path="/groupthree" exact component={GroupThree} />
        </ConnectedRouter>
      </>
    </div>
  );
}

export default App;
