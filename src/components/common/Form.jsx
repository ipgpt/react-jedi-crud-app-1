import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";

const Form = ({ columns, initialData, onAddData }) => {
  const [personData, setPersonData] = useState(initialData);
  const history = useHistory();

  const handleClick = (event) => {
    event.preventDefault();
    onAddData(personData);
    history.push("/");
  };

  const handleChange = (event) => {
    const { currentTarget: input } = event;
    const data = { ...personData };
    data[input.name] = input.value;
    setPersonData(data);
  };

  if (!Object.keys(initialData).length) {
    return null;
  }

  return (
    <form>
      {columns.map((columnName) => (
        <Input
          key={columnName}
          name={columnName}
          label={columnName}
          value={personData[columnName]}
          type="input"
          onChange={handleChange}
        />
      ))}
      <Button label="Save" classes="alert alert-danger" onClick={handleClick} />
    </form>
  );
};

export default Form;
