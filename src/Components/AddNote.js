import React, { useContext, useRef, useState } from "react";
import noteContext from "../context/noteContext";
import "./AddNote.css";
import newNotePic from "./images/newNotePic.png";
import notesPic from "./images/pic4.png";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const refAddNote = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleAddNote = ()=>{
    refAddNote.current.click();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Note Added", "success");
    refClose.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="addNote">
      <div className="left-section">
        <div className="welcome">
          <h3>Welcome {localStorage.getItem("username")}</h3>
        </div>
        <div className="add-new-note" onClick={handleAddNote}>
          <div className="left">
            <img src={newNotePic} alt="img" />
          </div>
          <div className="right">
            <h3>Add new note</h3>
          </div>
        </div>
      </div>
      <div className="right-section">
        <img src={notesPic} alt="img" />
      </div>

      {/* modal */}
      {/* added d-none class for display none property */}
      <button ref={refAddNote} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#addNoteModal">
        Add note
      </button>
      <div className="modal fade" id="addNoteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add new note
              </h5>
              <button ref={refClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} aria-describedby="emailHelp" minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Tag
                  </label>
                  <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary">
                  Add Note
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* <h2>Add a note</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
           Title
          </label>
          <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} aria-describedby="emailHelp" minLength={5} required/>
          
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Tag
          </label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
        </div>
        
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary">
          Add Note
        </button>
      </form> */}
    </div>
  );
};

export default AddNote;
