import React from "react";
import jquery from "jquery";
import PlanetListModel, { Planet } from "./PlanetModel";
import "./PlanetsTable.css";

interface TableProps {}
interface TableState {
  isLoading: boolean;
  dataError: boolean;
}
export default class PlanetsTable extends React.Component<
  TableProps,
  TableState
> {
  // Assuming that page 1 will always exist
  private dataURL = "https://swapi.dev/api/planets/?page=1";
  private planetsModel: PlanetListModel;

  constructor(props: TableProps) {
    super(props);
    this.planetsModel = new PlanetListModel();
    this.state = {
      isLoading: false,
      dataError: false,
    };
  }

  componentDidMount() {
    // Begin the loading message before making API call
    this.setState({
      isLoading: true,
    });
    jquery.ajax({
      type: "GET",
      url: this.dataURL,
      dataType: "json",
      success: (data) => {
        if (!("results" in data)) {
          // Results not included in data set, set error message
          console.log("Planet results not found in data set!");
          this.setState({
            dataError: true,
            isLoading: false,
          });
          return;
        }
        // Results found, parse results and display
        this.planetsModel.setPlanets(data.results);
        this.setState({
          isLoading: false,
          dataError: false,
        });
      },
      error: (XMLHttpRequest, textStatus, errorThrown) => {
        console.log(`Error fetching data: ${errorThrown}`);
        this.setState({
          isLoading: false,
          dataError: true,
        });
      },
    });
  }

  render() {
    // This variable stores a user message to display - either "loading" or an error message
    var userMessage = null;
    if (this.planetsModel.getPlanets().length === 0) {
      if (this.state.isLoading)
        userMessage = <p id="loadingMessage">Loading...</p>;
      else if (this.state.dataError)
        userMessage = (
          <p id="errorMessage">
            Sorry, we couldn't find any planet data! Please check your API link.
          </p>
        );
      else userMessage = null;
    }
    return (
      <div>
        {userMessage}
        {this.planetsModel.getPlanets().length > 0 ? (
          <div>
            <table>
              <thead>
                <tr>
                  <th className="textHeader">Name</th>
                  <th className="textHeader">Climate</th>
                  <th className="numHeader">Residents</th>
                  <th className="textHeader">Terrains</th>
                  <th className="numHeader">Population</th>
                  <th className="numHeader">
                    Water Coverage (in km<sup>2</sup>)
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.planetsModel.getPlanets().map((planet: Planet) => (
                  <tr>
                    <td className="textData">
                      {planet.url !== "?" ? (
                        <a
                          href={planet.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {planet.name}
                        </a>
                      ) : (
                        <p>{planet.name}</p>
                      )}
                    </td>
                    <td className="textData">{planet.climate}</td>
                    <td className="numData">{planet.residents}</td>
                    <td className="textData">{planet.terrain}</td>
                    <td className="numData">{planet.population}</td>
                    <td className="numData">{planet.surfaceWater}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    );
  }
}
