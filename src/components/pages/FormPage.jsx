import React, { useContext } from "react";
import { Context } from "../../context";
import Form from "../common/Form";

const FormPage = () => {
  const [context] = useContext(Context);

  const getColumns = () => {
    switch (context.item.type) {
      case "people":
        return context.getColumnNames();
      case "starships":
        return context.getStarshipColumnNames();
      case "planets":
        return context.getPlanetColumnNames();
      default:
        return [];
    }
  };

  const getOnAddData = () => {
    switch (context.item.type) {
      case "people":
        return context.handleAppPerson;
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
