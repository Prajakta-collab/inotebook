import React,{useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';


const Addnote = () => {

    const context=useContext(noteContext);
    const {addNote}=context;
const [note, setnote] = useState({title:"", description:"",tag:"default"})

const handleClick=(e)=>{
  e.preventDefault();
addNote(note.title,note.description,note.tag)


}

const onChange=(e)=>{
setnote({...note,[e.target.name]:e.target.value})
}

    return (
        <div>
            <div className="container my-3">
        <h2>Add notes :</h2>
        <form>
          <div className="form-group my-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              placeholder="Enter title"
              onChange={onChange}
              style={{width:'40vw'}}
            />
            
          </div>
          <div className="form-group my2">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control "
              id="description"
              name="description"
              placeholder="Descripion"
              onChange={onChange}
              style={{width:'40vw',height:'15vh'}}
            />

          </div>
          <div className="form-group my-2">
            <label htmlFor="tag">Tag</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              placeholder="Tag"
              onChange={onChange}
              style={{width:'40vw'}}
            />

          </div>
         
          <button type="submit" className="btn btn-primary my-3" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
        </div>
    )
}

export default Addnote
