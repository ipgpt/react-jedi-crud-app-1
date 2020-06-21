import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Context } from "./context";

// import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/navbar/NavBar";
import PeoplePage from "./components/pages/PeoplePage";
import PlanetsPage from "./components/pages/PlanetsPage";
import StarshipsPage from "./components/pages/StarshipsPage";
import NotFound from "./components/pages/NotFound";
import FormPage from "./components/pages/FormPage";

function App() {
  const [context, setContext] = useState({ people: [], starships: [] });

  return (
    <Context.Provider value={[context, setContext]}>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/:page/:editPage" component={FormPage} />
          <Route path="/people" component={PeoplePage} />
          <Route path="/planets" component={PlanetsPage} />
          <Route path="/starships" component={StarshipsPage} />
          <Route path="/not-found" component={NotFound} />
          <Redirect exact from="/" to="/people" component={PeoplePage} />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </Context.Provider>
  );
}

export default App;
