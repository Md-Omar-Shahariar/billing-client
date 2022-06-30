import React from "react";

const TableRow = ({ task }) => {
  return (
    <tr>
      <td scope="row">a</td>
      <td>{task.name}</td>
      <td>{task.email}</td>
      <td>{task.phone}</td>
      <td>{task.amount}</td>
      <td></td>
    </tr>
  );
};

export default TableRow;
