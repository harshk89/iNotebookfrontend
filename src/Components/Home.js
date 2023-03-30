import React from "react";
import Notes from "./Notes";
import "./Home.css";
import AddNote from "./AddNote";

const Home = (props) => {
  
  return (
    <div className="home">
      <AddNote showAlert={props.showAlert}/>
      <Notes showAlert={props.showAlert} />
    </div>
  );
};

export default Home;
