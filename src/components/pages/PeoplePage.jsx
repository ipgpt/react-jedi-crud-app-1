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

  const handleAppPerson = (personData) => {
    const isSameId = context.people.find((item) => item.id === personData.id);
    if (!isSameId) {
      setContext({
        ...context,
        people: [...context.people, personData],
      });
    }
  };

  const handleDelete = (id) => {
    setContext({
      ...context,
      people: context.people.filter((person) => person.id !== id),
    });
  };

  const getInitialPeopleData = () => {
    const columns = Object.keys(context.people).length
      ? Object.keys(context.people[0])
      : [];
    return columns.reduce((cols, columnName) => {
      cols[columnName] = "";
      return cols;
    }, {});
  };

  const getColumnNames = () => {
    if (!context.people.length) {
      return [];
    }
    return Object.keys(context.people[0]);
  };

  const setContextOnClick = (item) => () => {
    setContext({
      ...context,
      handleAppPerson,
      getColumnNames,
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
        columns={getColumnNames()}
        tableDescriptor={pageName}
        onDelete={handleDelete}
        setContextOnClick={setContextOnClick}
      />
    </>
  );
};

export default PeoplePage;
