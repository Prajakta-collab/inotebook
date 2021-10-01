import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [];
    
      
  const [notes, setNotes] = useState(notesInitial);

  //get all  note
  const getNote = async () => {
    //todo Api call here

    const response = await fetch(`${host}/api/notes/fetchalluser`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNGY2MDU4YzM3MGZmNjg2Mzk3YmI0YiIsImlhdCI6MTYzMjU5MjAxNn0.Fs9d5nDqXBqQICwSMmhAX3_SodBBH0lP8JIf0n_W9xQ",
      },

     
    });
   const json=await response.json()
  
    setNotes(json);
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    //todo Api call here

    const response=await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNGY2MDU4YzM3MGZmNjg2Mzk3YmI0YiIsImlhdCI6MTYzMjU5MjAxNn0.Fs9d5nDqXBqQICwSMmhAX3_SodBBH0lP8JIf0n_W9xQ",
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const note=await response.json()

    setNotes(notes.concat(note));
  };

  //Delete a note
  const deleteNote = async(id) => {
    // Api call
     await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNGY2MDU4YzM3MGZmNjg2Mzk3YmI0YiIsImlhdCI6MTYzMjU5MjAxNn0.Fs9d5nDqXBqQICwSMmhAX3_SodBBH0lP8JIf0n_W9xQ",
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
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNGY2MDU4YzM3MGZmNjg2Mzk3YmI0YiIsImlhdCI6MTYzMjU5MjAxNn0.Fs9d5nDqXBqQICwSMmhAX3_SodBBH0lP8JIf0n_W9xQ",
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
