import React from "react";
import jquery from "jquery";
import PlanetListModel, { Planet } from "./PlanetModel";
import "./PlanetsTable.css";

interface TableProps {}
interface TableState {
  isLoading: boolean;
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
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    jquery.ajax({
      type: "GET",
      url: this.dataURL,
      dataType: "json",
      success: (data) => {
        if (!("results" in data)) {
          console.log("Planet results not found in data set!");
          return;
        }
        this.planetsModel.setPlanets(data.results);
        this.setState({
          isLoading: false,
        });
      },
      error: (XMLHttpRequest, textStatus, errorThrown) => {
        alert("Error fetching data! Refer to console for details.");
        console.log(`Error fetching data: ${errorThrown}`);
        this.setState({
          isLoading: false,
        });
      },
    });
  }

  render() {
    return (
      <div>
        <p>{this.state.isLoading ? "Loading..." : ""}</p>
        {this.planetsModel.getPlanets().length > 0 ? (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Climate</th>
                  <th>Residents</th>
                  <th>Terrains</th>
                  <th>Population</th>
                  <th>
                    Water Coverage (in km<sup>2</sup>)
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.planetsModel.getPlanets().map((planet: Planet) => (
                  <tr>
                    <td>
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
                    <td>{planet.climate}</td>
                    <td>{planet.residents}</td>
                    <td>{planet.terrain}</td>
                    <td>{planet.population}</td>
                    <td>{planet.surfaceWater}</td>
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
