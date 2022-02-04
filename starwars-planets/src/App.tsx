import "./App.css";
import React from "react";
import PlanetsTable from "./PlanetsTable";

export default class App extends React.Component<{}> {
  render() {
    return (
      <div className="App">
        <h1>Star Wars Planets</h1>
        <PlanetsTable />
      </div>
    );
  }
}
