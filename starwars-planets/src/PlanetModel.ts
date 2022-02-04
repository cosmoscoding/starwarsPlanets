export type Planet = {
  climate: string;
  name: string;
  population: string;
  residents: string;
  surfaceWater: string;
  terrain: string;
  url: string;
};

/**
 * Contains a list of Planet objects, and get/set methods for these objects.
 */
class PlanetListModel {
  private planetList: Array<Planet> = [];

  /**
   * @returns The list of planet objects
   */
  getPlanets() {
    return this.planetList;
  }

  /**
   * Formats large numbers (as strings) into groups of 3. i.e. 10000 turns into 10 000
   * @param numberAsString A number in string format
   * @returns The number formatted into groups of 3
   */
  formatNumber(numberAsString: string): string {
    if (numberAsString.length <= 3) {
      return numberAsString;
    }
    // Assuming the API will always return a number as a string, and not an unknown string
    return numberAsString.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
  }

  /**
   * Formats planet object data into Planet types, sorts by name, and replaces the PlanetModel list.
   * @param planetData An array of objects containing one page of planet data from SWAPI.
   */
  setPlanets(planetData: Array<object>) {
    let planets: Array<Planet> = [];
    planetData.forEach((planet: any) => {
      //Assuming API values are not null.
      let waterSurfaceArea = "?";
      if ("diameter" in planet && planet.diameter !== "unknown") {
        let totalSurfaceArea =
          4 * Math.PI * Math.pow(planet["diameter"] / 2, 2);
        if ("surface_water" in planet && planet.surface_water !== "unknown") {
          waterSurfaceArea = Math.round(
            (parseInt(planet.surface_water) / 100) * totalSurfaceArea
          ).toString();
        }
      }
      let newPlanet: Planet = {
        climate:
          !planet?.climate || planet.climate === "unknown"
            ? "?"
            : planet.climate,
        name: !planet?.name || planet.name === "unknown" ? "?" : planet.name,
        population:
          !planet?.population || planet.population === "unknown"
            ? "?"
            : this.formatNumber(planet.population),
        residents:
          !planet?.residents || planet.residents === "unknown"
            ? "?"
            : this.formatNumber(planet.residents.length.toString()),
        surfaceWater: this.formatNumber(waterSurfaceArea),
        terrain:
          !planet?.terrain || planet.terrain === "unknown"
            ? "?"
            : planet.terrain,
        url: !planet?.url || planet.url === "unknown" ? "" : planet.url,
      };
      planets.push(newPlanet);
    });
    planets.sort((a: Planet, b: Planet) => (b.name < a.name ? 1 : -1));
    this.planetList = planets;
  }
}

export default PlanetListModel;
