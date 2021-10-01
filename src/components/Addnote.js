import React,{useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';


const Addnote = () => {

    const context=useContext(noteContext);
    const {addNote}=context;
const [note, setnote] = useState({title:"", description:"",tag:""})

const handleClick=(e)=>{
e.preventDefault();
addNote(note.title,note.description,note.tag)
setnote({title:"", description:"",tag:""})


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
             minLength={5} required
             value={note.title}
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
              style={{height:'15vh'}} minLength={5} required
              value={note.description}
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
              minLength={5} required
              value={note.tag}
            />

          </div>
         
          <button disabled={note.title.length<5 || note.description.length<5}  className="btn btn-primary my-3" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
        </div>
    )
}

export default Addnote
