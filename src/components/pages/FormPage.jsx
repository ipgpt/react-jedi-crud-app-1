import React, { useContext } from "react";
import { Context } from "../../context";
import Form from "../common/Form";

const FormPage = () => {
  const [context] = useContext(Context);

  return (
    <>
      <h2>Form Page</h2>
      <Form
        initialData={context.item}
        columns={
          context.item.type === "people"
            ? context.getColumnNames()
            : context.getStarshipColumnNames()
        }
        onAddData={
          context.item.type === "people"
            ? context.handleAppPerson
            : context.handleAddStarship
        }
      />
    </>
  );
};

export default FormPage;
