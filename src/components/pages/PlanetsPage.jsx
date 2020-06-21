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
    const newStore = {
      ...context,
      planets: [...context.planets, planetData],
    };
    if (!isSameId) {
      localStorage.setItem("store", JSON.stringify(newStore));
      setContext(newStore);
    } else {
      const updatedStore = {
        ...context,
        planets: context.planets.map((item) =>
          item.id === planetData.id ? planetData : item
        ),
      };
      localStorage.setItem("store", JSON.stringify(updatedStore));
      setContext(updatedStore);
    }
  };

  const handleDeletePlanet = (id) => {
    const newStore = {
      ...context,
      planets: context.planets.filter((planet) => planet.id !== id),
    };
    localStorage.setItem("store", JSON.stringify(newStore));
    setContext(newStore);
  };

  const getInitialPlanetsData = () => {
    const columns = Object.keys(context.planets).length
      ? Object.keys(context.planets[0])
      : [];
    const item = columns.reduce((cols, columnName) => {
      cols[columnName] = "";
      return cols;
    }, {});
    Object.defineProperty(item, "type", {
      enumerable: false,
      writable: true,
    });
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
    Object.defineProperty(item, "type", {
      enumerable: false,
      writable: true,
    });
    item.type = "planets";
    setContext({
      ...context,
      handleAddPlanet,
      getPlanetColumnNames,
      item,
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
