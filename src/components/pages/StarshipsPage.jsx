import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context";
import Table from "../common/Table";
import { getStarships } from "../../services/swApiService";

const StarshipsPage = () => {
  const pageName = "Starships";
  const [context, setContext] = useContext(Context);

  useEffect(() => {
    const getData = async () => {
      const data = await getStarships();
      console.log(data);
      setContext({
        ...context,
        starships: data.map((item, index) => ({ ...item, id: index + 1 })),
      });
    };
    if (!context.starships.length) {
      getData();
    }
  }, []);

  const handleAddStarship = (starshipData) => {
    const isSameId = context.starships.find(
      (item) => item.id === starshipData.id
    );
    const newStore = {
      ...context,
      starships: [...context.starships, starshipData],
    };
    if (!isSameId) {
      localStorage.setItem("store", JSON.stringify(newStore));
      setContext(newStore);
    } else {
      const updatedStore = {
        ...context,
        starships: context.starships.map((item) =>
          item.id === starshipData.id ? starshipData : item
        ),
      };
      localStorage.setItem("store", JSON.stringify(updatedStore));
      setContext(updatedStore);
    }
  };

  const handleDeleteStarship = (id) => {
    const newStore = {
      ...context,
      starships: context.starships.filter((starship) => starship.id !== id),
    };
    localStorage.setItem("store", JSON.stringify(newStore));
    setContext(newStore);
  };

  const getInitialStarshipsData = () => {
    const columns = Object.keys(context.starships).length
      ? Object.keys(context.starships[0])
      : [];
    const item = columns.reduce((cols, columnName) => {
      cols[columnName] = "";
      return cols;
    }, {});
    Object.defineProperty(item, "type", {
      enumerable: false,
      writable: true,
    });
    item.type = "starships";
    return item;
  };

  const getStarshipColumnNames = () => {
    if (!context.starships.length) {
      return [];
    }
    return Object.keys(context.starships[0]);
  };

  const setContextOnClick = (item) => () => {
    Object.defineProperty(item, "type", {
      enumerable: false,
      writable: true,
    });
    item.type = "starships";
    setContext({
      ...context,
      handleAddStarship,
      getStarshipColumnNames,
      item,
    });
  };

  return (
    <>
      <h2>{pageName} from Star Wars Universe</h2>
      <Link
        to="/people/form"
        className="btn btn-primary"
        onClick={setContextOnClick(getInitialStarshipsData())}
      >
        Add Starship
      </Link>
      <hr />
      <Table
        data={context.starships}
        columns={getStarshipColumnNames()}
        tableDescriptor={pageName}
        onDelete={handleDeleteStarship}
        setContextOnClick={setContextOnClick}
      />
    </>
  );
};

export default StarshipsPage;
