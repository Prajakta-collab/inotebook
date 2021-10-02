import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [];
    
      
  const [notes, setNotes] = useState(notesInitial);

  //get all  note
  const getNote = async () => {
    //todo Api call here
    console.log("local storage mdhl token:",localStorage.getItem('token'))
    const response = await fetch(`${host}/api/notes/fetchalluser`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },

     
    });
   const json=await response.json()
   console.log("get note krtana ch json",json);
  
    setNotes(json);
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    //todo Api call here

    const response=await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },

      body: JSON.stringify({ title, description, tag }),

    });
    const note=await response.json()
    console.log("add note wal token",localStorage.getItem('token'))
    console.log(note)
    console.log("before concat notes",notes)


    setNotes(notes.concat(note));
    console.log("after concat notes",notes)
  };

  //Delete a note
  const deleteNote = async(id) => {
    // Api call
     await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      }

     
    });

    console.log("deleting this note :" + id);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };
  //Edit a note
  let editNote = async (id, title, description, tag) => {
    //api call
   const response=await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
      },

      body: JSON.stringify({ title, description, tag })
     
    });
    const json=response;
    console.log(json);

    let newNotes=JSON.parse(JSON.stringify(notes))

    //logic to edit note at client
    for (let index = 0; index < newNotes.length; index++)
     {
      const element = newNotes[index];
      if (element.id === id) {
        newNotes[index].title= title;
        newNotes[index].description = description;
       newNotes[index].tag = tag;
        break;
      }
      
    }
    console.log("newnote",newNotes)
    setNotes(newNotes)
  };

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
