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

    await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNGY2MDU4YzM3MGZmNjg2Mzk3YmI0YiIsImlhdCI6MTYzMjU5MjAxNn0.Fs9d5nDqXBqQICwSMmhAX3_SodBBH0lP8JIf0n_W9xQ",
      },

      body: JSON.stringify({ title, description, tag }),
    });
    console.log("adding a new note");
    const note = {
      _id: "6151d637fec7c92d2215d84a1",
      user: "614f6058c370ff686397bb4b",
      title: title,
      description: description,
      tag: tag,
      date: "2021-09-27T14:33:27.618Z",
      __v: 0,
    };

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
  const editNote = async (id, title, description, tag) => {
    //api call
   await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNGY2MDU4YzM3MGZmNjg2Mzk3YmI0YiIsImlhdCI6MTYzMjU5MjAxNn0.Fs9d5nDqXBqQICwSMmhAX3_SodBBH0lP8JIf0n_W9xQ",
      },

      body: JSON.stringify({ title, description, tag })
     
    });

    let newNote=JSON.parse(JSON.stringify(notes))

    //logic to edit note at client
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element.id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
      
    }
    console.log("newnote",newNote)
    setNotes(newNote)
  };

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
