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
    if (!isSameId) {
      setContext({
        ...context,
        starships: [...context.starships, starshipData],
      });
    }
  };

  const handleDeleteStarship = (id) => {
    setContext({
      ...context,
      starships: context.starships.filter((starship) => starship.id !== id),
    });
  };

  const getInitialStarshipsData = () => {
    const columns = Object.keys(context.starships).length
      ? Object.keys(context.starships[0])
      : [];
    const item = columns.reduce((cols, columnName) => {
      cols[columnName] = "";
      return cols;
    }, {});
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
    setContext({
      ...context,
      handleAddStarship,
      getStarshipColumnNames,
      item: { ...item, type: "starships" },
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
        Add Person
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
