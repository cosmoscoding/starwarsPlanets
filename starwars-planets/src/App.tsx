import "./App.css";
import React from "react";
import PlanetsTable from "./PlanetsTable";

export default class App extends React.Component<{}> {
  render() {
    return (
      <div className="App">
        <header>Star Wars planets</header>
        <PlanetsTable />
      </div>
    );
  }
}
