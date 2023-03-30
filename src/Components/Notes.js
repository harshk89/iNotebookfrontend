import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/noteContext";
import Noteitem from "./Noteitem";
import "./Notes.css";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  let navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')) {
      getNotes();
    }
    else {
      navigate("/login", {return:true})
    }
    // eslint-disable-next-line
  }, []);

  const refEditNote = useRef(null);
  const refClose = useRef(null);
  // const refDisplayNote = useRef(null);
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: "default"});

  const updateNote = (currentNote) => {
    refEditNote.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Note updated!", "success");
  };

  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value});
  };

  return (
    <div className="Notes">
      {/* give class d-none for display none */}
      <button ref={refEditNote} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editNoteModal">
        Edit Note Modal
      </button>
      <div className="modal fade" id="editNoteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Tag
                  </label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleUpdate} type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row notes-display">
        <h2 className="section-heading">Your notes</h2>
        <div className="no-notes-message">
          {notes.length===0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} setNote={setNote} updateNote={updateNote} showAlert={props.showAlert} />;
        })}
      </div>
    </div>
  );
};

export default Notes;
