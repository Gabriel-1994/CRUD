import React from "react";

const ReadOnlyRow = ({ val, editClick, deletePerson }) => {
    return (
      <tr>
        <td>{val.firstName}</td>
        <td>{val.lastName}</td>
        <td>{val.email}</td>
        <td>
            <button
              type="button"
              onClick={(event) => editClick(event, val)}
            >
              Edit
            </button>
            <button onClick={() => {deletePerson(val.firstName)}}>
                Delete
            </button>
        </td>        
      </tr>
    );
  };
  
  export default ReadOnlyRow;