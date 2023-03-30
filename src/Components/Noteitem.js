import React, { useContext, useRef } from "react";
import noteContext from "../context/noteContext";
import "./Noteitem.css";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, setNote, updateNote, showAlert} = props;
  const refClose = useRef(null);
  const refDisplayNote = useRef(null);

  const deleteNoteFunc = ()=> {
    if(window.confirm("You sure want to delete this note?")) {
      deleteNote(note._id);
      showAlert("Note deleted!", "success");
    }
    // else {
    //   showAlert("Note not deleted", "info");
    // }
  }

  const handleEditInsideDisplay = ()=>{
    refClose.current.click();
    updateNote(note);
  }
  const displayNote = (currentNote)=>{
    refDisplayNote.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
  }

  return (
    <>
      <div className="col-md-3">
        <div className="card my-3">
          <div className="card-body">
            <div className="body_content" onClick={()=>{displayNote(note)}}>
              <div className="d-flex align-items-center ">
                <h5 className="card-title">{note.title}</h5>
              </div>
              <p className="card-text">{note.description}</p>
            </div>
            <hr/>
            <div className="buttons">
              <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNoteFunc()}}></i>
              <i className="fa-solid fa-pen-clip mx-2" onClick={()=>{updateNote(note)}}></i>
            </div>
          </div>
        </div>
        <div className="card_footer">
          
        </div>

        {/* modal to display note */}
        <button ref={refDisplayNote} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#displayNoteModal">
          Display note
        </button>
        <div className="modal fade" id="displayNoteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{note.etitle}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>{note.edescription}</p>
              </div>
              <div className="modal-footer">
                <button onClick={handleEditInsideDisplay} type="button" className="btn btn-primary">Edit</button>
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
