import React, { useContext } from "react";
import { Context } from "../../context";
import Form from "../common/Form";

const FormPage = () => {
  const [context] = useContext(Context);
  const type = context.item ? context.item.type : "";

  const getColumns = () => {
    switch (type) {
      case "people":
        return context.getPeopleColumnNames();
      case "starships":
        return context.getStarshipColumnNames();
      case "planets":
        return context.getPlanetColumnNames();
      default:
        return [];
    }
  };

  const getOnAddData = () => {
    switch (type) {
      case "people":
        return context.handleAddPerson;
      case "starships":
        return context.handleAddStarship;
      case "planets":
        return context.handleAddPlanet;
      default:
        return [];
    }
  };

  return (
    <>
      <h2>Form Page</h2>
      <Form
        initialData={context.item}
        columns={getColumns()}
        onAddData={getOnAddData()}
      />
    </>
  );
};

export default FormPage;
