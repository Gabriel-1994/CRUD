import React from "react";

const EditableRow = ({
    setEditFirstName, 
    setEditLastName, 
    setEditEmail,
    updatePerson,
    val,
    cancelClick, 
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter first name..."
          name="firstName"    
          onChange={(e) => {
              setEditFirstName(e.target.value);
          }}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter last name..."
          name="lastName"
          onChange={(e) => {
            setEditLastName(e.target.value);
        }}
        ></input>
      </td>
      <td>
        <input
          type="email"
          required="required"
          placeholder="Enter an email..."
          name="email"
          onChange={(e) => {
            setEditEmail(e.target.value);
        }}
        ></input>
      </td>
      <td>
        <button onClick = {()=> {updatePerson(val.email)}} type="submit">Save</button>        
        <button type="button" onClick={cancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;