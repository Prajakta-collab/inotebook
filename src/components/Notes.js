import React,{useContext, useEffect, useRef, useState} from 'react'
import noteContext from '../context/notes/noteContext';

import Addnote from './Addnote';
import Noteitem from './Noteitem';


const Notes = () => {
    const context=useContext(noteContext);
    const {notes,getNote,editNote}=context;

    const [note, setnote] = useState({id:" ",etitle:"", edescription:"",etag:"default"})


    useEffect(() => {
        
        getNote();
        // eslint-disable-next-line
    },[])
    const updateNote=(CurrentNote)=>{
        ref.current.click();
        setnote({id:CurrentNote._id ,etitle:CurrentNote.title, edescription:CurrentNote.description, etag:CurrentNote.tag})
    }
    const ref = useRef(null)
    const refClose=useRef(null)

    const handleClick=(e)=>{
        console.log("updating the note",note)
        //e.preventDefault();
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click();

      //addNote(note.title,note.description,note.tag)
      
      
      }
      
      const onChange=(e)=>{
      setnote({...note,[e.target.name]:e.target.value})
      }
      
    
    return (<>
        <Addnote/>
     
<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="container my-3">
      
        <form>
          <div className="form-group my-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="etitle"
              name="etitle"
              aria-describedby="emailHelp"
              placeholder="Enter title"
              onChange={onChange}
              value={note.etitle}
              
            />
            
          </div>
          <div className="form-group my2">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control "
              id="edescription"
              name="edescription"
              placeholder="Descripion"
              onChange={onChange}
              value={note.edescription}
             
            />

          </div>
          <div className="form-group my-2">
            <label htmlFor="tag">Tag</label>
            <input
              type="text"
              className="form-control"
              id="etag"
              name="etag"
              placeholder="Tag"
              onChange={onChange}
              value={note.etag}

              
            />

          </div>
         
         
        </form>
      </div>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
        <div className="container row my-3 centre" style={{marginLeft:'75px'}}>
           
          
            <h2>Your notes :</h2>
            {
                notes.map((note)=>{
                   return <Noteitem key={note._id} updateNote={updateNote} note={note}/>
                })
            }
        
        </div></>
    )
}

export default Notes
