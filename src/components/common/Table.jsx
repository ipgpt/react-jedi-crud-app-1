import React from "react";
import Button from "./Button";
import { Link, useRouteMatch } from "react-router-dom";

function Table({
  columns,
  data,
  tableDescriptor,
  onDelete,
  setContextOnClick,
}) {
  let { path, url } = useRouteMatch();

  if (!data.length) {
    return <h2>There is no data for {tableDescriptor} page</h2>;
  }

  return (
    <table className="table table-dark">
      <thead>
        <tr>
          {columns.map((columnTitle) => (
            <th key={columnTitle} scope="col">
              {columnTitle}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((columnTitle) => (
              <td key={item[columnTitle] + columnTitle}>
                {columnTitle === "name" ? (
                  <Link
                    to={`${url}/${item.name}`}
                    onClick={setContextOnClick(item)}
                  >
                    {item[columnTitle]}
                  </Link>
                ) : (
                  item[columnTitle]
                )}
              </td>
            ))}
            <td>
              <Button
                onClick={() => onDelete(item.id)}
                classes="btn btn-danger"
                label="Delete"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
