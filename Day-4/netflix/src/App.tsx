import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./routes/Tv";
import Search from "./routes/Search";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route path="/tv">
          <Tv></Tv>
        </Route>
        <Route path="/search">
          <Search></Search>
        </Route>
        <Route path={["/", "/movies/:movieId"]}>
          <Home></Home>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
