import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context";
import Table from "../common/Table";
import { getPlanets } from "../../services/swApiService";

const PlanetsPage = () => {
  const pageName = "Planets";
  const [context, setContext] = useContext(Context);

  useEffect(() => {
    const getData = async () => {
      const data = await getPlanets();
      console.log(data);
      setContext({
        ...context,
        planets: data.map((item, index) => ({ ...item, id: index + 1 })),
      });
    };
    if (!context.planets.length) {
      getData();
    }
  }, []);

  const handleAddPlanet = (planetData) => {
    const isSameId = context.planets.find((item) => item.id === planetData.id);
    if (!isSameId) {
      setContext({
        ...context,
        planets: [...context.planets, planetData],
      });
    }
  };

  const handleDeletePlanet = (id) => {
    setContext({
      ...context,
      planets: context.planets.filter((planet) => planet.id !== id),
    });
  };

  const getInitialPlanetsData = () => {
    const columns = Object.keys(context.planets).length
      ? Object.keys(context.planets[0])
      : [];
    const item = columns.reduce((cols, columnName) => {
      cols[columnName] = "";
      return cols;
    }, {});
    item.type = "planets";
    return item;
  };

  const getPlanetColumnNames = () => {
    if (!context.planets.length) {
      return [];
    }
    return Object.keys(context.planets[0]);
  };

  const setContextOnClick = (item) => () => {
    setContext({
      ...context,
      handleAddPlanet,
      getPlanetColumnNames,
      item: { ...item, type: "planets" },
    });
  };

  return (
    <>
      <h2>{pageName} from Star Wars Universe</h2>
      <Link
        to="/people/form"
        className="btn btn-primary"
        onClick={setContextOnClick(getInitialPlanetsData())}
      >
        Add Planet
      </Link>
      <hr />
      <Table
        data={context.planets}
        columns={getPlanetColumnNames()}
        tableDescriptor={pageName}
        onDelete={handleDeletePlanet}
        setContextOnClick={setContextOnClick}
      />
    </>
  );
};

export default PlanetsPage;
