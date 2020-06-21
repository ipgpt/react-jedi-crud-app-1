import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context";
import Table from "../common/Table";
import { getPeople } from "../../services/swApiService";

const PeoplePage = () => {
  const pageName = "People";
  const [context, setContext] = useContext(Context);

  useEffect(() => {
    const getData = async () => {
      const data = await getPeople();
      console.log(data);
      setContext({
        ...context,
        people: data.map((item, index) => ({ ...item, id: index + 1 })),
      });
    };
    if (!context.people.length) {
      getData();
    }
  }, []);

  const handleAddPerson = (personData) => {
    const isSameId = context.people.find((item) => item.id === personData.id);
    const newStore = {
      ...context,
      people: [...context.people, personData],
    };
    if (!isSameId) {
      localStorage.setItem("store", JSON.stringify(newStore));
      setContext(newStore);
    } else {
      const updatedStore = {
        ...context,
        people: context.people.map((item) =>
          item.id === personData.id ? personData : item
        ),
      };
      localStorage.setItem("store", JSON.stringify(updatedStore));
      setContext(updatedStore);
    }
  };

  const handleDeletePerson = (id) => {
    const newStore = {
      ...context,
      people: context.people.filter((person) => person.id !== id),
    };
    localStorage.setItem("store", JSON.stringify(newStore));
    setContext(newStore);
  };

  const getInitialPeopleData = () => {
    const columns = Object.keys(context.people).length
      ? Object.keys(context.people[0])
      : [];
    const item = columns.reduce((cols, columnName) => {
      cols[columnName] = "";
      return cols;
    }, {});
    Object.defineProperty(item, "type", {
      enumerable: false,
      writable: true,
    });
    item.type = "people";
    return item;
  };

  const getPeopleColumnNames = () => {
    if (!context.people.length) {
      return [];
    }
    return Object.keys(context.people[0]);
  };

  const setContextOnClick = (item) => () => {
    Object.defineProperty(item, "type", {
      enumerable: false,
      writable: true,
    });
    item.type = "people";
    setContext({
      ...context,
      handleAddPerson,
      getPeopleColumnNames,
      item,
    });
  };

  return (
    <>
      <h2>{pageName} from Star Wars Universe</h2>
      <Link
        to="/people/form"
        className="btn btn-primary"
        onClick={setContextOnClick(getInitialPeopleData())}
      >
        Add Person
      </Link>
      <hr />
      <Table
        data={context.people}
        columns={getPeopleColumnNames()}
        tableDescriptor={pageName}
        onDelete={handleDeletePerson}
        setContextOnClick={setContextOnClick}
      />
    </>
  );
};

export default PeoplePage;
