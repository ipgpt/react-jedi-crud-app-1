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
        columns={context.getColumnNames()}
        onAddData={context.handleAppPerson}
      />
    </>
  );
};

export default FormPage;
