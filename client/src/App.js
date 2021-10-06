import React, {useState, useEffect, Fragment} from "react";
import './App.css';
import Axios from 'axios';
import ReadOnlyRow from "./components/readonlyrow";
import EditableRow from "./components/editablerow";


function App() {
  const [firstName, setFirstName] = useState("");             
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [peronsList, setPersonList] = useState([]);           // we create a list of the persons so we can update the table
  const [editPersonEmail, setPersonEmail] = useState(null);   // I am using the email here as an "id" for each person because 2 people cannot have the same email
  const [editFirstName, setEditFirstName] = useState("");     // this will be the edited first name
  const [editLastName, setEditLastName] = useState("");       // this will be the edited last name
  const [editEmail, setEditEmail] = useState("");             // this will be the edited email
  

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      console.log(response.data);
      setPersonList(response.data);
    });
  }, []);

  const submitInfo = () => {
    Axios.post("http://localhost:3001/api/insert", { //we call on the insert api and give it the values of the person
      firstName: firstName, 
      lastName: lastName, 
      email: email,
    });

    if (firstName.length > 0 && lastName.length > 0 && email.length > 0) // make sure info is not empty
    {
      setPersonList([
        ...peronsList, 
        {
          firstName: firstName, 
          lastName: lastName, 
          email: email,
        },
      ]);
    }
  };


  const updatePerson = (mail) => {

    Axios.put("http://localhost:3001/api/update", {  //we call on the update api and give it the updated values of the person    
      beforeEdit: mail,        
      firstName: editFirstName, 
      lastName: editLastName, 
      email: editEmail,      
    });    
  };


  const editClick = (event, val) => { // handling the edit click button
    event.preventDefault();
    setPersonEmail(val.email);
  
  };

  const cancelClick = () => {  // handling the cancel click button
    setPersonEmail(null);
  };


  const deletePerson = (person) => {
    Axios.delete(`http://localhost:3001/api/delete/${person}`); //we call on the delete api to delete the person
  }


  return (
    <div className="App">
      <h1> Coding Exercise: CRUD </h1>
      <form>
      <div className = "form">
        <label>First Name:</label>
        <input 
          type="text"
          required="required"
          placeholder="Enter first name..." 
          name="firstName" 
          onChange={(e) => {
            setFirstName(e.target.value);
        }}></input>
        <label>Last Name:</label>
        <input 
          type="text"
          required="required"
          placeholder="Enter last name..." 
          name="lastName" 
          onChange={(e) => {
            setLastName(e.target.value);
        }}></input>
        <label>Email:</label>
        <input 
          type="email"
          required="required"
          placeholder="Enter an email..."
          name="email" 
          onChange={(e) => {
            setEmail(e.target.value);
        }}></input>
                       
        <button type="submit" onClick={submitInfo}>Submit</button>
        
        <div className="app-container">
          <form>
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {peronsList.map((val)=> ( // we create a map of the persons
                  <Fragment> 
                    { editPersonEmail === val.email ? (  // look for the email of the person in the map so we can update 
                    <EditableRow // the component for the editable row. 
                      setEditFirstName = {setEditFirstName}  // we send the updated first name
                      setEditLastName = {setEditLastName}    // we send the updated last name
                      setEditEmail = {setEditEmail}          // we send the updated email
                      updatePerson = {updatePerson}          // we send the update function
                      val = {val}                            // the current val of the map of the persons
                      cancelClick = {cancelClick}            // the handle function of the cancel button
                    /> 
                    ) : ( 
                    <ReadOnlyRow                    // the component for the read only row
                      val = {val}                   // the current val of the map of the persons
                      editClick = {editClick}       // the handle function of the edit button 
                      deletePerson = {deletePerson} // the handle function of the delete button 
                    />
                      
                    )}                
                  </Fragment>                
                ))}
              </tbody>
            </table>
          </form>
        </div>                

      </div>
      </form>
    </div>
  );
}

export default App;
